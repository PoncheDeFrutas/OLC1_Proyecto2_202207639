import { Expression } from "./Expression";
import { dataType, Result } from "./Result";

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
}