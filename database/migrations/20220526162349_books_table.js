exports.up = function (knex) {
  return knex.schema.createTable("books", function (tbl) {
    tbl.increments("id");
    tbl.string("name", 128).notNull();
    tbl
      .integer("author_id")
      .unsigned()
      .notNull()
      .references("authors.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("books");
};
