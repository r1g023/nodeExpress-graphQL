exports.seed = function (knex) {
  return knex("comment_likes").insert([
    {
      user_id: 1000,
      comment_id: 1000,
    },
    {
      user_id: 1001,
      comment_id: 1001,
    },
    {
      user_id: 1002,
      comment_id: 1002,
    },
  ]);
};
