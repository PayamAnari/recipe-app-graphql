<h1 align="center">
  <img
    width="300"
    alt="task-manager"
    src="https://live.staticflickr.com/65535/53558616560_a10fbebeaa_c.jpg">
</h1>

---
<h3 align="center">
  <strong>
      🪩 Recipe-App GraphQL 🪩

  </strong>
</h3>

---
<p align="center">
  <img 
    width="800"
    alt="home"
    src="https://live.staticflickr.com/65535/53557320442_872df9f018_z.jpg"/>
</p>

---

## GraphQL Recipe-app 
### Description

This is a GraphQL-powered Recipe App built with Node.js, MongoDB, and Apollo Server. The application allows users to manage recipes, including creating, editing, deleting, and rating recipes.

---

## Features

- **User Authentication:** Users can sign up and log in to access and manage their recipes.
- **Recipe Management:** Users can create new recipes, edit existing ones, and delete recipes they own.
- **Rating System:** Recipes can be rated with thumbs up or thumbs down, providing feedback to the creators.
- **User Profiles:** Each user has a profile showing their recipes and basic information.
- **GraphQL API:** Utilizes GraphQL for efficient and flexible querying of recipe data.

---

## Recipe Management

- **CRUD Operations:** Perform Create, Read, Update, and Delete operations on recipes for seamless recipe management.
- **Rating System:** Allow users to rate recipes with thumbs up or thumbs down, providing valuable feedback.
- **User Relationships:** Associate recipes with specific users to track creators and contributors accurately.

## User Authentication and Authorization

- **User Registration:** Enable users to register for an account with their email, password, first name, and last name.
- **User Login:** Implement secure login functionality using email and password credentials.
- **User Profile Management:** Provide endpoints for users to update their profile information, including first name, last name, and email.
- **User Authentication:** Implement token-based authentication to verify user identity and authorize access to protected resources.
- **Error Handling:** Gracefully handle authentication errors and unauthorized access to endpoints.

---

## GraphQL API Functionality

- **Query Operations:** Define queries to retrieve recipes, users, and other relevant data from the GraphQL API.
- **Mutation Operations:** Implement mutations for creating, updating, and deleting recipes, as well as managing user accounts.
- **Schema Design:** Design a robust GraphQL schema to represent recipes, users, and associated data structures.
- **API Documentation:** Document available queries, mutations, and types to guide API consumers in utilizing the GraphQL endpoint effectively.

---

## API Documentation

### Types

- **Recipe:** Represents a recipe with its details including name, description, creator, etc.
- **User:** Represents a user with their basic information, recipes they've created, etc.

### Queries

- **getUsers:** Retrieves a list of users.
  <br/>**Parameters:**
      </br>**total:** Limit the number of users to retrieve.

- **getUserById:** Retrieves a user by their ID.
<br/>**Parameters:**
<br/>**id:** ID of the user to retrieve.

- **recipe:** Retrieves a recipe by its ID.
<br/>**Parameters:**
<br/>**id:** ID of the recipe to retrieve.

- **getRecipes:** Retrieves a list of recipes.
<br/>**Parameters:**
<br/>**amount:** Limit the number of recipes to retrieve.

### Mutations

- **signup:** Registers a new user.
<br/>**Parameters:**
<br/>**input:** User registration details.

- **login:*8 Authenticates a user.
<br/>**Parameters:**
<br/>**input:** User login credentials.

- **createRecipe:** Creates a new recipe.
<br/>**Parameters:**
<br/>**recipeInput:** Recipe details.

- **deleteRecipe:** Deletes a recipe.
<br/> **Parameters:**
<br/> **id:** ID of the recipe to delete.

- **editRecipe:** Edits an existing recipe.
<br/>**Parameters:**
<br/>**id:** ID of the recipe to edit.
<br/>**recipeInputUpdate:** Updated recipe details.

- **incrementThumbsUp:** Increments the thumbs up count for a recipe.
<br/>**Parameters:**
<br/>**id:** ID of the recipe to increment thumbs up.

- **incrementThumbsDown:** Increments the thumbs down count for a recipe.
<br/>**Parameters:**
<br/>**id:** ID of the recipe to increment thumbs down.

---

## Technologies Used

- **Node.js:** Server-side JavaScript runtime environment.
- **MongoDB:** NoSQL database used for storing recipe and user data.
- **Apollo Server:** GraphQL server implementation for Node.js.
- **GraphQL:** Query language for APIs, providing a more efficient and powerful alternative to REST.
- **JSON Web Tokens (JWT):** Used for user authentication and authorization.
- **Mongoose:** MongoDB object modeling tool for Node.js.

   <p align="left">
  <img src="https://img.shields.io/badge/Nodejs-FF0000?style=for-the-badge&logo=nodejs&logoColor=white"/>
  <img src="https://img.shields.io/badge/mongodb-00008B?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/apollo-acace6?style=for-the-badge&logo=apollo&logoColor=white"/>
  <img src="https://img.shields.io/badge/graphql-0000FF?style=for-the-badge&logo=graphql&logoColor=white"/>
  <img src="https://img.shields.io/badge/JWT-ffa500?style=for-the-badge&logo=jwt&logoColor=white"/>
  <img src="https://img.shields.io/badge/mongoose-FF2578?style=for-the-badge&logo=mongoose&logoColor=white"/>
 
</p>


---

## Getting Started

- **Clone the Repository:**
```
git clone https://github.com/PayamAnari/recipe-app-graphql.git

```
- **Install Dependencies:**
```
cd recipe-app-graphql
npm install

```
- **Set Environment Variables:**
```
PORT=4000
MONGODB_URL=your-mongodb-connection-string
JWT_PRIVATE_KEY=your-jwt-private-key
TOKEN_EXPIRY_TIME=token-expiry-time

```
- **Start the Server:**
```
npm start

```
- **Access the GraphQL Playground:**
Open your browser and go to http://localhost:4000 to access the GraphQL Playground. Here, you can interact with the API, execute queries, and explore the schema.
