//Server instantiate
const express = require('express');
const app = express();

//used to parse req.body in express -> PUT or POST
const bodyParser = require('body-parser');

//specificallly pass json data and add it to the request.body object
app.use(bodyParser.json());

//activate the server on 3000 port
app.listen(3000, () => {
    console.log("Server started at port number 3000")
});

//Routes
app.get('/', (request,response)=>{
    response    .send("hello ji");
})

app.post('/api/cars', (request,response)=>{
    const {name, brand} =request.body;
    console.log(name);
    console.log(brand);
    response.send("Car submitted successfully")
})