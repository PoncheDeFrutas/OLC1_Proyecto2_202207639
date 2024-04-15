import { env } from "process";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { dataType, Result } from "../Abstract/Result";

export class toLowUp extends Expression{
    private text: Expression;
    private LowUp: boolean;

    constructor(text: Expression, LowUp: boolean, line: number, column: number) {
        super(line, column);
        this.text = text;
        this.LowUp = LowUp;
    }

    public interpreter(environment: Environment): Result {
        const result = this.text.interpreter(environment)
        if (result.type != dataType.STRING) {
            throw Error("Error: Type mismatch")
        }

        if (this.LowUp){
            return {value: result.value.toLowerCase(), type: dataType.STRING}
        } else{
            return {value: result.value.toUpperCase(), type: dataType.STRING}
        }
    }
}