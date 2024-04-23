import { Environment } from "../Symbol/Environment";
import { Instruction } from "../Abstract/Instruction";
import Counter from "../Symbol/Counter";

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

    /*
    * lbracket instructions rbracket
    * lbracket rbracket
    */
    public getAst(last: string): string{
        let result = ""
        let counter = Counter.getInstance()
        let lbracket = `n${counter.get()}`
        result += `${lbracket}[label="{"];\n`
        result += `${last} -> ${lbracket};\n`
        for (const instruction of this.instructions) {
            result += instruction.getAst(last)
        }
        let rbracket = `n${counter.get()}`
        result += `${rbracket}[label="}"];\n`
        result += `${last} -> ${rbracket};\n`
        return result
    }
}