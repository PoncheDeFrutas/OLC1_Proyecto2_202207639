import { Expression } from "../Abstract/Expression";
import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import {Block} from "./Block";

export class For extends Instruction{
    variable: Instruction
    condition: Expression
    increment: Instruction
    block: Block

    constructor(variable: Instruction, condition: Expression, increment: Instruction, block: Block, line: number, column: number) {
        super(line, column)
        this.variable = variable
        this.condition = condition
        this.increment = increment
        this.block = block
    }

    public interpreter(environment: Environment): any {
        const newEnv = new Environment(environment)
        this.variable.interpreter(newEnv)
        let condition = this.condition.interpreter(newEnv)
        while(condition.value){
            const element = this.block.interpreter(newEnv)
            if (element != null || element != undefined) {
                if (element.type == 'break') {
                    break;
                } else if (element.typeValue == 'return') {
                    return element;
                } else{
                    throw Error(`Error: Type [${element.type}] is not valid for [For] code`);
                }
            }
            this.increment.interpreter(newEnv)
            condition = this.condition.interpreter(newEnv)
        }
    }
}