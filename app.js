const express = require('express');
const { v4: uuidv4 } = require('uuid');
var NotifyClient = require('notifications-node-client').NotifyClient

const port = process.env.PORT || 5001;
const apiKey = "testapi-18c4ce38-e89f-47c3-afdd-798121f558be-3cd3d5d2-e182-44fb-8eca-8645940c57f7"
const notifyClient = new NotifyClient('https://api.notification.canada.ca', apiKey)

const app = express();


const personalisation = {
    "var": "This is some content with a defined variable within the template."
}
const reference = uuidv4()


//API Middleware
app.use(express.json()); // this is to accept data in data format
app.use(express.urlencoded()); // this is basically to decode the data send through html form
app.use(express.static('public')); // this to serve our public folder as static folder


//API Routes
app.get('/form',(req,res) =>{
    res.sendFile(__dirname + '/public/index.html')
})

// app.get('/test/:status',(req,res) =>{
// res.send('hello' + req.params.status)
 
// })

app.post('/', (req,res)=>{

    notifyClient
  .sendSms(req.body.temp, req.body.phone, {
    personalisation: personalisation,
    reference: reference
  })
  .then(response => 
    console.log(response))
  .catch(err => console.error(err))

res.sendFile(__dirname + '/public/smsSent.html')

})

app.listen(port,() =>{
    console.log(`Server started at http://localhost:${port}`)
})