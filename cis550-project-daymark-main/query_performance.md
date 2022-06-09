# Query Performance Tuning

## Overview 

For this project, we use the data warehousing solution [Redshift Serverless](https://docs.aws.amazon.com/redshift/latest/mgmt/serverless-whatis.html) 
to support the large number of records in our data set (e.g., the `Interactions` table has more than 230 million rows)

Some key features of Redshift Serverless
- The compute and storage capacity scales automatically
- Database tables are stored in a [columnar fashion](https://docs.aws.amazon.com/redshift/latest/dg/c_columnar_storage_disk_mem_mgmnt.html) to improve performance on analytical workload 
- Performance tuning techniques focus on 
  1. Choosing the right distribution and sort keys
  2. Configuring column compression
  3. Leveraging materialized views

Currently, Redshift supports [automatic table optimization](https://docs.aws.amazon.com/redshift/latest/dg/t_Creating_tables.html) to pick the most suitable sort or distribution keys based on usage. Given the availability of this feature, our effort to improve query performance will focus on the creation and usage of materialized views


## View Materialization

Consider the following query, which retrieves the top 10 Romance authors by reviewed count


### Unoptimized Run Time

```sql
SELECT a.author_id, a.name, count(*) as score
FROM daymark.books b
         JOIN daymark.interactions it on b.book_id = it.book_id
         JOIN daymark.genres g on b.book_id = g.book_id
         JOIN daymark.writes w on w.book_id = b.book_id
         JOIN daymark.authors a on w.author_id = a.author_id
WHERE g.genre LIKE '%young-adult%'
  AND it.is_read
  AND it.rating != 0
  AND it.is_reviewed
GROUP BY 1, 2
ORDER BY 3 desc
LIMIT 10
```

The query runs in **9306 ms**.


A similar query that sorts by the averaged review score, assuming each author has at least 1000 reviews
```sql
WITH avg_rating_by_author_book as (
    SELECT a.author_id as author_id, a.name as name, b.title, round(avg(it.rating::float), 1) as avg_rating
    FROM daymark.books b
             JOIN daymark.interactions it on b.book_id = it.book_id
             JOIN daymark.genres g on b.book_id = g.book_id
             JOIN daymark.writes w on w.book_id = b.book_id
             JOIN daymark.authors a on w.author_id = a.author_id
    WHERE g.genre LIKE '%young-adult%'
      AND it.is_read
      AND it.rating != 0
      AND it.is_reviewed
    GROUP BY 1, 2, 3
    HAVING count(*) >= 1000)

SELECT author_id, name, round(avg(avg_rating), 1) as score
FROM avg_rating_by_author_book
GROUP BY 1, 2
ORDER BY 3 DESC
LIMIT 10
```
The query runs in **6929 ms**


Note that Redshift caches queries, so these run times reflect the first time the queries are run. 


### Optimized Run Time with Materialized View

If we create the following materialized view
```sql
create materialized view daymark.book_author_rating_mv as

SELECT b.book_id, b.title as title, a.name as name, a.author_id, g.genre, it.rating::float as rating
FROM daymark.books b
         JOIN daymark.interactions it on b.book_id = it.book_id
         JOIN daymark.genres g on b.book_id = g.book_id
         JOIN daymark.writes w on w.book_id = b.book_id
         JOIN daymark.authors a on w.author_id = a.author_id
WHERE it.is_read
  AND it.rating != 0
  AND it.is_reviewed
```

Use it to re-run the two queries
```sql
SELECT author_id, name, count(*) as score
FROM daymark.book_author_rating_mv
WHERE genre LIKE '%young-adult%'
GROUP BY 1, 2
ORDER BY 3 desc
LIMIT 10
```

and 

```sql
WITH avg_rating_by_author_book as (
    SELECT author_id, name, title, round(avg(rating), 1) as avg_rating
    FROM daymark.book_author_rating_mv
    WHERE genre LIKE '%young-adult%'
    GROUP BY 1, 2, 3
    HAVING count(*) >= 1000)

SELECT author_id, name, round(avg(avg_rating), 1) as score
FROM avg_rating_by_author_book
GROUP BY 1, 2
ORDER BY 3 DESC
LIMIT 10
```

The new run times are **4356 ms** and **6857 ms**, respectively, i.e., **37%** and **1%** reduction in first-time run time.

