import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'

const packageDef = protoLoader.loadSync("todo.proto", {})
const grpcObject = grpc.loadPackageDefinition(packageDef)
const todoPackage = grpcObject.todoPackage

const server = new grpc.Server()
server.bindAsync("0.0.0.0:40000", grpc.ServerCredentials.createInsecure(),function() {
    server.start()
    console.log('Grpc server started')
   })
server.addService(todoPackage.Todo.service,{
    "createTodo": createTodo,
    "readTodos": readTodo
})

const ToDos = []
function createTodo (call,callback) {
    const toDoItem = {
        "id": ToDos.length + 1,
        "text": call.request.text
    }
    ToDos.push(toDoItem)
    callback(null, toDoItem)
}

function readTodo (call,callback) {
    console.log(call)
}

