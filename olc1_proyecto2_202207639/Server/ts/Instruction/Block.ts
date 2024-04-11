import { Environment } from "../Symbol/Environment";
import { Instruction } from "../Abstract/Instruction";

export class Block extends Instruction {
    instructions: Instruction[]

    constructor(instructions: Instruction[], line: number, column: number) {
        super(line, column);
        this.instructions = instructions
    }

    public interpreter(environment: Environment, tConsole: string[]) {
        const newEnv = new Environment(environment)

        this.instructions.forEach(instruction => {
            try{
                const element = instruction.interpreter(newEnv, tConsole)
                if (element != null || element != undefined){
                    return element;
                }
            } catch (error){
                console.log(error)
            }
        });
    }
}