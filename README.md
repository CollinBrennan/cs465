# Travlr

**Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).**

The client-facing application used HTML and Handlebars templates for the interface.

**Why did the backend use a NoSQL MongoDB database?**

A big advantage of using MongoDB for this project is that Mongo documents share an identical syntax with JavaScript objects, so they were very easy to work with. MongoDB is also very robust and has useful features like pipelines and indexes built in, which will prevent the database from bottlenecking the rest of the application if it were to expand in the future and performance becomes more of an issue.

**How is JSON different from Javascript and how does JSON tie together the frontend and backend development pieces?**

JSON is a format used for storing and transferring data. It shares the same syntax as JavaScript objects so they are very easy to work with in web applications. The application provides access to a REST API, so whenever data is requested by the frontend, it is retrieved from the database and returned in the JSON format in the response body. 

**Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components.**

Trip cards were refactored into their own UI component, and this made implementing the home screen of the admin application a lot more efficient since multiple instances of the component could be created, with each card reflecting an entry in the database.

**Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods, endpoints, and security in a full stack application.**

An endpoint is something that can be called in the URL which invokes an HTTP method that performs some function on the server, usually fetching static web pages, assets, or performing database actions. The application makes use of three HTTP methods which are GET, POST, and PUT. GET is used to retrieve data, POST will send data in the request body which will be encrypted if the request is made over https, and PUT is similar to POST except that it will update a resource instead of adding a new one. Authorization of POST and PUT requests was done using JSON Web Tokens (JWT) which are provided to the user on login and sent as part of the payload and validated when they make a request to add or change entries in the database.
