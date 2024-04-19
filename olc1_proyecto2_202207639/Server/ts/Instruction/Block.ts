import { Environment } from "../Symbol/Environment";
import { Instruction } from "../Abstract/Instruction";

export class Block extends Instruction {
    instructions: Instruction[]

    constructor(instructions: Instruction[], line: number, column: number) {
        super(line, column);
        this.instructions = instructions
    }

    public interpreter(environment: Environment): any {
        const newEnv = new Environment(environment)

        for (const instruction of this.instructions) {
            try{
                const element = instruction.interpreter(newEnv)
                if (element != null || element != undefined){
                    if (element.type == 'continue') {
                        continue;
                    }
                    return element;
                }
            } catch (error){
                console.log(error)
            }
        }
        return null;
    }
}