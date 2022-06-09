CREATE TABLE Books (
    isbn            VARCHAR(20),
    country_code    VARCHAR(10),
    language_code   VARCHAR(10),
    "description"     VARCHAR(65535),
    "format"          VARCHAR(120),
    publisher       VARCHAR(260),
    num_pages       INT,
    pub_day         INT,
    isbn13          VARCHAR(20),
    pub_month       INT,
    pub_year        INT,
    image_url       VARCHAR(100),
    book_id         VARCHAR(10),
    title           VARCHAR(260),
    PRIMARY KEY (book_id)
);
CREATE TABLE "Similar" (
    book_id     VARCHAR(10),
    similar_to  VARCHAR(10),
    PRIMARY KEY (book_id, similar_to),
    FOREIGN KEY (book_id) REFERENCES Books (book_id),
    FOREIGN KEY (similar_to) REFERENCES Books (book_id)
);
CREATE TABLE Authors (
    author_id   VARCHAR(10),
    name        VARCHAR(120),
    PRIMARY KEY (author_id)
);
CREATE TABLE Writes (
    book_id     VARCHAR(10),
    author_id   VARCHAR(10),
    "role"        VARCHAR(40),
    PRIMARY KEY (book_id, author_id),
    FOREIGN KEY (book_id) REFERENCES Books (book_id),
    FOREIGN KEY (author_id) REFERENCES Authors (author_id)
);
CREATE TABLE Genres (
    book_id     VARCHAR(10),
    genre       VARCHAR(40),
    num_tagged  REAL,
    PRIMARY KEY (book_id, genre),
    FOREIGN KEY (book_id) REFERENCES Books (book_id)
);
CREATE TABLE Interactions (
    idx     INT,
    user_id   VARCHAR(10),
    is_read   INT,
    rating    INT,
    is_reviewed INT
    book_id   VARCHAR(10),
);