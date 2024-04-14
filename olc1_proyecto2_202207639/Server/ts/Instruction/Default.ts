import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";

export class Default extends Instruction{
    instructions: Instruction[]

    constructor(instructions: Instruction[], line: number, column: number){
        super(line, column)
        this.instructions = instructions
    }

    public interpreter(environment: Environment, tConsole: string[]): any{
        for (const instruction of this.instructions) {
            try{
                const element = instruction.interpreter(environment, tConsole)
                if (element != null || element != undefined){
                    if (element != null || element != undefined){
                        if (element.type == 'break') {
                            break;
                        } else{
                            throw Error(`Error: Type [${element.type}] is not valid for [Default] code`);
                        }
                    }
                }
            } catch (error){
                console.log(error)
            }
        }
    }
}