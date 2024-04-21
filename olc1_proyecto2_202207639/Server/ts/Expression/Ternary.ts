import { env } from "process";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { dataType, Result } from "../Abstract/Result";
import {tError} from "../tConsole";
import {Error_} from "../Error";
import Counter from "../Symbol/Counter";

export class Ternary extends Expression {
    condition: Expression
    blockIf: Expression
    blockElse: Expression

    constructor(condition: Expression, blockIf: Expression, blockElse: Expression, line: number, column: number) {
        super(line, column);
        this.condition = condition
        this.blockIf = blockIf
        this.blockElse = blockElse
    }

    public interpreter(environment: Environment) : Result {
        const condition = this.condition.interpreter(environment)
        if (condition.type != dataType.BOOL) {
            throw tError.push(new Error_(tError.length, "Semantico",
                `Condición no booleana en operador ternario`, this.line, this.column ))
        }
        if (condition.value) {
            return this.blockIf.interpreter(environment)
        } else {
            return this.blockElse.interpreter(environment)
        }
    }

    /*
    * exp ? exp : exp
    * */
    public getAst(last: string): string{
        let result = ""
        let counter = Counter.getInstance()
        let ternaryNodeT = `n${counter.get()}`
        let exp1Node = `n${counter.get()}`
        let ternaryNode = `n${counter.get()}`
        let exp2Node = `n${counter.get()}`
        let colonNode = `n${counter.get()}`
        let exp3Node = `n${counter.get()}`
        result += `${ternaryNodeT}[label="Ternary"];\n`
        result += `${exp1Node}[label="Condicion"];\n`
        result += `${ternaryNode}[label="?"];\n`
        result += `${exp2Node}[label="Bloque If"];\n`
        result += `${colonNode}[label=":"];\n`
        result += `${exp3Node}[label="Bloque Else"];\n`
        result += `${last} -> ${ternaryNodeT};\n`
        result += `${ternaryNodeT} -> ${exp1Node};\n`
        result += this.condition.getAst(exp1Node)
        result += `${ternaryNodeT} -> ${ternaryNode};\n`
        result += `${ternaryNodeT} -> ${exp2Node};\n`
        result += this.blockIf.getAst(exp2Node)
        result += `${ternaryNodeT} -> ${colonNode};\n`
        result += `${ternaryNodeT} -> ${exp3Node};\n`
        result += this.blockElse.getAst(exp3Node)
        return result
    }
}