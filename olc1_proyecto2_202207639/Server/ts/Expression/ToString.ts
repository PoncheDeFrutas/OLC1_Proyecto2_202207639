import {Environment} from "../Symbol/Environment";
import {Expression} from "../Abstract/Expression";
import {dataType, Result} from "../Abstract/Result";
import {tError} from "../tConsole";
import {Error_} from "../Error";
import Counter from "../Symbol/Counter";

export class ToString extends Expression{
    private text: Expression;

    constructor(text: Expression, line: number, column: number) {
        super(line, column);
        this.text = text;
    }

    public interpreter(environment: Environment): Result {
        const result = this.text.interpreter(environment)
        if (result.type != dataType.NUMBER && result.type != dataType.DOUBLE && dataType.BOOL){
            throw tError.push(new Error_(tError.length, "Semantico",
                `Tipo ${result.type} no valido para operación ToString`, this.line, this.column ))
        }
        return {value: result.value.toString(), type: dataType.STRING}
    }

    /*
    * std : : to_string ( exp )
    * */
    public getAst(last: string): string{
        let result = ""
        let counter = Counter.getInstance()
        let toStringNodeT = `n${counter.get()}`
        let toStringNode = `n${counter.get()}`
        let lParenNode = `n${counter.get()}`
        let expNode = `n${counter.get()}`
        let rParenNode = `n${counter.get()}`
        result += `${toStringNodeT}[label="ToString"];\n`
        result += `${toStringNode}[label="to_string"];\n`
        result += `${lParenNode}[label="("];\n`
        result += `${expNode}[label="Expresion"];\n`
        result += `${rParenNode}[label=")"];\n`
        result += `${last} -> ${toStringNodeT};\n`
        result += `${toStringNodeT} -> ${toStringNode};\n`
        result += `${toStringNodeT} -> ${lParenNode};\n`
        result += `${toStringNodeT} -> ${expNode};\n`
        result += this.text.getAst(expNode)
        result += `${toStringNodeT} -> ${rParenNode};\n`
        return result
    }
}