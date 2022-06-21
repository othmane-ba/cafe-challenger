const express=require('express')
const next=require('next')
const dev=process.env.Node_ENV !== 'production'
const app=next({dev})
const handle=app.getRequestHandler()
app.prepare().then(()=>{
    const server=express()
    server.get('*',(req,res)=>{
        return handle(req,res)
    })
    server.listen(3030,(err)=>{
        if(err) throw errconsole.log('server ready!*')
    })
}).catch((ex)=>{
    console.log(ex.stack)
    process.exit(1)
})