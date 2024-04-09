import { Expression } from "./Expression/Expression";
import { Instruction } from "./Instruction/Instruction";

export class AST {
    public instructions: Instruction[]
    public tConsole: string[]

    constructor(instructions: Instruction[]) {
        this.instructions = instructions
        this.tConsole = []
    }

    public Execute(){
        this.instructions.forEach(instruction => {
            instruction.interpreter(this.tConsole)
        });
    }

    public getConsole(){
        let exit = ""
        for (let index = 0; index < this.tConsole.length; index++) {
            exit += this.tConsole[index].toString();
        }
        return exit
    }
}