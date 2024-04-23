"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST = void 0;
const Environment_1 = require("./Symbol/Environment");
const tConsole_1 = require("./tConsole");
const Declaration_1 = require("./Instruction/Declaration");
const DeclarationVector_1 = require("./Instruction/DeclarationVector");
const DeclarationVector2_1 = require("./Instruction/DeclarationVector2");
const Function_1 = require("./Instruction/Function");
const execute_1 = require("./Instruction/execute");
const Counter_1 = __importDefault(require("./Symbol/Counter"));
class AST {
    constructor(instructions, errorS) {
        this.instructions = instructions;
        this.tConsole = [];
        this.tError = errorS;
        this.tSimbols = [];
        this.AstDot = "";
        this.global = new Environment_1.Environment(null);
    }
    Execute() {
        this.AstDot = "";
        tConsole_1.tSimbols.length = 0;
        tConsole_1.tConsole.length = 0;
        tConsole_1.tError.length = 0;
        this.instructions.forEach(instruction => {
            if (instruction instanceof Function_1.Function || instruction instanceof Declaration_1.Declaration ||
                instruction instanceof DeclarationVector_1.DeclarationVector || instruction instanceof DeclarationVector2_1.DeclarationVector2) {
                instruction.interpreter(this.global);
            }
        });
        for (let instruction of this.instructions) {
            if (instruction instanceof execute_1.execute) {
                instruction.interpreter(this.global);
                break;
            }
        }
        let counter = Counter_1.default.getInstance();
        let text = "digraph ast{\n";
        text += "nINIT[label=\"INIT\"]\n";
        text += "nInstructions[label=\"Instructions\"]\n";
        text += "nINIT -> nInstructions\n";
        this.instructions.forEach(instruction => {
            let node = `n${counter.get()}`;
            text += `${node}[label="Instruction"]\n`;
            text += `nInstructions -> ${node}\n`;
            text += instruction.getAst(node);
        });
        text += "}";
        this.AstDot = text;
        this.tConsole = tConsole_1.tConsole;
        this.tSimbols = tConsole_1.tSimbols;
        this.tError = this.tError.concat(tConsole_1.tError);
    }
    getConsole() {
        let exit = "";
        for (let index = 0; index < this.tConsole.length; index++) {
            exit += this.tConsole[index].toString();
        }
        for (let index = 0; index < this.tError.length; index++) {
            exit += this.tError[index].toString() + "\n";
        }
        for (let index = 0; index < tConsole_1.tError.length; index++) {
            exit += tConsole_1.tError[index].toString() + "\n";
        }
        this.tError = [];
        return exit.replace("\\n", "\n").replace("\\t", "\t").replace("\\\"", "\"").replace("\\\'", "\'").replace("\\", "\\");
    }
    getAst() {
        return this.AstDot;
    }
    getErrorHtml() {
        let text = `<table border="1" cellspacing="0" cellpadding="5" style="border-collapse: collapse; width: 100%;">`;
        text += `<caption>Tabla de Errores</caption>`;
        text += `<tr style="background-color: #f2f2f2;"><th>ID</th><th>Type</th><th>Message</th><th>Line</th><th>Column</th></tr>`;
        for (let index = 0; index < this.tError.length; index++) {
            let error = this.tError[index];
            let rowColor = index % 2 === 0 ? '#f2f2f2' : '#ffffff';
            text += `<tr style="background-color: ${rowColor};"><td>${error.id}</td><td>${error.type}</td><td>${error.message}</td><td>${error.line}</td><td>${error.column}</td></tr>`;
        }
        text += "</table>";
        this.tError = [];
        return text;
    }
    getSimbolsHtml() {
        let text = `<table border="1" cellspacing="0" cellpadding="5" style="border-collapse: collapse; width: 100%;">`;
        text += `<caption>Tabla de Simbolos</caption>`;
        text += `<tr style="background-color: #f2f2f2;"><th>Num</th><th>Id</th><th>Type</th><th>Type2</th><th>Line</th><th>Column</th></tr>`;
        for (let index = 0; index < this.tSimbols.length; index++) {
            let simbol = this.tSimbols[index];
            let rowColor = index % 2 === 0 ? '#f2f2f2' : '#ffffff';
            text += `<tr style="background-color: ${rowColor};"><td>${simbol.num}</td><td>${simbol.id}</td><td>${simbol.tipo}</td><td>${simbol.ticpo2}</td><td>${simbol.linea}</td><td>${simbol.columna}</td></tr>`;
        }
        this.tSimbols = [];
        return text + "</table>";
    }
}
exports.AST = AST;
