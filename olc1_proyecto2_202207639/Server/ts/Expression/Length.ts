import {Environment} from "../Symbol/Environment";
import {Expression} from "../Abstract/Expression";
import {dataType, Result} from "../Abstract/Result";
import {tError} from "../tConsole";
import {Error_} from "../Error";
import Counter from "../Symbol/Counter";

export class Length extends Expression{

    private exp: Expression;

    constructor(exp:Expression, line:number, column:number) {
        super(line, column);
        this.exp = exp
    }

    public interpreter(environment: Environment): Result {
        const result = this.exp.interpreter(environment);
        if (result.type == dataType.ID){
            const vector = environment.getVectors(result.value)
            return {value:vector?.values.length, type:dataType.NUMBER }
        } else if(result.type == dataType.STRING){
            return {value: result.value.length, type:dataType.NUMBER }
        } else{
            throw tError.push(new Error_(tError.length, "Semantico",
                `Expresión no valida para comando length`, this.line, this.column ))
        }
    }

    /*
    * exp . length ( ) ;
    * */
    public getAst(last: string): string{
        let result = ""
        let counter = Counter.getInstance()
        let lengthNodeT = `n${counter.get()}`
        let expNode = `n${counter.get()}`
        let dotNode = `n${counter.get()}`
        let lengthNode = `n${counter.get()}`
        let lParenNode = `n${counter.get()}`
        let rParenNode = `n${counter.get()}`
        let semiColonNode = `n${counter.get()}`
        result += `${lengthNodeT}[label="Length"];\n`
        result += `${expNode}[label="Expresion"];\n`
        result += `${dotNode}[label="."];\n`
        result += `${lengthNode}[label="length"];\n`
        result += `${lParenNode}[label="("];\n`
        result += `${rParenNode}[label=")"];\n`
        result += `${semiColonNode}[label=";"];\n`
        result += `${last} -> ${lengthNodeT};\n`
        result += `${lengthNodeT} -> ${expNode};\n`
        result += this.exp.getAst(expNode)
        result += `${lengthNodeT} -> ${dotNode};\n`
        result += `${lengthNodeT} -> ${lengthNode};\n`
        result += `${lengthNodeT} -> ${lParenNode};\n`
        result += `${lengthNodeT} -> ${rParenNode};\n`
        result += `${lengthNodeT} -> ${semiColonNode};\n`
        return result
    }
}