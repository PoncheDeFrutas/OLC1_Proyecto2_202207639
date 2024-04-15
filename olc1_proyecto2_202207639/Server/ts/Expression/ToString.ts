import {Environment} from "../Symbol/Environment";
import {Expression} from "../Abstract/Expression";
import {dataType, Result} from "../Abstract/Result";

export class ToString extends Expression{
    private text: Expression;

    constructor(text: Expression, line: number, column: number) {
        super(line, column);
        this.text = text;
    }

    public interpreter(environment: Environment): Result {
        const result = this.text.interpreter(environment)
        if (result.type != dataType.NUMBER && result.type != dataType.DOUBLE && dataType.BOOL){
            throw Error("Error: Type mismatch")
        }

        return {value: result.value.toString(), type: dataType.STRING}
    }
}