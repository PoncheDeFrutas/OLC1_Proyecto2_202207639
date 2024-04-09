import { Expression } from "../Expression/Expression";
import { dataType } from "../Expression/Result";
import { Instruction } from "./Instruction";

export class Cout extends Instruction {
    private exp: Expression;
    private jump: string;

    constructor(exp: Expression, jump: string, line: number, column: number) {
        super(line, column);
        this.exp = exp;
        this.jump = jump;
    }

    public interpreter(tConsole:string[]): null {
        const res = this.exp.interpreter()

        if(res.type === dataType.BOOL) {
            res.value = res.value ? "true" : "false"
        }
        if (this.jump){
            tConsole.push(res.value+"\n")
        } else{
            tConsole.push(res.value+"")
        }
        return null
    }
}