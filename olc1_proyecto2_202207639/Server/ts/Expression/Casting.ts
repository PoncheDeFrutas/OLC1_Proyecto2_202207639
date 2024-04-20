import {Environment} from "../Symbol/Environment";
import {Expression} from "../Abstract/Expression";
import {dataType, Result} from "../Abstract/Result";
import {tError} from "../tConsole";
import {Error_} from "../Error";

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
                        throw tError.push(new Error_(tError.length, "Semantico",
                            `Tipo ${value.type} no casteable a int`, this.line, this.column ))
                }
                break;
            case "double":
                switch (value.type) {
                    case dataType.NUMBER:
                        result = {value: value.value.toFixed(1), type: dataType.DOUBLE};
                        break;
                    case dataType.DOUBLE:
                        result = {value: value.value.toFixed(1), type: dataType.DOUBLE};
                        break;
                    case dataType.CHAR:
                        result = {value: value.value.charCodeAt(0).toFixed(1), type: dataType.DOUBLE};
                        break;
                    default:
                        throw tError.push(new Error_(tError.length, "Semantico",
                            `Tipo ${value.type} no casteable a double`, this.line, this.column ))
                }
                break;
            case "char":
                if (value.type == dataType.NUMBER) {
                    result = {value: String.fromCharCode(value.value), type: dataType.CHAR};
                } else {
                    throw tError.push(new Error_(tError.length, "Semantico",
                        `Tipo ${value.type} no casteable a char`, this.line, this.column ))
                }
                break;
            case "std::string":
                if (value.type == dataType.NUMBER || value.type == dataType.DOUBLE) {
                    result = {value: value.value.toString(), type: dataType.STRING};
                } else {
                    throw tError.push(new Error_(tError.length, "Semantico",
                        `Tipo ${value.type} no casteable a string`, this.line, this.column ))
                }
                break;
            default:
                throw tError.push(new Error_(tError.length, "Semantico",
                    `Opción casteable no valida ${this.type}`, this.line, this.column ))
        }
        return result;
    }
}