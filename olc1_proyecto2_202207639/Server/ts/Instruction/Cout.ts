import { Expression } from "../Abstract/Expression";
import { dataType } from "../Abstract/Result";
import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import {tConsole, tError} from "../tConsole";
import {Error_} from "../Error";

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
}