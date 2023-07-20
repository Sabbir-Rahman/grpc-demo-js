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

function createTodo (call,callback) {
    console.log(call)
}

function readTodo (call,callback) {
    console.log(call)
}

