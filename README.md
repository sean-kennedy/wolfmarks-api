# Wolfmarks API

###!Work in progress!

A simple bookmarking rest API using sails.js with JWT authentication.

## Routes

### Authentication

No access token required.

`POST /auth/register`: Returns newly created user object and an access token.
`POST /auth/login`: Returns user object and access token.

### Users

Access token required

`GET /users`: Returns all users.
`GET /users/:id`: Returns user by `id`.
`POST /users`: Create new user.
`DELETE /users/:id`: Delete user by `id`.
`PUT /users/:id`: Update user by `id`.
`GET /users/:id/bookmarks`: Returns all bookmarks from a user by `id`.

### Bookmarks

Access token required

`GET /bookmarks`: Returns all bookmarks.
`GET /bookmarks/:id`: Returns bookmark by `id`.