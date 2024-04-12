import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";

export class Break extends Instruction {
    constructor(line: number, column: number) {
        super(line, column);
    }

    public interpreter(environment: Environment): any  {
        return {line: this.line, column: this.column, type: 'break'}
    }
}