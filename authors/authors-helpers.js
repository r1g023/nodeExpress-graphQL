const db = require("../database/dbConfig");
const authors = db("authors");
const books = db("books");

module.exports = { authors, books };
