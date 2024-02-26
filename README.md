
# **Introduction**

Welcome to the GraphQL playground for managing, users, posts, comments, and much more. This project leverages Apollo GraphQL, Node Express, PostgreSQL, and JWT for user authentication, providing a robust and secure environment for managing data.

Before proceeding, you need to register or log in to access the GraphQL endpoint.

# **Accessing GraphQL Playground**

- Open [http://localhost:5000/playground](http://localhost:5000/playground) in your browser after running the server locally.
- You'll be directed to the GraphQL authentication page to register or log in.

# **Registration**

To register as a new user:

Navigate to [http://localhost:5000/graphql/auth/](http://localhost:5000/graphql/auth/) within the GraphQL playground.

Use the following mutation:

```graphql
mutation register {
    registerUser(
        email: String!
        username: String!
        password: String!
        role: String! # admin or user
    ): Users
}
```
- **Provide your email, username, password, and role (admin or user).**

![graphQL api](https://github.com/r1g023/nodeExpress-graphQL/assets/57161327/a773394b-b949-4a76-bb4b-7ce69c8cdc06)


# **Login**

**Once registered, log in using your credentials:**

Navigate to [http://localhost:5000/graphql/auth/](http://localhost:5000/graphql/auth/) within the GraphQL playground.

Use the following mutation:

```graphql
mutation login {
    loginUser(email: String!, password: String!) {
        id
        username
        email
        role
        token # Use this token for authorization
    }
}
```

- **Provide your username and password to receive a token for authentication.**
- **After logging in, copy the token received and add it to the request headers for authorization in the GraphQL playground.**

![authToken](https://github.com/r1g023/nodeExpress-graphQL/assets/57161327/01b83a5d-3ab3-4fac-9139-eb4e9069ea3e)

## User Registration and Login

| Mutations |
|-----------|
| registerUser: (email: String!, username: String!, password: String!, role: String!): Users |
| loginUser(username: String!, password: String!): Users |

## Users/Posts/Comments Queries and Mutations with User Authentication

| Queries      | Mutations          |
|--------------|--------------------|
| getUsers     | updateUser         |
| getUserById  | deleteUser         |
| getPosts     | createPost         |
| getPostId    | updatePost         |
| getComments  | deletePost         |
| getCommentId | addComment         |
|              | updateCommentID    |

## Authors and Books Data with User Authentication

| Queries     | Mutations                                 |
|-------------|-------------------------------------------|
| getAuthors  | createAuthor                              |
| getAuthorId | deleteAuthor                              |
| getBooks    | addBook                                   |
| getBookId   | deleteBook                                |
|             | updateBooks                               |

### Usage

- After registering or logging in, obtain the authentication token.
- Use the token in the request headers for authorization.
- Access the GraphQL endpoint for managing authors and books with user authentication.

- 
Introduction:

Welcome to the GraphQL playground for managing authors and books. This project leverages Apollo GraphQL, Node Express, and JWT for user authentication, providing a robust and secure environment for managing your data. Whether you're an aspiring developer exploring GraphQL or an experienced engineer seeking a streamlined solution for data management, this project offers a comprehensive platform to work with authors and books efficiently.

To get started, follow the steps below to set up the project locally or deploy it online:

Accessing GraphQL Playground:

Open http://localhost:5000/playground in your browser after running the server locally.
You'll be directed to the GraphQL authentication page to register or log in.
Registration:

To register as a new user:

Navigate to http://localhost:5000/graphql/auth/ within the GraphQL playground.
Use the provided mutation to register a new user.
Provide your email, username, password, and role (admin or user).
Login:

Once registered, log in using your credentials:

Send a POST request to http://localhost:5000/graphql/auth/ within the GraphQL playground.
Use the provided mutation to log in.

Provide your email and password to receive a token for authentication.
After logging in, copy the token received and add it to the request headers for authorization in the GraphQL playground.

Features:
User Registration and Login: Seamlessly register and log in users with secure authentication.
Manage Users, Posts, and Comments: Perform CRUD operations on users, posts, and comments with user authentication.
Authors and Books Management: Efficiently handle authors and books data with authentication in place.

Usage:
After registering or logging in, obtain the authentication token.
Use the token in the request headers for authorization.
Access the GraphQL endpoint for managing authors and books with user authentication.
For detailed usage instructions, refer to the provided GraphQL playground.

For detailed usage instructions, refer to the provided GraphQL playground.
