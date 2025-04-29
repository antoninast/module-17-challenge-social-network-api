# Module 17 Challenge - Social Network API

Screen Recording - https://drive.google.com/file/d/1UuCwbDmWtyU9W-Mo6d0ltyUCMTz5INd7/view?usp=sharing

## Instalation
Clone the repo and run:
1. `npm i`
2. `npm run seed`
3. `npm run start`

## Usage
**The Social Network API** serves as the backend for a social networking application. It provides a set of RESTful endpoints that allow for the following operations:

**User Management:** Create, update, view, and delete users.

**Thoughts:** Users can create, edit, and delete their own thoughts.

**Reactions:** Users can react to any thought multiple times and remove their reactions as needed.

**Friendship:** Users can add other users as friends or remove them from their friends list.

This API is designed to support flexible and dynamic interactions between users in a social network environment.

## Tools and technologies
The application is built with the help of TypeScript, Express.js, MongoDB and mongoose.

## List of endpoints

### Users Routes
**GET** `/api/users` - retrieve all users

**POST** `/api/users` - create a new user

**GET** `/api/users/:userId` - get a single user by id

**PUT** `/api/users/:userId` - edit a user by id

**DELETE** `/api/users/:userId` - delete user by id

**POST** `/api/users/:userId/friends/:friendId` - add user as a friend

**DELETE** `/api/users/:userId/friends/:friendId` - delete user from friends list


### Thoughts Routes
**GET** `/api/thoughts` - get all thoughts

**POST** `/api/thoughts` - create a new thought

**GET** `/api/thoughts/:thoughtId` - get a single thought by id

**PUT** `/api/thoughts/:thoughtId` - edit a thought by id

**DELETE** `/api/thoughts/:thoughtId` - delete a thought by id

**POST** `/api/thoughts/:thoughtId/reactions` - add a reaction to thought

**DELETE** `/api/thoughts/:thoughtId/reactions` - delete a reaction from thought

