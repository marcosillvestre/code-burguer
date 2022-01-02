const { request } = require("express")
const express = require("express")
const req = require("express/lib/request")
const app = express()

const uuid = require("uuid")

app.use(express.json())

const port = 3001

const users = []

const checkUser= (request, response, next)=>{
    const {id} = request.params

    const index = users.findIndex (user => user.id === id)
    if (index < 0){
        return response.status(404).json({error: "user not found"})
    }
    request.userIndex = index
    request.userId = id
    next()
}


app.get("/users", (request, response) =>{
    return response.json(users)
})
app.get("/users", (request, response) =>{
    const id = request.userId
    const idRequest = {id, totalPrice, order, clientName, condition}
    users[id] = idRequest
    return response.json(idRequest)
})

app.post("/users", (request, response)=>{
    const {order, name, price} = request.body
    const user = {id:uuid.v4(), totalPrice : price, order, clientName : name, condition :"Em andamento..."} 

    users.push(user)
    return response.status(201).json(user)

})


app.put("/users/:id",checkUser, (request, response)=>{
    const {id} = request.params
    const {totalPrice,order,clientName,condition} = request.body

    const updatedRequest = { id, totalPrice, order, clientName,condition }
    const index = request.userIndex

    users[index] = updatedRequest

    return response.json(updatedRequest)

})

app.delete("/users/:id",checkUser, (request, response)=>{
    
    const index = request.userIndex

    users.splice(index,1)
    return response.status(204).json(users).json({message : "Request deleted"})
})

app.patch('/users/:id', (request, response)=>{

    const {id} = request.params
    const {condition,totalPrice, order, clientName} = request.body
    const user = {id, totalPrice, order, clientName, condition :"Pronto, o pedido saiu pra entrega"} 

    const updatedRequest = { id, totalPrice, order, clientName,condition }
    const index = request.userIndex

    users[index] = updatedRequest
    
    users.push(updatedRequest)
    

    
    return response.status(201).json(user)

})


     
app.listen(port, () =>{
    console.log(`✔✔server is running on port ${port}`)
})

   