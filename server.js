const express=require("express")

const app=express()

app.use(express.static('Public'))

const port=process.env.port || 3000 

const server=app.listen(port,()=>
{
    console.log(`server is listening at https://localhost:${port}`)
})

let io=require('socket.io')(server)

io.on("connection",(socket)=>
{
    console.log(`New Connection added ${socket.id}`)

    socket.on('comment',(data)=>
    {
        socket.broadcast.emit('comment',data);
    })

    socket.on('typing',(data)=>
    {
        console.log(data + "is typing")
        socket.broadcast.emit('typing',data)
    })
})


