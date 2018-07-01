//create a folder (called server) in the project folder
//npm init
//create a new file(index.js) in server folder

//set up basic express server app
  const express = require('express')
  const app= express()
  
  app.listen(<port number>) //use nodemon index.js to start the server
  
//graphql and supporting package
  npm install graphql express-graphql --save

//in the express app (index.js)
  const graphqlHTTP = require('express-graphql')
  //graphqlHTTP acts as a middleware 
  
  //in the express app (index.js)
  //api router link => the req url for which the app needs the server 
    eg=> /api/profile the /api is the api router link
  
    app.use('/<api route url>',graphqlHTTP({
      
    }))

