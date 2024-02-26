# GraphQL: Authors and Books with User Authentication

## Introduction

To access the GraphQL endpoint for managing authors and books, users need to register or log in to obtain authentication credentials. 

### Registration
To register as a new user, use the provided mutation:
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

### Login
Once registered, users can log in using their credentials:
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

After logging in, copy the token received and add it to the request headers for authorization in the GraphQL playground.

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
