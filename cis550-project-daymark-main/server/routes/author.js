const express = require('express');
const router = express.Router();
const db = require('../db');

// Find author by id
async function author_id(req, res) {
    const id = req.params.id

    db.query(
        `
        SELECT author_id, name
        FROM daymark.authors
        WHERE author_id = $1
        `, [String(id)], function (error, results) {
        if (error) {
            console.log(error)
            res.send(error)
        } else if (results) {
            res.send(results.rows)
        }
    }
    )
}

// Find top authors, with sorting and filtering options
async function top_authors(req, res) {
    const sort = req.query.sort_by ? req.query.sort_by : "count"
    const limit = req.query.limit ? Math.min(req.query.limit, 100) : 5
    const genre = req.query.genre ? req.query.genre : ""

    if (sort === "count") {
        db.query(
            `
            SELECT a.author_id, a.name, count(*) as score
            FROM daymark.books b
            JOIN daymark.interactions it on b.book_id = it.book_id
            JOIN daymark.genres g on b.book_id = g.book_id
            JOIN daymark.writes w on w.book_id = b.book_id
            JOIN daymark.authors a on w.author_id = a.author_id
            WHERE g.genre LIKE $1
            AND it.is_read
            AND it.rating != 0
            AND it.is_reviewed
            GROUP BY 1,2
            ORDER BY 3 desc
            LIMIT $2
            `, ['%' + genre + '%', limit], function (error, results) {
            if (error) {
                console.log(error)
                res.send(error)
            } else if (results) {
                res.send({result: results.rows})
            }
        }
        )
    } else if (sort === 'avg') {
        db.query(
            `
            WITH avg_rating_by_author_book as (
            SELECT a.author_id as author_id, a.name as name, b.title, round(avg(it.rating::float),1) as avg_rating
            FROM Books b
            JOIN Interactions it on b.book_id = it.book_id
            JOIN Genres g on b.book_id = g.book_id
            JOIN Writes w on w.book_id = b.book_id
            JOIN Authors a on w.author_id = a.author_id
            WHERE g.genre LIKE $1
            AND it.is_read
            AND it.rating != 0
            GROUP BY 1,2,3
            HAVING count(*) >= 1000)
            SELECT author_id, name, round(avg(avg_rating),1) as score
            FROM avg_rating_by_author_book
            GROUP BY 1,2
            ORDER BY 3 DESC
            LIMIT $2
            `, ['%' + genre + '%', limit], function (error, results) {
            if (error) {
                console.log(error)
                res.send(error)
            } else if (results) {
                res.send({result: results.rows})
            }
        }
        )
    } else if (sort === 'stddev') {
        db.query(
            `
            WITH std_rating_by_author_book as (
                SELECT a.author_id as author_id, a.name as name, b.title, stddev(rating::float) as stddev_score
                FROM Books b
                JOIN Interactions it on b.book_id = it.book_id
                JOIN Genres g on b.book_id = g.book_id
                JOIN Writes w on w.book_id = b.book_id
                JOIN Authors a on w.author_id = a.author_id
                WHERE g.genre LIKE $1
                AND it.is_read
                AND it.rating != 0
                GROUP BY 1,2,3
                HAVING count(*) >= 1000)
                SELECT author_id, name, round(avg(stddev_score),1) as score
                FROM std_rating_by_author_book
                WHERE stddev_score is NOT NULL
                GROUP BY 1,2
                ORDER BY 3 DESC
                LIMIT $2
            `, ['%' + genre + '%', limit], function (error, results) {
                if (error) {
                    console.log(error)
                    res.send(error)
                } else if (results) {
                    res.send({result: results.rows})
                }
            }
        )
    }
}

// Top similar authors
async function similar(req, res) {
    const id = req.params.id
    const limit = req.query.limit ? Math.min(req.query.limit, 100) : 5

    db.query(
        `
        WITH similar_books AS (
            SELECT similar_to as similar_book_id
            FROM "similar"
            WHERE  book_id IN (SELECT book_id FROM Writes WHERE author_id = $1)
            UNION
            SELECT book_id as similar_book_id
            FROM "similar"
            WHERE  similar_to IN (SELECT book_id FROM Writes WHERE author_id = $1)
            )
            SELECT w.author_id, a.name
            FROM Writes w
            JOIN Authors a
            ON w.author_id = a.author_id
            WHERE w.book_id IN (SELECT similar_book_id FROM similar_books)
            GROUP BY 1, 2
            ORDER BY count(*) DESC
            LIMIT $2
        `, [String(id), limit], function (error, results) {
        if (error) {
            console.log(error)
            res.send(error)
        } else if (results) {
            res.send({result: results.rows})
        }
    }
    )
}

router.get('/', (req, res, next) => {
    db.query('SELECT * FROM daymark.authors limit 5', '', (err, result) => {

        if (err) {
            return next(err);
        }

        res.send(result.rows[0]);

    });
});

router.get('/:id(\d+)', author_id)

router.get('/top', top_authors)

router.get('/similar/:id', similar)

module.exports = router;