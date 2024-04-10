import { Instruction } from "./Instruction";

export class Block extends Instruction {
    instructions: Instruction[]

    constructor(instructions: Instruction[], line: number, column: number) {
        super(line, column);
        this.instructions = instructions
    }

    public interpreter(tConsole: string[]): null {
        this.instructions.forEach(instruction => {
            instruction.interpreter(tConsole)
        });
        return null;
    }
}