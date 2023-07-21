import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'

const packageDef = protoLoader.loadSync("todo.proto", {})
const grpcObject = grpc.loadPackageDefinition(packageDef)
const todoPackage = grpcObject.todoPackage

const client = new todoPackage.Todo("localhost:40000", grpc.credentials.createInsecure())
const text = process.argv[2]

client.createTodo({
    "id": -1,
    "text": text
}, (err, response) => {
    console.log("Received from server" + JSON.stringify(response))
})

client.readTodos(null, (err,response)=> {
    console.log("Received text from server "+ JSON.stringify(response))
})

const call = client.readTodosStream()
call.on("data", item => {
    console.log("Received from server "+ JSON.stringify(item))
})

call.on("end", e=> console.log("Server done"))