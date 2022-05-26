exports.seed = function (knex) {
  return knex("books").insert([
    { id: 1, name: "Harry Potter and the Chamber of Secrets", author_id: 1 },
    { id: 2, name: "The Two Towers", author_id: 2 },
    { id: 3, name: "The Way of Shadows", author_id: 3 },
  ]);
};
