const express = require('express')

const bookData = require("./Routes/bookData")

const dbConnect = require("./config/database");


dbConnect()
const app = express()

app.use(express.json())

var cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/v1", bookData);


app.listen(2000,()=>{
    console.log("server started")
})

console.log("ji")


app.get("/", (req, res) => {
    res.send(`<h1>Backend is Running and this is '/' Route</h1>`);
  });