import {Environment} from "../Symbol/Environment";
import {Expression} from "../Abstract/Expression";
import {dataType, Result} from "../Abstract/Result";

export class Casting extends Expression{
    private type: string;
    private value: Expression;

    constructor(type: string, value: Expression, line: number, column: number) {
        super(line, column);
        this.type = type;
        this.value = value;
    }

    public interpreter(environment: Environment): Result {
        const value = this.value.interpreter(environment);
        let result: Result;
        switch (this.type) {
            case "int":
                switch (value.type) {
                    case dataType.NUMBER:
                        result = {value: value.value, type: dataType.NUMBER};
                        break;
                    case dataType.DOUBLE:
                        result = {value: Math.floor(value.value), type: dataType.NUMBER};
                        break;
                    case dataType.CHAR:
                        result = {value: value.value.charCodeAt(0), type: dataType.NUMBER};
                        break;
                    default:
                        throw Error("Error: Type mismatch");
                }
                break;
            case "double":
                switch (value.type) {
                    case dataType.NUMBER:
                        result = {value: value.value + 0.0, type: dataType.DOUBLE};
                        break;
                    case dataType.DOUBLE:
                        result = {value: value.value, type: dataType.DOUBLE};
                        break;
                    case dataType.CHAR:
                        result = {value: value.value.charCodeAt(0) + 0.0, type: dataType.DOUBLE};
                        break;
                    default:
                        throw Error("Error: Type mismatch");
                }
                break;
            case "char":
                if (value.type == dataType.NUMBER) {
                    result = {value: String.fromCharCode(value.value), type: dataType.CHAR};
                } else {
                    throw new Error("Error: Type mismatch");
                }
                break;
            case "string":
                if (value.type == dataType.NUMBER || value.type == dataType.DOUBLE) {
                    result = {value: value.value.toString(), type: dataType.STRING};
                } else {
                    throw new Error("Error: Type mismatch");
                }
                break;
            default:
                throw new Error("Error: Type not valid");
        }
        return result;
    }
}