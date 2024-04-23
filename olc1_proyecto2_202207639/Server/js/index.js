"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser = require('../Grammar/Grammar.js');
let AST;
let Errors;
let Simbols;
function interpreter(content) {
    try {
        const result = parser.parse(content);
        console.log(parser.parser.yy.errores);
        result.Execute();
        AST = result.getAst();
        Errors = result.getErrorHtml();
        Simbols = result.getSimbolsHtml();
        console.log("Analisis exitoso---------");
        return result.getConsole();
    }
    catch (e) {
        if (e instanceof Error) {
            return e.message;
        }
        return "Algo salio mal";
    }
}
function getAST() {
    console.log(AST);
    return AST;
}
function getErrorHtml() {
    console.log(Errors);
    return Errors;
}
function getSimbolsHtml() {
    console.log(Simbols);
    return Simbols;
}
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(cors());
app.use(express.json());
app.post('/interpreter', (req, res) => {
    const content = req.body.content;
    const result = interpreter(content);
    res.json({ result: result });
});
app.get('/ast', (req, res) => {
    const result = getAST();
    res.json({ result: result });
});
app.get('/errors', (req, res) => {
    const result = getErrorHtml();
    res.json({ result: result });
});
app.get('/simbols', (req, res) => {
    const result = getSimbolsHtml();
    res.json({ result: result });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
