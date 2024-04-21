import { Expression } from "../Abstract/Expression";
import {dataType, getDataTypeName, Result} from "../Abstract/Result";
import Counter from "../Symbol/Counter";

export class Primitive extends Expression {
    exp: string;
    type: dataType;

    constructor(exp: string, type: dataType, line:number, column:number) {
        super(line, column);
        this.exp = exp;
        this.type = type;
    }

    public interpreter(): Result {
        switch (this.type) {
            case dataType.NUMBER:
                return {value: Number(this.exp), type: dataType.NUMBER};
            case dataType.DOUBLE:
                return {value: Number(this.exp), type: dataType.DOUBLE};
            case dataType.BOOL:
                return {value: this.exp == "true", type: dataType.BOOL};
            case dataType.STRING:
                return {value: this.exp.toString(), type: dataType.STRING};
            case dataType.CHAR:
                return {value: this.exp, type: dataType.CHAR};
            default:
                return {value: null, type: dataType.NULL};
        }
    }

    /*
    * Primitive
    * Primitive -> Value
    * last -> Primitive
    */
    public getAst(last: string): string{
        let counter = Counter.getInstance()
        let primitiveNode = `n${counter.get()}`
        let valueNode = `n${counter.get()}`
        let result = `${primitiveNode}[label="Primitive"];\n`
        result += `${valueNode}[label="${this.exp}"];\n`
        result += `${primitiveNode} -> ${valueNode};\n`
        result += `${last} -> ${primitiveNode};\n`
        return result
    }
}