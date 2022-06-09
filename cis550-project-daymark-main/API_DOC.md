# API Documentation

## Book

### Find book by ID

Returns the attributes of a book by specifying its book id

**URL**: `/book/:id(\d+)`

**Method**: `GET`

#### Success Response
**Code**: `200 OK`

**Content Example**:

```json
{
    "isbn": "0142427896",
    "country_code": "US",
    "language_code": "",
    "description": "Unabridged CDs, 25 CDs, 30 hoursRead by TBABobbi Anderson and the other good folks of Haven, Maine, have sold their sould to reap the rewards of the most deadly evil this side of hell.",
    "format": "Audio CD",
    "publisher": "Penguin Audio",
    "num_pages": 1,
    "pub_day": 13,
    "isbn13": "9780142427897",
    "pub_month": 5,
    "pub_year": 2010,
    "image_url": "https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png",
    "book_id": "7203847",
    "title": "The Tommyknockers"
}
```

### Search books by book title, author name, or ISBN

Return books that match the provided title, author name, or ISBN. The response is limited to at most 10 results. If no book title, author name, or ISBN is provided, then return the first 10 books from the database.


**URL**: `/book/search/?title=[]&author_name=[]&isbn=[]`

**Method**: `GET`

#### Success Response
**Code**: `200 OK`

**Content Example**:
```json
[
    {"book_id": xxx, "title": xxx},
    {"book_id": xxx, "title": xxx},
    {"book_id": xxx, "title": xxx},
    {"book_id": xxx, "title": xxx},
    {"book_id": xxx, "title": xxx}
]
```

### Find top books, with sorting and filtering options

Return the top books, with the following optional parameters:
* Sort by: **number of times the book was read** OR **average rating**. **Default**: number of times the book was read
* Limit: number of results to return. Must be between 1 - 100 . **Default**: 5 
* Genre:  can filter to specific genre or include all genres. **Default**: all genres
* Publication year: can filter to specific publication year or include all years. **Default**: all years

**URL**: `/book/top/?sort_by=[count|avg]&limit=[1-100]&genre=[]&pub_year_start=[]&pub_year_end=[]`

**Method**: `GET`

#### Success Response
**Code**: `200 OK`

**Content Example**:

```json
[
    {"book_id": xxx, "title": xxx, "score": ###},
    {"book_id": xxx, "title": xxx, "score": ###},
    {"book_id": xxx, "title": xxx, "score": ###},
    {"book_id": xxx, "title": xxx, "score": ###}
]
```

In the returned result, `score` is the numeric field by which results are sorted

### Find similar books by book ID
Return similar books based on the provided book ID

**URL**: `/book/similar/:id(\d+)`

**Method**: `GET`

#### Success Response
**Code**: `200 OK`

**Content Example**:

```json
[
    {"book_id": xxx, "title": xxx},
    {"book_id": xxx, "title": xxx},
    {"book_id": xxx, "title": xxx},
    {"book_id": xxx, "title": xxx},
    {"book_id": xxx, "title": xxx}
]
```

## Author

### Find author by ID

Returns the attributes of an author by specifying their author id

**URL**: `/author/:id(\d+)`

**Method**: `GET`

#### Success Response
**Code**: `200 OK`

**Content Example**:

```json
{"author_id": xxx, "name": xxx}
```

### Find top authors, with sorting and filtering options

Return the top authors, with the following optional parameters:
* Sort by: **number of times the author was read** OR **average rating** OR **averaged standard deviation of rating**. **Default**: number of times the author was read
* Limit: number of results to return. Must be between 1 - 100. **Default**: 5 
* Genre:  can filter to specific genre or include all genres. **Default**: all genres

**URL**: `/author/top/?sort_by=[count|avg|stddev]&limit=[1-100]&genre=[]`

**Method**: `GET`

#### Success Response
**Code**: `200 OK`

**Content Example**:

```json
[
    {"author_id": xxx, "name": xxx, "score": ###},
    {"author_id": xxx, "name": xxx, "score": ###},
    {"author_id": xxx, "name": xxx, "score": ###},
    {"author_id": xxx, "name": xxx, "score": ###}
]
```

In the returned result, `score` is the numeric field by which results are sorted

### Find similar authors by author ID
Return similar authors based on the provided author ID

**URL**: `/author/similar/:id(\d+)`

**Method**: `GET`

#### Success Response
**Code**: `200 OK`

**Content Example**:

```json
[
    {"author_id": xxx, "name": xxx},
    {"author_id": xxx, "name": xxx},
    {"author_id": xxx, "name": xxx},
    {"author_id": xxx, "name": xxx},
    {"author_id": xxx, "name": xxx}
]
```