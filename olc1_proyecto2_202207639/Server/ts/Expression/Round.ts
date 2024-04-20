import {Environment} from "../Symbol/Environment";
import {Expression} from "../Abstract/Expression";
import {dataType, Result} from "../Abstract/Result";
import {tError} from "../tConsole";
import {Error_} from "../Error";

export class Round extends Expression{
    private number: Expression;

    constructor(number: Expression, line: number, column: number) {
        super(line, column);
        this.number = number;
    }

    public interpreter(environment: Environment): Result {
        const result = this.number.interpreter(environment)
        if (result.type == dataType.DOUBLE || result.type == dataType.NUMBER) {
            return {value: Math.round(result.value), type: dataType.NUMBER}
        } else {
            throw tError.push(new Error_(tError.length, "Semantico",
                `Tipo ${result.type} no valio para la funcion redondeo`, this.line, this.column ))
        }

    }
}