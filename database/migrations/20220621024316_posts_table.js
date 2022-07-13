exports.up = function (knex) {
  return (
    knex.schema
      .createTable("posts", (tbl) => {
        tbl.increments("id");
        tbl.string("title", 128).notNull();
        tbl.date("date").notNull();
        tbl.string("image", 256).nullable().defaultTo(null);
        tbl.string("post", 1000).notNull();
        tbl.boolean("liked").defaultTo(false);
        tbl.timestamps(true, true);
        tbl
          .string("user")
          .unsigned()
          .notNull()
          .references("users.username")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
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
        tbl.string("comment", 500).notNull();
        tbl.boolean("liked").defaultTo(false);
        tbl.integer("count").defaultTo(0); // get the count for likes
        tbl.timestamps(true, true);
        tbl
          .string("user")
          .unsigned()
          .notNull()
          .references("users.username")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        tbl
          .integer("post_id")
          .unsigned()
          .notNull()
          .references("posts.id")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
      })

      // comments_like table
      .createTable("comment_likes", (tbl) => {
        tbl.increments("id");
        tbl
          .integer("user_id")
          .unsigned()
          .notNull()
          .references("users.id")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        tbl
          .integer("comment_id")
          .unsigned()
          .notNull()
          .references("comments.id")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        tbl.timestamps(true, true);
      })
  );
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("comments").dropTableIfExists("posts");
};
