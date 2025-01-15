#Challenge: Create a RESTful API for Book Management
-Build a simple RESTful API to manage a collection of books.

##Application Features
- Add new books.
- Retrieve a list of all books.
- Retrieve the details of a specific book by ID.
- Update book information.
- Delete a book.

###Endpoints to Build
- GET /books – Retrieve a list of all books.
- GET /books/:id – Retrieve detailed information of a book by ID.
- POST /books – Add a new book (data sent in the request body).
- PUT /books/:id – Update book information by ID.
- DELETE /books/:id – Delete a book by ID.

####Technologies Used
-Use https://dbdiagram.io/ to design the database schema for review before coding.
- Express.js for building the API.
- PostgreSQL for database storage.
- Input Validation:
- Ensure all required fields are not empty.
- Error Handling with HTTP Status Codes:
  + 404: Book not found.
  + 400: Invalid input data.
  + 500: Server error.

#####Deployment:
- Deploy the API to https://railway.app/.
- API Response Format:
Successful Response:
json
{
  "status": "success",
  "data": {
    "id": "1",
    "title": "Node.js Basics",
    "author": "John Doe",
    "publishedDate": "2023-01-01",
    "genre": "Programming",
    "summary": "A beginner's guide to Node.js"
  }
}
Error Response:
json
{
  "status": "error",
  "message": "Book not found"
}