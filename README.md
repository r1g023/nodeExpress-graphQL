# GraphQL -- Authors and Books with user authentication 



_GET_ https://node-express-graphql-api.herokuapp.com/graphql

1) you will be prompted to go to graphql/auth to register or login in order to access the graphql endpoint.



_REGISTER_
_POST_ https://node-express-graphql-api.herokuapp.com/graphql/auth

1) You will register as a new user
2) Password is hashed and salted, actual password is not stored anywhere in the database.
3) Graphql endpoint is available at an admin level. If you register as a user, you will not have access to the Graphql endpoint at the user level.
   
 ```javascript
           mutation register {
            registerUser(
                email: String!
                username: String!
                password: String!
                role: String! -- admin or user
                ): Users
            }
```           
   
_LOGIN_
_POST_ https://node-express-graphql-api.herokuapp.com/graphql/auth

1) you will login as user after registering for the first time
2) Once logged in, you will receive a token, use this token on client request headers, specifically authorization to get access to the graphql endpoint. 
3) I recommend using the chrome ModHeader extension to add the token to the request headers or use your own GraphQL client.
4) [ModHeader](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj?hl=en)
   
 ```javascript
           mutation login {
            loginUser(email: String!, password: String!) {
                    id
                    username
                    email
                    role
                    token - _*this is the token you will use to access the graphql endpoint*_
             }
            }
```

# User Registration and Login
| Mutations |
|----------|
| registerUser: Users |
| loginUser(username: String!password: String!): Users |


## Users/Posts/Comments queries and mutations with user authentication
| Queries | Mutations |
|---------| -----------|
| getUsers: [Users] | updateUser: Users |
| getUserById: Users | deleteUser: Users |
| getPosts: [Posts] | createPost: Posts  |
| getPostId: Posts | updatePost: Posts  * **__\|__** deletePost: Posts |
| getComments: [Comments] | addComment: Comments |
| getCommentId: Comments | updateCommentID: Comments |


### Authors and Books data with user authentication
| Query | Mutations |
|-------|-----------|
| getAuthors: [Author] | createAuthor(name: String!): Author **__\|__** deleteAuthor(id: Int!): Author |                 
| getAuthorId(id: Int!): Author | updateAuthorId(id: Int!name: String!): Author |
| getBooks: [Books] | addBook(name: String!author_id: Int!): Books **__\|__** deleteBook(id: Int!): Books |
| getBookId(id: Int!): Books | updateBooks( id: Int! name: String! author_id: Int! ): Books |




