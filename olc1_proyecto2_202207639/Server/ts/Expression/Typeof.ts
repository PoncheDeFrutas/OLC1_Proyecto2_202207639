import {Environment} from "../Symbol/Environment";
import {Expression} from "../Abstract/Expression";
import {dataType, Result} from "../Abstract/Result";
import {tError} from "../tConsole";
import {Error_} from "../Error";
import Counter from "../Symbol/Counter";

export class Typeof extends Expression{

    private exp:Expression;

    constructor(exp:Expression, line:number, column:number) {
        super(line, column);
        this.exp = exp
    }

    public interpreter(environment: Environment): Result {
        const result = this.exp.interpreter(environment);
        let temporalType:dataType = dataType.NULL;
        if (result.type == dataType.ID){
            temporalType = <dataType>environment.getVectors(result.value)?.type
        } else{
            temporalType = result.type
        }

        switch (temporalType) {
            case dataType.NUMBER:
                return {value: "int", type:temporalType}
            case dataType.DOUBLE:
                return {value: "double", type:temporalType}
            case dataType.BOOL:
                return {value: "bool", type:temporalType}
            case dataType.CHAR:
                return {value: "char", type:temporalType}
            case dataType.STRING:
                return {value: "string", type:temporalType}
            default:
                throw tError.push(new Error_(tError.length, "Semantico",
                    `Tipo ${temporalType} no valido para operación typeof`, this.line, this.column ))
        }
    }

    /*
    * typeof ( exp )
    * */
    public getAst(last: string): string{
        let result = ""
        let counter = Counter.getInstance()
        let typeofNodeT = `n${counter.get()}`
        let typeofNode = `n${counter.get()}`
        let lParenNode = `n${counter.get()}`
        let expNode = `n${counter.get()}`
        let rParenNode = `n${counter.get()}`
        result += `${typeofNodeT}[label="Typeof"];\n`
        result += `${typeofNode}[label="typeof"];\n`
        result += `${lParenNode}[label="("];\n`
        result += `${expNode}[label="Expresion"];\n`
        result += `${rParenNode}[label=")"];\n`
        result += `${last} -> ${typeofNodeT};\n`
        result += `${typeofNodeT} -> ${typeofNode};\n`
        result += `${typeofNodeT} -> ${lParenNode};\n`
        result += `${typeofNodeT} -> ${expNode};\n`
        result += this.exp.getAst(expNode)
        result += `${typeofNodeT} -> ${rParenNode};\n`
        return result
    }
}