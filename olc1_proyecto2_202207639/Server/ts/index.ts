import {Request, Response} from "express";

const parser = require('../Grammar/Grammar.js')

function interpreter(content:string) {
    try{
        const result = parser.parse(content)
        result.Execute()
        console.log("Analisis exitoso")
        return result.getConsole()
    } catch (e) {
        if (e instanceof Error){
            return e.message;
        }
        return "Algo salio mal";
    }
}

const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000


app.get('/', (req:Request, res:Response) => {
    res.send('Hello World!')
})

app.use(cors())
app.use(express.json())
app.post('/interpreter', (req:Request, res:Response) => {
    const content = req.body.content
    const result = interpreter(content.toLowerCase())
    res.json({result: result})
})


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})