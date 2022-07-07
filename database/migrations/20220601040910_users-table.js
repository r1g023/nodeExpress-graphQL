exports.up = function (knex) {
  return knex.schema.createTable("users", function (tbl) {
    tbl.increments("id");
    tbl.string("first_name", 128).notNull().defaultTo("");
    tbl.string("last_name", 128).notNull().defaultTo("");
    tbl.date("dob").nullable().defaultTo(null);
    tbl.string("email", 128).notNull().unique();
    tbl.string("username", 128).notNull().unique();
    tbl.string("password", 128).notNull();
    tbl.string("role", 128).notNull();
    tbl.string("avatar", 256).nullable().defaultTo(null);
    tbl.boolean("dark_mode").defaultTo(false);
    tbl.string("about_you", 256).nullable().defaultTo(null);
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
