const express = require('express')
const app = express()
const cors = require('cors')
const user = require("./routes/users")
const PORT = 5000 

app.use(cors())  

app.use(express.json()) 

app.use("/user", user)
app.listen(PORT)
