exports.seed = function (knex) {
  return knex("comments").insert([
    {
      id: 1000,
      comment: "This is a comment for user 1",
      liked: false,
      user: "user1",
      post_id: 1000,
    },
    {
      id: 1001,
      comment: "This is a comment for user 2",
      liked: false,
      user: "user2",
      post_id: 1001,
    },
    {
      id: 1002,
      comment: "This is a comment for user 3",
      liked: false,
      user: "user3",
      post_id: 1002,
    },
  ]);
};
