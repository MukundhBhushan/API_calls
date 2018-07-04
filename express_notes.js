Skip to content

// installing as as dev dependency
npm install express --save
npm install body-parser --save //used for reading form forms
npm install ejs --save //templating engine
npm install express-validator //for validating the express routes
npm install mongojs --save //to connect ot mongodb

// if manually adding the library
//in the package.json file
"dependencies":{
    "express":"*", //* for the laest version
    "body-parser":"*"
}

//starting of the app
const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const path = require('path')
const expressValidator =require('express-validator')
const mongojs = require('mongojs')
const db=mongojs(<db name>,[collection name])

//<do not forget to add the app listener line 135

//<---- all the functions are dependent on what the html is doning not what js is doing------->
//eg: if a form has a post req the function in express is app.post

//get --> get request
app.get('/<redirect page>',(req,res)=>{
    res.send('<text>')		//send info as a response

})

//to send json objects or array of json objects
var <json obj name>={
    <feature1>:value1,
    <feature1>:value2,
    <feature1>:value3
}
//for array of json object is the same bellow method

app.get('/<redirect site>',(req,res)=>{
    res.json(<json obj name>);      //json is used not send
    
})

//post ----> for post request
//a html form 
<form method="POST" action="/<form redirection url>">
    <input type="text" name="name1">
</form>



app.post('/<form redirection url>',(req,res)=>{
    //create a var or an object then--->
    req.body.name1 //store this value
    
})


//middle ware 
var <middleware name> = function(res,req,next){
    //do something
    next(); //to continue 
}

        /*to use the middleware use*/ use //method
        //calling the middleware
            app.use(<middlename>)

//body parser is used as a middleware
       //the require variable name is used when passing the arg to the middleware
  
        app.use(bodyParser.json());
        app.use(bodyParser.urlencodered({extended:False}))
  //<-----------files can also be add to use ------------------> 
        app.use('/<route link>',<template/file name>)
 //in the file express must be required and routes must be defined 

//set static path for files like css jquery images file which dont change
app.use(express.static(path.join(__dirname,'<folder name to be static>')))

//View engine
app.set('view engine', 'ejs') //setting the view engine
app.set('view',path.join(__dirname,'views')) //the location of ejs templates folder

//to use the templates
app.get('/<redirect url>',(req,res)=>{
    res.render('<template name>');

})

//express-validator middle ware help catching errors in the form inputs based on rules
app.use(expressValidator())


//create the error as a global variable in a seperate middleware
app.use((res,req,next)=>{
    res.locals.errors=null
    next();
})

app.post('/<form redirect url>',(req,res)=>{
    res.checkBody('<form field name to check on>','<alert message>').<needed function>(like notEmpty)
        //checkBody is an express-vadation function
    var errors=req.validationErrors();
                   //validationErrors is an express-validation function
    if(errors){                                                         //in template
        '<template name(re-redner the form template)>',{                <% if(errors != undefined){ %>
        <var name1>:<value1>,                                               <% errors.forEach(function(error){ %>
        <var name2>:<value2>                                                    <li>error.msg</li>
    errors:error                                                            <% }) %>
    })
    }
    else{
        app.render('<template name>',{
        <var name1>:<value1>,
        <var name2>:<value2>
    })
    }
    
})


//<-----passing a value to ejs template---->
//<------=====if the passed values has to render in the same template declare empty values for all the vars being passed======------>
//eg:- if name and age are being passed and index.ejs is being renderd the form action =add
//add the code for the form in the template
    app.get('/',(req,res){
            app.render('index',{
                    name:''
                    age:''
                })
            })
   app.post('/add',(req,res)=>{
    app.render('index',{
        name:'name1',
        age:18,
    })
   
   })
//values sent to the template in the form of object
app.get('/<>',(req,res)=>{                    //in the template
    app.render('<template name>',{              <tag><%=<var name>%></tag>
        <var name1>:<value1>,
        <var name2>:<value2>
    })
})

<--------passing data to ejs template nut data in mongoDB----------->
app.get('/<>',(req,res)=>{ 
    db.users.find((err,docs)=>{
            app.render('<template name>',{         //in the template
                   <var name1>:<value1>,           <tag><%=<var name>%></tag>
                   <var name2>:docs
        
    })                                            

    })
})

//from a var to url
app.post('/<router link>/:<var name>')
//if a url has to contain a var in the url
res.render('/<rout link>${var name}')


//to listen on a port
app.listen(<port number>,function(){
    //do somthing
})

// or just 
app.listen(<port number>)


//<------------------------------------mongoDB with express------------------------------->

// in cmd navigate to mongodb folder
// then to the bin floder in the mongodb folder
//to start mongodb type
    mongo
//create a new db
    use <new db name>
//create collection
    db.createCollections('<collection name>')
// insert into the collection
    db.<collection name>.insert([{<feature1>:value1},{<feature2>:value2}]) //if array
    db.<collection name>.insert({<feature1>:value1}) //if one

//<----------useing mongojs to connect webapp to mongodb------------------> //use mongoose if cross-platform ie for angular, vue etc

//install mongojs
    npm install mongojs --save
//require it
    const mongojs = require('mongojs')
//connecting it with the db
const db=mongojs('<db name>',[<collection name>])

//for listing out all the records
    db.users.find((err,docs)=>{
        //do somthing with docs
    })
//inserting
db.users.insert(<json obj name or type the input the form of a json obj>,(err,res){
    if(err){
        console.log(err)
    }
    else{
        res.redirect('/<redirect url>')
    }
})

//deleting
// better use ajax or jquery
//create a <a href="#" class="<class name>"> tag for each of the element
//using jquery
    //create a s file
    //add the jquery cnd
$(document).ready(function(){
    $('.<class name>').click(function({
        
    }))

})
 @MukundhBhushan
     
 

Leave a comment
Attach files by dragging & dropping, , or pasting from the clipboard.  Styling with Markdown is supported
© 2018 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
API
Training
Shop
Blog
About
Press h to open a hovercard with more details.
