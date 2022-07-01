exports.seed = function (knex) {
  return knex("comments").insert([
    {
      id: 1000,
      comment: "This is a comment for user 1",
      liked: false,
      post_id: 1000,
    },
    {
      id: 1001,
      comment: "This is a comment for user 2",
      liked: false,
      post_id: 1001,
    },
    {
      id: 1002,
      comment: "This is a comment for user 3",
      liked: false,
      post_id: 1002,
    },
  ]);
};
