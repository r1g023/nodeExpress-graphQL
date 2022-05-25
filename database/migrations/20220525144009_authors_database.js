exports.up = function (knex) {
  return knex.schema.createTable("authors", function (tbl) {
    tbl.increments("id");
    tbl.string("name", 128).notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("authors");
};
