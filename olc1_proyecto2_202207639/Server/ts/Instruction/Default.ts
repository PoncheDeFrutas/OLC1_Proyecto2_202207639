import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import {tError} from "../tConsole";
import {Error_} from "../Error";

export class Default extends Instruction{
    instructions: Instruction[]

    constructor(instructions: Instruction[], line: number, column: number){
        super(line, column)
        this.instructions = instructions
    }

    public interpreter(environment: Environment): any{
        for (const instruction of this.instructions) {
            try{
                const element = instruction.interpreter(environment)
                if (element != null || element != undefined){
                    if (element != null || element != undefined){
                        if (element.type == 'break') {
                            break;
                        } else if (element.typeValue == 'return') {
                            return element
                        } else{
                            throw tError.push(new Error_(tError.length, "Semantico",
                                `Tipo ${element.type} no es valido en [Default] code`, this.line, this.column ))

                        }
                    }
                }
            } catch (error){
                console.log(error)
            }
        }
    }
}