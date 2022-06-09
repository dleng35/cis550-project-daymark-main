const express = require('express');
const router = express.Router();
const db = require('../db');



router.get('/', (req, res, next) => {
    db.query('SELECT * FROM daymark.books limit 5', '', (err, result) => {

        if (err) {
            return next(err);
        }

        res.send({ result: result.rows });

    });
});

router.get('/:id(\\d+)/', (req, res, next) => {
    const book_id = req.params.id
    db.query(`SELECT * FROM daymark.books WHERE book_id = $1`, [book_id], (err, result) => {

        if (err) {
            return next(err);
        }

        res.send({result: result.rows});

    });
});
// search books by name or isbn
router.get('/search', (req, res, next) => {
    const title = req.query.title ? '%' + req.query.title.toLowerCase() + '%' : '%';
    const isbn = req.query.isbn ? '%' + req.query.isbn + '%' : '%';
    const author_name = req.query.author_name ? '%' + req.query.author_name.toLowerCase() + '%' : '%';
    const limit = req.query.limit ? Math.min(req.query.limit, 100) : 5
    // page = req.query.page && !isNaN(req.query.page) ? req.query.page : 1;
    // pagesize = req.query.pagesize && !isNaN(req.query.pagesize) ? req.query.pagesize : 10;

    // CALCULATE THE OFFSET - offset is (page - 1) * pageSize
    // offset = (page - 1) * pagesize;

    db.query(`SELECT DISTINCT b.book_id, b.title
    FROM daymark.books b
    JOIN daymark.writes w
    on b.book_id = w.book_id
    JOIN Authors a
    on a.author_id = w.author_id
    WHERE 
    lower(b.title) like $1
    AND
    lower(a.name) like $2
    AND
    b.isbn like $3
    LIMIT $4`, [title, author_name, isbn, limit], (err, results) => {

        if (err) {
            return next(err);
        }

        res.send({ result: results.rows });

    });
});
// similar books to current viewed book 
router.get('/similar/:book_id', (req, res, next) => {
    const book_id = req.params.book_id
    const limit = req.query.limit ? Math.min(req.query.limit, 100) : 5
    // page = req.query.page && !isNaN(req.query.page) ? req.query.page : 1;
    // pagesize = req.query.pagesize && !isNaN(req.query.pagesize) ? req.query.pagesize : 10;
    // CALCULATE THE OFFSET - offset is (page - 1) * pageSize
    // offset = (page - 1) * pagesize;
    db.query(`SELECT b2.book_id, b2.title
    FROM Books b1 
    JOIN "Similar" s on b1.book_id = s.book_id 
    JOIN Books b2 on s.similar_to = b2.book_id 
    WHERE b1.book_id = $1
    LIMIT $2`, [book_id, limit], (err, result) => {

        if (err) {
            return next(err);
        }

        res.send({result: result.rows});

    });
});

router.get('/top', (req, res, next) => {
    sort_by = req.query.sort_by ? req.query.sort_by : "count";
    if (sort_by !== "count") {
        sort_by = "avg"
    }
    const limit = req.query.limit && !isNaN(req.query.limit) ? req.query.limit : 5;
    const genre = req.query.genre ? '%' + req.query.genre.toLowerCase() + '%' : '%';
    const pub_year_start = req.query.pub_year && !isNaN(req.query.pub_year) ? req.query.pub_year : -1;
    const pub_year_end = req.query.pub_year && !isNaN(req.query.pub_year) ? req.query.pub_year : 5000;

    if (sort_by == "count") {
        db.query(`SELECT B.book_id, B.title, COUNT(*) as score
        FROM Books B 
        JOIN Interactions I 
        on B.book_id = I.book_id
        JOIN Genres g 
        on b.book_id = g.book_id 
        WHERE 
        lower(g.genre) like $1 
        AND I.is_reviewed
        AND I.rating > 0 
        AND I.is_read
        AND B.pub_year between $3 and $4
        GROUP BY 1,2
        ORDER BY 3 DESC 
        LIMIT $2`, [genre, limit, pub_year_start, pub_year_end], (err, result) => {

            if (err) {
                return next(err);
            }

            res.send({ result: result.rows });

        });
    } else {
        db.query(`SELECT B.book_id, B.title, ROUND(AVG(I.rating::float), 1) as score
        FROM Books B 
        JOIN Interactions I 
        on B.book_id = I.book_id
        JOIN Genres g 
        on b.book_id = g.book_id 
        WHERE 
        lower(g.genre) like $1 
        AND I.is_reviewed
        AND I.rating > 0 
        AND I.is_read
        AND B.pub_year between $3 and $4
        GROUP BY 1,2
        ORDER BY 3 DESC 
        LIMIT $2`, [genre, limit, pub_year_start, pub_year_end], (err, result) => {

            if (err) {
                return next(err);
            }

            res.send({ result: result.rows });

        });
    }

});

module.exports = router;
