import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import {dataType} from "../Abstract/Result";

export class Return extends Instruction {

    constructor(private exp: Expression | null , line: number, column: number) {
        super(line, column);
    }

    public interpreter(environment: Environment): any {
        if(this.exp != null){
            const value = this.exp.interpreter(environment);
            return {line: this.line, column: this.column, typeValue: "return", value: value.value, type: value.type};
        } else{
            return {line: this.line, column: this.column, typeValue: "return", value: null, type: dataType.NULL};
        }
    }
}