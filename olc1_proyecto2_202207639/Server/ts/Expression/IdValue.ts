import {Expression} from "../Abstract/Expression";
import {Environment} from "../Symbol/Environment";
import {dataType, Result} from "../Abstract/Result";
import {tError} from "../tConsole";
import {Error_} from "../Error";
import Counter from "../Symbol/Counter";

export class IdValue extends Expression{

    constructor(private id: string, line: number, column: number) {
        super(line, column);
    }

    public interpreter(environment: Environment): Result {
        const value = environment.getVariable(this.id);
        if (value != null) {
            return {value: value.value, type: value.type};
        }
        const vector = environment.getVectors(this.id);
        if (vector != null) {
            return {value: vector.id, type: dataType.ID};
        }
        throw tError.push(new Error_(tError.length, "Semantico",
            `(variable/vector) no encontrado: ${this.id}`, this.line, this.column ))
    }


    /*
    * ID
    * */
    public getAst(last: string): string{
        let result = ""
        let counter = Counter.getInstance()
        let idNodeT = `n${counter.get()}`
        let idNode = `n${counter.get()}`
        result += `${idNodeT}[label="IdValue"];\n`
        result += `${idNode}[label="${this.id}"];\n`
        result += `${last} -> ${idNodeT};\n`
        result += `${idNodeT} -> ${idNode};\n`
        return result
    }
}