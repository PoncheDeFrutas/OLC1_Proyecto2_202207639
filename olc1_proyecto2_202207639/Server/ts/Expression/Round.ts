import {Environment} from "../Symbol/Environment";
import {Expression} from "../Abstract/Expression";
import {dataType, Result} from "../Abstract/Result";

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
            throw Error("Error: Type mismatch")
        }

    }
}