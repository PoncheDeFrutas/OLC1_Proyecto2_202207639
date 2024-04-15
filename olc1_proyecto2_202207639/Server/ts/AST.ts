import { env } from "process";
import { Expression } from "./Abstract/Expression";
import { Instruction } from "./Abstract/Instruction";
import { Environment } from "./Symbol/Environment";

export class AST {
    public instructions: Instruction[]
    public tConsole: string[]
    public global: Environment

    constructor(instructions: Instruction[]) {
        this.instructions = instructions
        this.tConsole = []
        this.global = new Environment(null)
    }

    public Execute(){
        this.instructions.forEach(instruction => {
            instruction.interpreter(this.global, this.tConsole)
        });
    }

    public getConsole(){
        let exit = ""
        for (let index = 0; index < this.tConsole.length; index++) {
            exit += this.tConsole[index].toString();
        }
        return exit.toString();
    }
}