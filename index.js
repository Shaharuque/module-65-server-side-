const express = require('express')
const app = express()
const cors=require('cors')
const port = process.env.PORT || 5000;

//use middlewares
app.use(cors())
//body parser ar kaj korbey(this is short cut)
app.use(express.json())


app.get('/', (req, res) => {
    res.send('running my node crud server')  //root url('http://localhost:5000/') hit korley res hisabey kicho dibey 
  })
  

app.listen(port, () => {
    console.log(`running my node crud server listening on port ${port}`)
  })