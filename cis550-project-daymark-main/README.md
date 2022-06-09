# CIS 550 Spring 2022 Semeter - Team Daymark

This is the repo for Team Daymark. 

## Team members
* Yu-Po Chen, cheny20@seas.upenn.edu
* Matthew Sitzer, mtsitzer@seas.upenn.edu
* Daniel Leng, dleng35@seas.upenn.edu
* Khyati Sanchiher khyatisa@seas.upenn.edu

## Application Idea

We will create a React.js based web application that displays information from Goodreads on more than 2 million books, along with their respective user/reader interactions. Core features include filtering books by names, genres, popularity (ratings count), and rating (average rating), as well as filtering authors by name, popularity (ratings count), and rating (average rating). We will present information such as a book’s ISBN, author, publication date, page count, etc., as well as raw and aggregated interaction data such as ratings, reviews, and book completion status/ratios. 

## Datasets

The datasets we will be using were collected in late 2017 (later updated in 2019) from goodreads.com by researchers at UCSD [link to full set](https://sites.google.com/eng.ucsd.edu/ucsdbookgraph/home). They contain data on books, their reviews, and interactions of users on the site with these books. 

## Project Structure

* __server__: Node.js server that provides the API and runs SQL 
* __client__: React.js client that displays the pages and calls the backend server
* __analysis__: Jupyter notebooks for doing exploratory data analyses and data cleaning 



## Dev Environment

This project contains `.devcontainer`, which lets you use a Docker container as a full-featured development environment if you use Visual Studio Code. 

For instruction on how to use develop inside a container, see [this](https://code.visualstudio.com/docs/remote/containers)

## Getting Started

### Set up DB credentials

Inside the root direcotry, create a file `.env` and enter the credential information
```
DB_HOST= host.docker.internal
DB_USER=daymark 
DB_PASSWORD= // DB password 
DB_DATABASE=dev
DB_PORT=5439
```

The configs in this file will get picked up automatically by the devcontainer and made available to all Node processes 

### Set up SSH Tunneling on your host machine

Since the database is inside a private VPC on AWS, you need to set up a SSH tunnel so the Node processes running inside the Docker container can communicate with the database. 

Run this command on your host machine

`ssh -fN -L 5439:serverless-endpoint-endpoint-wdkkgpigszsa6tgnqklo.075843551728.us-east-1.redshift-serverless.amazonaws.com:5439 ec2-user@ec2-3-84-0-78.compute-1.amazonaws.com`

This will forward all traffic on port `5439` to the database. 

### Start Devcontainer in VS Code

Follow the [instruction](https://code.visualstudio.com/docs/remote/containers#_quick-start-open-an-existing-folder-in-a-container) to build and start the dev container. After the container starts successfully, the terminal will be inside the container environment. 

### Work on Server code 

Run `cd server` to go into the server directory, and `npm install` to install the packages used for the server code. 

To start the API server, run `npm start`, then connect to `http://localhost:3001`

### Work on Client code 

Run `cd client` to go into the client directory, and `npm install` to install the packages used for the client code. 

To start the React dev server, run `npm start`, then connect to `http://localhost:3000`.

### Query database

When querying the database, make sure to include the schema name `daymark` with the table name, i.e.

```sql
SELECT * from daymark.books;
```