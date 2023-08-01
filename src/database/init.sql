/**
- Book
  - id
  - name

- Page
  - id
  - book_id
  - page_number

- sentense
  - id
  - text_en
  - text_ja
  - page_id

- word
 - id
 - word_en
 - word_ja
 - page_id
**/

CREATE EXTENSION pgcrypto;

DROP TABLE word;
DROP TABLE sentense;
DROP TABLE page;
DROP TABLE book;
CREATE TABLE public.book
(
    id serial,
    book_name varchar(255),
    PRIMARY KEY (id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (book_name)
);

CREATE TABLE public.page
(
    book_id integer,
    page_number integer,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (book_id, page_number),
    FOREIGN KEY (book_id) references public.book(id)
);

CREATE TABLE public.sentense
(
    id serial,
    text_en text,
    text_ja text,
    book_id integer,
    page_number integer,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (book_id, page_number) references public.page(book_id, page_number)
);

CREATE TABLE public.word
(
    id serial,
    word_en varchar(255),
    word_ja varchar(255),
    "description" text,
    book_id integer,
    page_number integer,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (book_id, page_number) references public.page(book_id, page_number)
);

/* test data */

insert into book (book_name) values('testbook');
-- select book_id, 1 as page_number from book LIMIT 1;
insert into page (book_id, page_number) select id, 1 as page_number from book LIMIT 1 ON CONFLICT DO NOTHING;
select * from book;
select * from page;

