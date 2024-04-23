import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import {dataType} from "../Abstract/Result";
import Counter from "../Symbol/Counter";

export class Return extends Instruction {

    constructor(private exp: Expression | null , line: number, column: number) {
        super(line, column);
    }

    public interpreter(environment: Environment): any {
        if(this.exp != null){
            const value = this.exp.interpreter(environment);
            return {line: this.line, column: this.column, typeValue: "return", value: value.value, type: value.type};
        } else{
            return {line: this.line, column: this.column, typeValue: "return", value: null, type: dataType.NULL};
        }
    }

    /*
    * return (exp | ) ;
    * */
    public getAst(last: string): string{
        let result = ""
        let counter = Counter.getInstance()
        let returnNodeT = `n${counter.get()}`
        let returnNode = `n${counter.get()}`
        result += `${returnNodeT}[label="I_Return"];\n`
        result += `${returnNode}[label="return"];\n`
        result += `${last} -> ${returnNodeT};\n`
        result += `${returnNodeT} -> ${returnNode};\n`
        if(this.exp != null){
            let expNode = `n${counter.get()}`
            result += `${expNode}[label="Expresion"];\n`
            result += `${returnNodeT} -> ${expNode};\n`
            result += this.exp.getAst(expNode)
        }
        let semicolonNode = `n${counter.get()}`
        result += `${semicolonNode}[label=";"];\n`
        result += `${returnNodeT} -> ${semicolonNode};\n`
        return result

    }
}