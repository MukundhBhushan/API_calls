//use 
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
    //schema here,
    graphiql:true //postman like tool for graph no npm install required for this
    //it opens in the web browser when the url is entered
    //go to the doc section in graphiql to check the schema of the db
  }))



//create a new folder "schema" in the server folder //this file contains all the schema(ie obj,relations in thee graph, entry points to the graph ) the middleware needs
//create a new file(schema.js) in the schema folder 

//in schema.js
    const graphql = require('graphql')
          //used to define obj  
    const {GraphQLObjectType,GraphQLString,GraphQLSchema} = graphql  //grabing a specific function only from the lib

    const <type name> = new GraphQLObjectType({  //type name is a var enter any name

        name:'<value>', //display name

        fields:() => ({
            <property1>:{type:<graphql data type>},
            <property2>:{type:<graphql data type>}
        })
    })

//for array
    add GraphQLList in the graphql array
    <property1>: new GraphQLList(<data type>) 
    
    <-----creating the root query obj---->
    // in the schema file
    //crete this obj in the end of the file 

        const RootQuery = new GraphQLObjectType({
            name:'RootQueryType',
            fields:{
                <psudo type1 name>:{
                    type:<type1 name>,
                    args:{
                        <arg1>:{type:<graphql datatype>},
                        <arg2>:{type:<graphql datatype>}       
                    },
                    resolve(parent,args){   //resolve => gets data from db or other source
                        //code for db CRUD
                    }
                }
            }
        })
module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation //check in CRUD below
})


//to import the schema
//in the index.js file
    const schema=require('<file path>')

//in the middleware 
app.use('/<api route url>',graphqlHTTP({
    schema 
  }))


<-----------linking data together------>
//define the types obj being used
//in the fields method include th type being used and use resolve for data retrival
//eg====>
    const type1 = new GraphQLObjectType({
    name: 'name1',
    fields: ( ) => ({
        <propertyT11>: { type: <graphql datatype> },
        <property1>: { type: <graphql datatype> },
        <property1>: { type: <graphql datatype> },

        //parent is used as it contains the data of the property1
        //args is used as it contains the data of the property2
        author: {
            type: type2,
            resolve(parent, args){
                //db code  
            }
        }
    })
});

const type2 = new GraphQLObjectType({
    name: 'name2',
    fields: ( ) => ({
        <propertyT21>: { type: <graphql datatype> },
        <propertyT22>: { type: <graphql datatype> },
        <propertyT23>: { type: <graphql datatype> },
    })
});

  <--------using graphiql---------------->
  //this is available along with the graphql packag no additional pacakges req for this

  //in the express app file (index.js)
    //in the graphql middleware being used add 
        graphiql:true

        <-----quering data-------->
        //in the web browser tool 
        //get req-->
        {
            <psudo type1 name>(args:"<value>"){ //<psudo type1 name> found in the RootQuery under fields
                <property1>,
                <property2>,
                <property3>{  //quring form linked data
                    <property1 of linked data>
                    <property2 of linked data>
                }

            } 
        }

        <------mutation-------->
        //add keyword mutaion

        mutation {
            <mutation function name>(args:"<value>"){
                p1, 
                p2  
                    
            }

        }

<---------------------------------connecting to DB------------------------------------------->

<-----MongoDB-------->
install mongoose
    npm install mongoose --save
using MLabs
    in the website copy the connection string

//in express app (index.js)
    const mongoose = require('mongoose')
    mongoose.connect(<connection string from Mlabs>)  //if using mongo locally use the mongodb generated url

//create a new folder called models in the server folder
    //create a new js file
    //this file contains the mongoose schemas of the data being retrived
    //same as an interface in ts to format the data in a specific way when returned
    
        const mongoose = require('mongoose')
        const Schema = mongoose.Schema
        const <var name>=new Schema({
            <property name1>:<data type>
            <property name2>:<data type>
            <property name3>:<data type>
        })

    module.exports = mongoose.model('<psudoname of var>',<var name>)

//in the schema.js
    const '<psudo var name of mongoose schema>' = require('<file path>')

<------------------------CRUD----------------------->
//changing data in graphql => mutation
//in the schema.js
//same as declaring a RootQuery as above
    const mutation = new GraphQLObjectType({
        name:'Mutation',
        fields:{
            <mutation function name1>:{    //like addUser,deleteUser function name to perform CRUD opt
                type:<data type>
                args:{
                    <arg1>:{type:<data type>},
                    <arg2>:{type:<data type>}
                },
                resolve(parent,args){
                    let <obj name>=new <psudo var name of mongoose schema/data type>{
                        p1:args.<property1>,
                        p2:args.<property2>
                    }
                }
                return(action done on <obj name>) //saving to mongodb with mongoose <obj name>.save()
            }
        }
    })

//in the schema.js 
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

//check using graphiql section for request
