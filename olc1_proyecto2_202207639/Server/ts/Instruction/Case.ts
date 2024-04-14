import { Expression } from "../Abstract/Expression";
import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";

export class Case extends Instruction{
    condition: Expression
    instructions: Instruction[]

    constructor(condition: Expression, instructions: Instruction[], line: number, column: number){
        super(line, column)
        this.condition = condition
        this.instructions = instructions
    }

    public interpreter(environment: Environment, tConsole: string[]): any{
        for (const instruction of this.instructions) {
            try{
                const element = instruction.interpreter(environment, tConsole)
                if (element != null || element != undefined){
                    return element;
                }
            } catch (error){
                console.log(error)
            }
        }
    }
}