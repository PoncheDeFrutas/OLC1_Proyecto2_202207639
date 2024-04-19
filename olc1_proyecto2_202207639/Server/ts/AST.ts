import { env } from "process";
import { Expression } from "./Abstract/Expression";
import { Instruction } from "./Abstract/Instruction";
import { Environment } from "./Symbol/Environment";
import { tConsole} from "./tConsole";
import {Declaration} from "./Instruction/Declaration";
import {DeclarationVector} from "./Instruction/DeclarationVector";
import {DeclarationVector2} from "./Instruction/DeclarationVector2";
import {Function} from "./Instruction/Function";
import {execute} from "./Instruction/execute";

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
        tConsole.length = 0
        this.instructions.forEach(instruction => {
            if (instruction instanceof Function|| instruction instanceof Declaration ||
            instruction instanceof DeclarationVector || instruction instanceof DeclarationVector2){
                instruction.interpreter(this.global)
            }
        });
        for (let instruction of this.instructions) {
            if (instruction instanceof execute){
                instruction.interpreter(this.global);
                break;
            }
        }

        this.tConsole = tConsole
    }

    public getConsole(){
        let exit = ""
        for (let index = 0; index < this.tConsole.length; index++) {
            exit += this.tConsole[index].toString();
        }
        return exit.replace("\\n", "\n").replace("\\t", "\t").replace("\\\"", "\"").replace("\\\'", "\'").replace("\\", "\\")
    }
}