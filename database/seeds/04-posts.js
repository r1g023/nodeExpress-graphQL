exports.seed = function (knex) {
  return knex("posts").insert([
    {
      id: 1000,
      title: "Shrimp and Chorizo Paella",
      date: "Jun 15, 2022",
      image:
        "https://res.cloudinary.com/mealthy1/image/upload/ar_16:11,c_fill,f_auto,h_600,q_auto:best,w_800/v1519240983/cms_recipe_featured_image/nkvv343hiftje2g677zu.png",
      post: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
      liked: false,
      user: "user1",
      user_id: 1000,
    },
    {
      id: 1001,
      title: "Shrimp Tacos",
      date: "Jun 16, 2022",
      image:
        "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2020/04/Shrimp-Tacos-main-1.jpg",
      post: "These shrimp tacos are a great way to start the week off right. They are super easy to make and will be a great addition to your menu.",
      liked: false,
      user: "user2",
      user_id: 1001,
    },
    {
      id: 1002,
      title: "Frozen Pizza just like delivery",
      date: "Jun 17, 2022",
      image:
        "https://d3mvlb3hz2g78.cloudfront.net/wp-content/uploads/2011/02/thumb_720_450_pizza_shutterstock_40828648.jpg",
      post: "Every meal would be better if it were pizza. Adding some bright, fresh ingredients on top of a frozen pizza can almost make it taste homemade. ",
      liked: false,
      user: "user3",
      user_id: 1002,
    },
  ]);
};
