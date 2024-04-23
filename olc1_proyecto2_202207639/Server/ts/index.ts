import {Request, Response} from "express";

const parser = require('../Grammar/Grammar.js')

let AST: string;
let Errors:string;
let Simbols:string;

function interpreter(content:string) {
    try{
        const result = parser.parse(convertOutsideQuotesToLowercase(content))
        console.log(parser.parser.yy.errores)
        result.Execute()
        AST = result.getAst()
        Errors = result.getErrorHtml()
        Simbols = result.getSimbolsHtml()
        console.log("Analisis exitoso---------")
        return result.getConsole()
    } catch (e) {
        if (e instanceof Error){
            return e.message;
        }
        return "Algo salio mal";
    }
}

function getAST(){
    console.log(AST)
    return AST
}

function getErrorHtml(){
    console.log(Errors)
    return Errors
}

function getSimbolsHtml(){
    console.log(Simbols)
    return Simbols
}

function convertOutsideQuotesToLowercase(input:string) {
    let inQuotes = false;
    let quoteChar = null;
    let result = '';

    for (let i = 0; i < input.length; i++) {
        const char = input[i];

        if (char === '"' || char === "'") {
            if (inQuotes) {
                if (char === quoteChar) {
                    // Fin de la cita
                    inQuotes = false;
                    quoteChar = null;
                }
            } else {
                // Inicio de la cita
                inQuotes = true;
                quoteChar = char;
            }
        }

        result += inQuotes ? char : char.toLowerCase();
    }

    return result;
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
    const result = interpreter(content)
    res.json({result: result})
})

app.get('/ast', (req:Request, res:Response) => {
    const result = getAST()
    res.json({result: result})
})

app.get('/errors', (req:Request, res:Response) => {
    const result = getErrorHtml()
    res.json({result: result})
})

app.get('/simbols', (req:Request, res:Response) => {
    const result = getSimbolsHtml()
    res.json({result: result})
})
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})