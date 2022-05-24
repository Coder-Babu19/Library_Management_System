
const {MongoClient} = require('mongodb');
const express = require("express");
const app = express();
const cors = require("cors");
const e = require('express');

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())


const uri = "mongodb+srv://sammam:1234@cluster0.hmph7av.mongodb.net/?retryWrites=true&w=majority"
global.client = new MongoClient(uri);

var user_data = null
var infoBook


app.post("/start", async (req, res) => {
	let { message } = req.body
    try{
        await client.connect()
        console.log("MongoDB Server Connected Successfully!!")
    }
    catch(e){
        console.log(e)
    }
	console.log(message)
    // user_data = null

    res.send("All Connections Established!!")
})



app.post("/login", async (req, res) => {
	let {form} = req.body
    let {email,password} = form

    var usr_object;
    
    try{
    usr_object = await client.db("Library").collection("Customers2").findOne({ $and: [ {Email : email}, {Password : password} ]})
    user_data = usr_object
    }
    catch(e){
        console.log(e)
    }

    if (usr_object != null){
        console.log("User logged in")
        res.send("User Found")
    }
    else{
        res.send("User Not Found")
    }
    
})

app.get("/logout", async (req, res) => {

        user_data = null
        res.send("done")
})


app.post("/signup", async (req, res) => {

    const credentials = req.body

    credentials.Status = 'user'

    var responce
    
    try{
    responce = await client.db("Library").collection("Customers2").findOne({Email : credentials['Email']})
    }
    catch(e){
        console.log(e)
    }

    if (responce === null){

        try{
            await client.db("Library").collection("Customers2").insertOne(credentials)
            }
        catch(e){
            console.log(e)
        }
        console.log("User Signed Up")
        res.send("Successful")
    }
    else{
        res.send("UnSuccessful")
    }
    
})



app.get("/category", async (req, res) => {

    var all_books

    try{
         all_books = await client.db("Library").collection("Books").find({}).limit(120).toArray();
        }
    catch(e){
        console.log(e)
    }

    var x = Math.floor(Math.random() * (100 - 20) + 20)
    let books = []

    for (let i = x; i < 9+x; i++) {
        books.push(all_books[i])
      }

	res.send(books)
})



app.post("/bookSearch", async (req, res) => {
	let {book} = req.body

    var bookObj

    try{
        bookObj = await client.db("Library").collection("Books").findOne( { 'Book-Title': { $regex: new RegExp(`^${book}$`), $options: 'i' } });
        }
    catch(e){
        console.log(e)
    }

    if (bookObj != null){
        infoBook = bookObj
        res.send(bookObj)
    }
    else{
        res.send("Not Found")
    }
})

app.get("/sysControl", async (req, res) => {

    if (user_data != null){
        res.send(user_data['Status'])
    }
    else{
        res.send("none")
    }
})


app.get("/getBook", async (req, res) => {

    if (infoBook!= null){
        res.send(infoBook)
    }
    else{
        res.send("none")
    }
})


app.post("/borrow", async (req, res) => {

	var message  = req.body

    if (infoBook === null){
        res.send("Book Not Found!")
    }


    let date_ob = new Date()

    let day = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();

    var date = year + "-" + month + "-" + day

    var flag = 0

    try{
        reply = await client.db("Library").collection("Borrowed_Books").insertOne({ ISBN: infoBook['ISBN'], Email : user_data['Email'],Issue_Date : new Date(date), Fine : "$5"} )
    }
    catch(e){
        flag = 1
    }
	if(flag === 1){
    res.send("already booked!")
    }
    else {
        res.send("booked!")
        }
})




app.post("/changeStatus", async (req, res) => {
	let {email,status} = req.body

    var reply
    var flag = 0

    try{

    reply = await client.db("Library").collection("Customers2").updateOne( { Email: email },{$set: {Status: status} })
    console.log(reply)
    }
    catch(e){
        console.log(e)
        flag = 1
    }

    if (reply['matchedCount'] === 0){
        res.send("User Not Found!")
    }
    else{
        res.send("Updated")
    }
})



app.get("/getAges", async (req, res) => {
    
   var ages_25,ages_50,ages_75,ages_100
   var reply
   var agesObj

   try{                                                                
    reply = await client.db("Library").collection("Customers2").find( {age : { $gt : 1,$lt : 25} }).project({age:1,_id:0}).toArray()
    ages_25 = reply.length
    reply = await client.db("Library").collection("Customers2").find( {age : { $gt : 25,$lt : 50} }).project({age:1,_id:0}).toArray()
    ages_50 = reply.length
    reply = await client.db("Library").collection("Customers2").find( {age : { $gt : 50,$lt : 75} }).project({age:1,_id:0}).toArray()
    ages_75 = reply.length
    reply = await client.db("Library").collection("Customers2").find( {age : { $gt : 75,$lt : 120} }).project({age:1,_id:0}).toArray()
    ages_100 = reply.length

    agesObj = { Ages_25 : ages_25, Ages_50 : ages_50, Ages_75 : ages_75, Ages_100 : ages_100}

    }
    catch(e){
        console.log(e)
        flag = 1
    }
    res.send(agesObj)
})




app.post("/addBook", async (req, res) => {

    const {ISBN,Title , Author , Publisher , Language,Year_Published , Image } = req.body


    var responce
    
    try{
    responce = await client.db("Library").collection("Books").findOne({'ISBN' : ISBN})
    }
    catch(e){
        console.log(e)
    }

    if (responce === null){

        try{
            await client.db("Library").collection("Books").insertOne({ 'ISBN' : ISBN, 'Book-Title' : Title,'Book-Author' : Author,'Year-Of-Publication' : Year_Published, 'Publisher' : Publisher,'Image-URL-S' : 'NULL','Image-URL-M' : 'NULL','Image-URL-L' : Image,'Lamguage' : Language})
            }
        catch(e){
            console.log(e)
        }
        res.send("Successful")
    }
    else{
        res.send("UnSuccessful")
    }
    
})



app.get("/getDueData", async (req, res) => {
    
    await client.connect()
    var objects
    
    try{                                                                
        objects = await client.db("Library").collection("Borrowed_Books").find({Issue_Date : { "$lt" : new Date(new Date().getTime() - 1000 * 86400 * 2) }}).project({Email : 1, Issue_Date : 1,Fine : 1,_id:0}).toArray()
     }
     catch(e){
         console.log(e)
     }
     if (objects != null){
     var t = 5 - objects.length

     if ( t != 0){
         for ( var i=0; i<t; i++){
             var f = {
                "Email": "",
                "Issue_Date": "",
                "Fine": ""
              }
              objects.push(f)
         }
     }
    }

     res.send(objects)
 })