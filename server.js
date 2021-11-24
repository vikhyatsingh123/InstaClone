const express = require('express')
const app = express()
var cors = require("cors");
require("dotenv").config();
const mongoose = require('mongoose')


// app.use(express.json())
// app.use(require('./routes/auth'))
app.use(cors());

mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,  // for warnings while running
    useUnifiedTopology: true
})
mongoose.connection.on('connected', ()=>{
    console.log("connected successfully")
})
mongoose.connection.on('error', (err)=>{
    console.log("err connecting",err)
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(process.env.PORT || 5000, ()=>{
    console.log("server is running")
})

