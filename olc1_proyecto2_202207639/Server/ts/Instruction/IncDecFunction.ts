import { env } from "process";
import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import {dataType, Result} from "../Abstract/Result";
import {tError} from "../tConsole";
import {Error_} from "../Error";
import Counter from "../Symbol/Counter";

export class IncDecFunction extends Instruction {

    private id: string;
    private IncDec: boolean;

    constructor(id: string, IncDec: boolean, line: number, column: number) {
        super(line, column);
        this.id = id;
        this.IncDec = IncDec;
    }

    public interpreter(environment: Environment): null {
        const value = environment.getVariable(this.id);

        if (value == null) {
            throw tError.push(new Error_(tError.length, "Semantico",
                `La variable ${this.id} no existe`, this.line, this.column))
        }

        if (value.type == dataType.NUMBER || value.type == dataType.DOUBLE) {
            if (this.IncDec) {
                environment.editVariable(this.id, value.value + 1, value.type, <number>environment.getVariable(this.id)?.line, <number>environment.getVariable(this.id)?.column );
            } else {
                environment.editVariable(this.id, value.value - 1, value.type, <number>environment.getVariable(this.id)?.line, <number>environment.getVariable(this.id)?.column);
            }
        } else{
            throw tError.push(new Error_(tError.length, "Semantico",
                `La variable ${this.id} no es asignable a incremento o decremento`, this.line, this.column))
        }
        return null;
    }

    /*
    *  ID (++ | --) ;
    * */
    public getAst(last: string): string{
        let result = ""
        let counter = Counter.getInstance()
        let incDecNodeT = `n${counter.get()}`
        let idNode = `n${counter.get()}`
        let incDecNode = `n${counter.get()}`
        let semicolonNode = `n${counter.get()}`
        result += `${incDecNodeT}[label="I_IncDecFunction"];\n`
        result += `${idNode}[label="${this.id}"];\n`
        result += `${incDecNode}[label="${this.IncDec ? "++" : "--"}"];\n`
        result += `${semicolonNode}[label=";"];\n`
        result += `${last} -> ${incDecNodeT};\n`
        result += `${incDecNodeT} -> ${idNode};\n`
        result += `${incDecNodeT} -> ${incDecNode};\n`
        result += `${incDecNodeT} -> ${semicolonNode};\n`
        return result
    }
}