import { Expression } from "../Abstract/Expression";
import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import Counter from "../Symbol/Counter";

export class Case extends Instruction{
    condition: Expression
    instructions: Instruction[]

    constructor(condition: Expression, instructions: Instruction[], line: number, column: number){
        super(line, column)
        this.condition = condition
        this.instructions = instructions
    }

    public interpreter(environment: Environment): any{
        for (const instruction of this.instructions) {
            try{
                const element = instruction.interpreter(environment)
                if (element != null || element != undefined){
                    return element;
                }
            } catch (error){
                console.log(error)
            }
        }
    }

    /*
      case exp : instructions
    * */
    public getAst(last: string): string{
        let result = ""
        let counter = Counter.getInstance()
        let caseNodeT = `n${counter.get()}`
        let caseNode = `n${counter.get()}`
        let expNode = `n${counter.get()}`
        let colonNode = `n${counter.get()}`
        let instructionsNode = `n${counter.get()}`
        result += `${caseNodeT}[label="I_case"];\n`
        result += `${caseNode}[label="case"];\n`
        result += `${expNode}[label="exp"];\n`
        result += `${colonNode}[label=":"];\n`
        result += `${instructionsNode}[label="instructions"];\n`
        result += `${last} -> ${caseNodeT};\n`
        result += `${caseNodeT} -> ${caseNode};\n`
        result += `${caseNodeT} -> ${expNode};\n`
        result += this.condition.getAst(expNode)
        result += `${caseNodeT} -> ${colonNode};\n`
        result += `${caseNodeT} -> ${instructionsNode};\n`
        for (const instruction of this.instructions) {
            result += instruction.getAst(instructionsNode)
        }
        return result
    }
}