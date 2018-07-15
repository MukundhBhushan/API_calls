//create a folder (called server) in the project folder
//npm init

//create a new file(index.js) in server folder
//set up basic express server app in index.js
const express = require('express')
const app= express()

app.listen(<port number>) //use nodemon index.js to start the server

//graphql and supporting package
npm install graphql express-graphql --save

//in the express app (index.js)
const graphqlHTTP = require('express-graphql')
//graphqlHTTP acts as a middleware 

//in the express app (index.js)
//api router link -> the req url for which the app needs the server 
  eg=> /api/profile the /api is the api router link

  app.use('/<api route url>',graphqlHTTP({
    //schema here //require the schema file and add the <require name> here, <require name>=require('<schema file path>')
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

    const <type name>Type = new GraphQLObjectType({  //type name is a var enter any name relevent to what the schema is for

        name:'<value>', //display name

        fields:() => ({
            <property1>:{type:<graphql data type>},
            <property2>:{type:<graphql data type>},
            <property3>: {  //getting values from other schemas
                type: <other Type name>,
                resolve(parent, args){
                    //db code
            }
        }
        })
    })


<-------for array GraphQLList---->
    //add GraphQLList in the graphql array
    <property1>: new GraphQLList(<data type>) 
    
    <----------------------------------------creating the root query obj------------------------->
    //this obj helps in quering from all the created schemas or types
    // in the schema file
    //create this obj in the end of the file 


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



<----------using the api------------------->
//to import the schema
//in the index.js file
    const schema=require('<file path>')

//in the middleware 
app.use('/<api route url>',graphqlHTTP({
    schema 
  }))


//<-----------linking data together------>
//define the types obj being used
//in the fields method include th type being used and use resolve for data retrival
//eg====>
    const type1 = new GraphQLObjectType({
    name: 'name1',
    fields: ( ) => ({
        <propertyT11>: { type: <graphql datatype> },
        <property1>: { type: <graphql datatype> },
        <property2>: { type: <graphql datatype> },

        //parent is used as it contains the data of the property1
        //args is used as it contains the data of the property2
        <property3>: {
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

//<--------------------field required-------------------->
//when passing args during CRUD operations if one or many args must be passed and nt skiped
//in the const{<all the imports>}= graphql include
    GraphQLNonNull

    //in the RootQuery/mutation/other similar function under the specific <psudo type name> in the args:{}
    fields:{
                <psudo type1 name>:{
                    type:<type1 name>,
                    args:{
                        <arg1>:{type:new GraphQLNonNull(<graphql datatype>)},
                        <arg2>:{type:<graphql datatype>}       
                    },
                    resolve(parent,args){   //resolve => gets data from db or other source
                        //code for db CRUD
                    }
                }
            }
            


  //<--------using graphiql---------------->
  //this is available along with the graphql packag no additional pacakges req for this

  //in the express app file (index.js)
    //in the graphql middleware being used add 
        graphiql:true

        //<-----quering data-------->
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

        //<------mutation-------->
        //add keyword mutaion

        mutation {
            <mutation function name>(args:"<value>"){
                p1, 
                p2  
                    
            }

        }




//<----------------------------------------------------------------------CRUD---------------------------------------------------------------------->

    //<---------------------------------connecting to DB------------------------------------------->

        //<-----MongoDB-------->
        //install mongoose
            npm install mongoose --save
        //using MLabs
            in the website copy the connection string

        //in express app (index.js)
            const mongoose = require('mongoose')
            mongoose.connect(<connection string from Mlabs>)  //if using mongo locally use the mongodb generated url

        //create a new folder called models in the server folder this folder contains all mongodb schemas
            //create a new js file
            //this file contains the mongoose "schemas" of the data being retrived
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

    //<-----------------------------------------mutations------------------------------------------>

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



<------------------connecting to front end------------------->
    //create a new folder for client under the main project folder
    //create a new angular project in this folder

    <-------creating the graph client using apollo-------->
        //install the packages 
            npm install apollo-angular apollo-angular-link-http apollo-client apollo-cache-inmemory graphql-tag graphql --save

        //open app module.ts    
        //imports
            import {HttpClientModule} from '@angular/common/http';
            import {ApolloModule, Apollo} from 'apollo-angular';
            import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
            import { InMemoryCache } from 'apollo-cache-inmemory';

        //in the imports array:
            HttpClientModule, 
            ApolloModule,
            HttpLinkModule,
        
        //in the export class in app module.ts
            
            export class AppModule {

                constructor(apollo: Apollo,httpLink: HttpLink) {

                apollo.create({

                    link: httpLink.create({ uri: '<server end point when graphql is hit like /api /graphql> or apollo launchpad endpoint'}),  //apollo launchpad ->online server for graphql

                    cache: new InMemoryCache()

                    });

                }

            }

        //create a new class or type or interface file
        //if using type
            export type <type name>{
                <property1>:<datatype>,
                <property2>:<datatype>,
                <property3>:<datatype>,
            }

        //if using class
            export type <class name>{
                constructor(
                <property1>:<datatype>,
                <property2>:<datatype>,
                <property3>:<datatype>,
                ){}

            }

        //if using interface
        export interface <interface name>{
            <property1>:<datatype>,
            <property2>:<datatype>,
            <property3>:<datatype>,
        } 
            

    //create a new component
        import Apollo from 'apollo-angular';
        import Observable from 'rxjs/observable';
        import map from rxjs/operators;
        import gql from 'graphql-tag';
        import <types/class/interface name> form '<filepath>'

            //in constructor
            constructor(private apollo: Apollo) { }

    
