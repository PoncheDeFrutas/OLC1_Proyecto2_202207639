import { env } from "process";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { dataType, Result } from "../Abstract/Result";
import {tError} from "../tConsole";
import {Error_} from "../Error";
import Counter from "../Symbol/Counter";

export class toLowUp extends Expression{
    private text: Expression;
    private LowUp: boolean;

    constructor(text: Expression, LowUp: boolean, line: number, column: number) {
        super(line, column);
        this.text = text;
        this.LowUp = LowUp;
    }

    public interpreter(environment: Environment): Result {
        const result = this.text.interpreter(environment)
        if (result.type != dataType.STRING) {
            throw tError.push(new Error_(tError.length, "Semantico",
                `Tipo ${result.type}, no valido para operación toLowUp`, this.line, this.column ))
        }

        if (this.LowUp){
            return {value: result.value.toLowerCase(), type: dataType.STRING}
        } else{
            return {value: result.value.toUpperCase(), type: dataType.STRING}
        }
    }

    /*
    * toLowUp ( exp )
    * */
    public getAst(last: string): string{
        let result = ""
        let counter = Counter.getInstance()
        let LowUpNodeT = `n${counter.get()}`
        let LowUpNode = `n${counter.get()}`
        let lParenNode = `n${counter.get()}`
        let expNode = `n${counter.get()}`
        let rParenNode = `n${counter.get()}`
        if (this.LowUp){
            result += `${LowUpNodeT}[label="toLow"];\n`
            result += `${LowUpNode}[label="toLow"];\n`
        }
        else{
            result += `${LowUpNodeT}[label="toUp"];\n`
            result += `${LowUpNode}[label="toUp"];\n`
        }
        result += `${lParenNode}[label="("];\n`
        result += `${expNode}[label="Expresion"];\n`
        result += `${rParenNode}[label=")"];\n`
        result += `${last} -> ${LowUpNodeT};\n`
        result += `${LowUpNodeT} -> ${LowUpNode};\n`
        result += `${LowUpNodeT} -> ${lParenNode};\n`
        result += `${LowUpNodeT} -> ${expNode};\n`
        result += this.text.getAst(expNode)
        result += `${LowUpNodeT} -> ${rParenNode};\n`
        return result
    }
}