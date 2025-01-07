# Interview Task: Full Stack Application Development
## Objective
Your task is to create a full-stack application for managing "items." The project consists of a backend API built with Express.js and TypeScript and a frontend application using React.js with Redux Toolkit.

This exercise will help us evaluate your skills in backend development, API design, frontend integration, and state management.

## Instructions
### How to run the project
1. Gitclone the project
2. Change the MySQL configuration in the .env file ( right now still use my local configuration ) :
   - run the MySQL
3. Go to backend folder :
   - run [ npm install ( For windows ) / sudo npm install ( For MacOS ) ]
   - run [ npm run dev ( For windows ) / sudo npm run dev ( For MacOS ) ]
4. Go to frontend folder :
   - run [ npm install ( For windows ) / sudo npm install ( For MacOS ) ]
   - run [ npm run dev ( For windows ) / sudo npm run dev ( For MacOS ) ]
5. Can use Postman / Swagger to test the backend API
6. Go to localhost:5173 to test the frontend side
7. API endpoint :
   - "http://localhost:3000/api/item" for items/fetchItems and items/addItem
   - `http://localhost:3000/api/item/${id}` for items/fetchItemById and items/deleteItem
   - `http://localhost:3000/api/item/${payload.id}` for items/updateItem

