import {Environment} from "../Symbol/Environment";
import {Expression} from "../Abstract/Expression";
import {ArithmeticOp, dataType, Result} from "../Abstract/Result";
import {Primitive} from "./Primitive";
import {tError} from "../tConsole";
import {Error_} from "../Error";
import Counter from "../Symbol/Counter";

export class C_str extends Expression{

    private exp: Expression;

    constructor(exp:Expression, line:number, column:number) {
        super(line, column);
        this.exp = exp
    }

    public interpreter(environment: Environment): Result {
        const result = this.exp.interpreter(environment);
        if (result.type != dataType.STRING){
            throw tError.push(new Error_(tError.length, "Semantico",
                `Tipo ${result.type} Invalido en Operación C_str`, this.line, this.column ))
        }
        const array:Expression[] = [];
        const word  = <string>result.value
        for (let i = 0; i < word.length; i++){
            array.push(new Primitive(result.value[i], dataType.CHAR, this.line, this.column))
        }

        return {value: array, type:dataType.CHAR};
    }


    /*
    * exp . c_str ( ) ;
    * */
    public getAst(last: string): string{
        let result = ""
        let counter = Counter.getInstance()
        let c_strNodeT = `n${counter.get()}`
        let expNode = `n${counter.get()}`
        let dotNode = `n${counter.get()}`
        let c_strNode = `n${counter.get()}`
        let lParenNode = `n${counter.get()}`
        let rParenNode = `n${counter.get()}`
        result += `${c_strNodeT}[label="C_str"];\n`
        result += `${expNode}[label="Expresion"];\n`
        result += `${dotNode}[label="."];\n`
        result += `${c_strNode}[label="c_str"];\n`
        result += `${lParenNode}[label="("];\n`
        result += `${rParenNode}[label=")"];\n`
        result += `${last} -> ${c_strNodeT};\n`
        result += `${c_strNodeT} -> ${expNode};\n`
        result += this.exp.getAst(expNode)
        result += `${c_strNodeT} -> ${dotNode};\n`
        result += `${c_strNodeT} -> ${c_strNode};\n`
        result += `${c_strNodeT} -> ${lParenNode};\n`
        result += `${c_strNodeT} -> ${rParenNode};\n`
        return result
    }
}