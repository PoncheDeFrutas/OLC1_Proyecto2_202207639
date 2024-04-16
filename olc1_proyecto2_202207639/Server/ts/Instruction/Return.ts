import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";

export class Return extends Instruction {

    constructor(private exp: Expression , line: number, column: number) {
        super(line, column);
    }

    public interpreter(environment: Environment): any {
        const value = this.exp.interpreter(environment);
        return {line: this.line, column: this.column, type: "return", value: value.value, typeValue: value.type};
    }
}