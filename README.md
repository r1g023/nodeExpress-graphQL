```markdown
# GraphQL: Authors and Books with User Authentication

**Introduction**

Welcome to the GraphQL playground for managing authors and books. Before proceeding, you need to register or log in to access the GraphQL endpoint.

**Accessing GraphQL Playground**

-Open [http://localhost:5000/playground](http://localhost:5000/playground) in your browser after running the server locally.
-You'll be directed to the GraphQL authentication page to register or log in.

![graphQL api](https://github.com/r1g023/nodeExpress-graphQL/assets/57161327/e6a5b55c-b0dc-4762-ab8a-225a0284ea87)

**Registration**
![graphQL api](https://github.com/r1g023/nodeExpress-graphQL/assets/57161327/362c221c-1a39-42f3-bda5-f6a0d761cf48)

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

Provide your email, username, password, and role (admin or user).

**Login**

Once registered, log in using your credentials:

Send a POST request to [http://localhost:5000/graphql/auth/](http://localhost:5000/graphql/auth/) within the GraphQL playground.

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

Provide your email and password to receive a token for authentication.

-After logging in, copy the token received and add it to the request headers for authorization in the GraphQL playground.

![authToken](https://github.com/r1g023/nodeExpress-graphQL/assets/57161327/01b83a5d-3ab3-4fac-9139-eb4e9069ea3e)

## User Registration and Login
| Mutations |
|-----------|
| registerUser: Users | (Required: email, username, password, role) |
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

For detailed usage instructions, refer to the provided GraphQL playground.
```
