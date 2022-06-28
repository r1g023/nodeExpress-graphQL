exports.up = function (knex) {
  return (
    knex.schema
      .createTable("posts", (tbl) => {
        tbl.increments("id");
        tbl.string("title", 128).notNull();
        tbl.date("date").notNull();
        tbl.string("image", 256).nullable().defaultTo(null);
        tbl.string("content", 256).notNull();
        tbl.string("method", 256).nullable().defaultTo(null);
        tbl.boolean("liked").defaultTo(false);
        tbl.timestamps(true, true);
        tbl
          .integer("user_id")
          .unsigned()
          .notNull()
          .references("users.id")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
      })
      //create comments table
      .createTable("comments", (tbl) => {
        tbl.increments("id");
        tbl.string("comment", 256).notNull();
        tbl.boolean("liked").defaultTo(false);
        tbl.timestamps(true, true);
        tbl
          .integer("post_id")
          .unsigned()
          .notNull()
          .references("posts.id")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
      })
  );
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("comments").dropTableIfExists("posts");
};
