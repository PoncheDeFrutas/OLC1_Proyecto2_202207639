import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import {tError} from "../tConsole";
import {Error_} from "../Error";
import Counter from "../Symbol/Counter";

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
                            return element
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

    public getAst(last: string): string{
        let result = ""
        let counter = Counter.getInstance()
        let defaultNodeT = `n${counter.get()}`
        let defaultNode = `n${counter.get()}`
        let colonNode = `n${counter.get()}`
        let instructionsNode = `n${counter.get()}`
        result += `${defaultNodeT}[label="I_default"];\n`
        result += `${defaultNode}[label="default"];\n`
        result += `${colonNode}[label=":"];\n`
        result += `${instructionsNode}[label="instructions"];\n`
        result += `${last} -> ${defaultNodeT};\n`
        result += `${defaultNodeT} -> ${defaultNode};\n`
        result += `${defaultNodeT} -> ${colonNode};\n`
        result += `${defaultNodeT} -> ${instructionsNode};\n`
        for (const instruction of this.instructions) {
            result += instruction.getAst(instructionsNode)
        }
        return result
    }
}