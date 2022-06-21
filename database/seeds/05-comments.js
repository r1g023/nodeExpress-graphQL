exports.seed = function (knex) {
  return knex("comments").insert([
    { id: 1, comment: "This is a comment for user 1", post_id: 1 },
    { id: 2, comment: "This is a comment for user 2", post_id: 2 },
    { id: 3, comment: "This is a comment for user 3", post_id: 3 },
  ]);
};
