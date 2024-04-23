import { Expression } from "../Abstract/Expression";
import { dataType } from "../Abstract/Result";
import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import {tConsole, tError} from "../tConsole";
import {Error_} from "../Error";
import Counter from "../Symbol/Counter";

export class Cout extends Instruction {
    private exp: Expression;
    private jump: string;

    constructor(exp: Expression, jump: string, line: number, column: number) {
        super(line, column);
        this.exp = exp;
        this.jump = jump;
    }

    public interpreter(environment: Environment): null {
        const res = this.exp.interpreter(environment)

        if (res == undefined){
            throw tError.push(new Error_(tError.length, "Semantico",
                `Expression no valida en sentencias cout`, this.line, this.column ))
        }
        if (this.jump){
            tConsole.push(res.value+"\n")
        } else{
            tConsole.push(res.value+"")
        }
        return null
    }

    /*
    * cout << exp << endl ;
    */
    public getAst(last: string): string{
        let result = ""
        let counter = Counter.getInstance()
        let coutNodeT = `n${counter.get()}`
        let coutNode = `n${counter.get()}`
        let minusNode = `n${counter.get()}`
        let expNode = `n${counter.get()}`
        result += `${coutNodeT}[label="I_cout"];\n`
        result += `${coutNode}[label="cout"];\n`
        result += `${minusNode}[label="<<"];\n`
        result += `${expNode}[label="exp"];\n`
        result += `${last} -> ${coutNodeT};\n`
        result += `${coutNodeT} -> ${coutNode};\n`
        result += `${coutNodeT} -> ${minusNode};\n`
        result += `${coutNodeT} -> ${expNode};\n`
        result += this.exp.getAst(expNode)
        if (this.jump){
            let sMinusNode = `n${counter.get()}`
            let sEndlNode = `n${counter.get()}`
            result += `${sMinusNode}[label="<<"];\n`
            result += `${sEndlNode}[label="endl"];\n`
            result += `${coutNodeT} -> ${sMinusNode};\n`
            result += `${coutNodeT} -> ${sEndlNode};\n`
        }
        let semicolonNode = `n${counter.get()}`
        result += `${semicolonNode}[label=";"];\n`
        result += `${coutNodeT} -> ${semicolonNode};\n`
        return result
    }
}