import {Environment} from "../Symbol/Environment";
import {Expression} from "../Abstract/Expression";
import {dataType, Result} from "../Abstract/Result";
import {tError} from "../tConsole";
import {Error_} from "../Error";
import Counter from "../Symbol/Counter";

export class Round extends Expression{
    private number: Expression;

    constructor(number: Expression, line: number, column: number) {
        super(line, column);
        this.number = number;
    }

    public interpreter(environment: Environment): Result {
        const result = this.number.interpreter(environment)
        if (result.type == dataType.DOUBLE || result.type == dataType.NUMBER) {
            return {value: Math.round(result.value), type: dataType.NUMBER}
        } else {
            throw tError.push(new Error_(tError.length, "Semantico",
                `Tipo ${result.type} no valio para la funcion redondeo`, this.line, this.column ))
        }
    }

    /*
    * round ( exp )
    * */
    public getAst(last: string): string{
        let result = ""
        let counter = Counter.getInstance()
        let roundNodeT = `n${counter.get()}`
        let roundNode = `n${counter.get()}`
        let lParenNode = `n${counter.get()}`
        let expNode = `n${counter.get()}`
        let rParenNode = `n${counter.get()}`
        result += `${roundNodeT}[label="Round"];\n`
        result += `${roundNode}[label="round"];\n`
        result += `${lParenNode}[label="("];\n`
        result += `${expNode}[label="Expresion"];\n`
        result += `${rParenNode}[label=")"];\n`
        result += `${last} -> ${roundNodeT};\n`
        result += `${roundNodeT} -> ${roundNode};\n`
        result += `${roundNodeT} -> ${lParenNode};\n`
        result += `${roundNodeT} -> ${expNode};\n`
        result += this.number.getAst(expNode)
        result += `${roundNodeT} -> ${rParenNode};\n`
        return result
    }
}