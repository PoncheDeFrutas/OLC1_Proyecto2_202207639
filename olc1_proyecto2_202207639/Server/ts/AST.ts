import { env } from "process";
import { Expression } from "./Abstract/Expression";
import { Instruction } from "./Abstract/Instruction";
import { Environment } from "./Symbol/Environment";
import {tConsole, tError, tSimbols} from "./tConsole";
import {Declaration} from "./Instruction/Declaration";
import {DeclarationVector} from "./Instruction/DeclarationVector";
import {DeclarationVector2} from "./Instruction/DeclarationVector2";
import {Function} from "./Instruction/Function";
import {execute} from "./Instruction/execute";
import {Error_} from "./Error";
import Counter from "./Symbol/Counter";
import {tablaSimbolos} from "./tablaSimbolos";

export class AST {
    public instructions: Instruction[]
    public tConsole: string[]
    public tError: Error_[]
    public tSimbols: tablaSimbolos[]
    public global: Environment
    public AstDot: string

    constructor(instructions: Instruction[], errorS:Error_[]) {
        this.instructions = instructions
        this.tConsole = []
        this.tError = errorS
        this.tSimbols = []
        this.AstDot = ""
        this.global = new Environment(null)
    }

    public Execute(){
        this.AstDot = ""
        tSimbols.length = 0
        tConsole.length = 0
        tError.length = 0
        this.instructions.forEach(instruction => {
            if (instruction instanceof Function|| instruction instanceof Declaration ||
                instruction instanceof DeclarationVector || instruction instanceof DeclarationVector2){
                instruction.interpreter(this.global)
            }
        });
        for (let instruction of this.instructions) {
            if (instruction instanceof execute){
                instruction.interpreter(this.global);
                break;
            }
        }

        let counter = Counter.getInstance();
        let text = "digraph ast{\n"
        text += "nINIT[label=\"INIT\"]\n"
        text += "nInstructions[label=\"Instructions\"]\n"
        text += "nINIT -> nInstructions\n"
        this.instructions.forEach(instruction => {
            let node = `n${counter.get()}`
            text += `${node}[label="Instruction"]\n`
            text += `nInstructions -> ${node}\n`
            text += instruction.getAst(node)
        });
        text += "}"
        this.AstDot = text
        this.tConsole = tConsole
        this.tSimbols = tSimbols
        this.tError = this.tError.concat(tError)
    }

    public getConsole(){
        let exit = ""
        for (let index = 0; index < this.tConsole.length; index++) {
            exit += this.tConsole[index].toString();
        }

        for (let index = 0; index < this.tError.length; index++) {
            exit += this.tError[index].toString() + "\n"
        }
        this.tError = []
        return exit.replace("\\n", "\n").replace("\\t", "\t").replace("\\\"", "\"").replace("\\\'", "\'").replace("\\", "\\")
    }

    public getAst(){
        return this.AstDot
    }

    public getErrorHtml() {
        let text = "<table><tr><th>ID</th><th>Type</th><th>Message</th><th>Line</th><th>Column</th></tr>";
        for (let index = 0; index < this.tError.length; index++) {
            let error = this.tError[index];
            text += `<tr><td>${error.id}</td><td>${error.type}</td><td>${error.message}</td><td>${error.line}</td><td>${error.column}</td></tr>`;
        }
        text += "</table>";
        this.tError = []
        return text;
    }

    public getSimbolsHtml(){
        let text = "<table><tr><th>Num</th><th>Id</th><th>Type</th><th>Type2</th><th>Line</th><th>Column</th></tr>";
        for (let index = 0; index < this.tSimbols.length; index++) {
            let simbol = this.tSimbols[index];
            text += `<tr><td>${simbol.num}</td><td>${simbol.id}</td><td>${simbol.tipo}</td><td>${simbol.ticpo2}</td><td>${simbol.linea}</td><td>${simbol.columna}</td></tr>`;
        }
        this.tSimbols = []
        return text + "</table>";
    }
}