import { Expression } from "../Abstract/Expression";
import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import {Block} from "./Block";
import {tError} from "../tConsole";
import {Error_} from "../Error";
import Counter from "../Symbol/Counter";

export class For extends Instruction{
    variable: Instruction
    condition: Expression
    increment: Instruction
    block: Block

    constructor(variable: Instruction, condition: Expression, increment: Instruction, block: Block, line: number, column: number) {
        super(line, column)
        this.variable = variable
        this.condition = condition
        this.increment = increment
        this.block = block
    }

    public interpreter(environment: Environment): any {
        const newEnv = new Environment(environment)
        this.variable.interpreter(newEnv)
        let condition = this.condition.interpreter(newEnv)
        while(condition.value){
            const element = this.block.interpreter(newEnv)
            if (element != null || element != undefined) {
                if (element.type == 'break') {
                    break;
                } else if (element.typeValue == 'return') {
                    return element;
                } else{
                    throw tError.push(new Error_(tError.length, "Semantico",
                        `Tipo ${condition.type} no es valido para retorno [For]`, this.line, this.column ))

                }
            }
            this.increment.interpreter(newEnv)
            condition = this.condition.interpreter(newEnv)
        }
    }

    /*
    * for ( instruction ; expression ; instruction ) block
    */
    public getAst(last: string): string{
        let result = ""
        let counter = Counter.getInstance()
        let forNodeT = `n${counter.get()}`
        let forNode = `n${counter.get()}`
        let lParenNode = `n${counter.get()}`
        let instructionNode = `n${counter.get()}`
        let semicolonNode1 = `n${counter.get()}`
        let expressionNode = `n${counter.get()}`
        let semicolonNode2 = `n${counter.get()}`
        let instructionNode2 = `n${counter.get()}`
        let rParenNode = `n${counter.get()}`
        let blockNode = `n${counter.get()}`

        result += `${forNodeT}[label="I_For"];\n`
        result += `${forNode}[label="for"];\n`
        result += `${lParenNode}[label="("];\n`
        result += `${instructionNode}[label="Instruction"];\n`
        result += `${semicolonNode1}[label=";"];\n`
        result += `${expressionNode}[label="Expression"];\n`
        result += `${semicolonNode2}[label=";"];\n`
        result += `${instructionNode2}[label="Instruction"];\n`
        result += `${rParenNode}[label=")"];\n`
        result += `${blockNode}[label="Block"];\n`
        result += `${last} -> ${forNodeT};\n`
        result += `${forNodeT} -> ${forNode};\n`
        result += `${forNodeT} -> ${lParenNode};\n`
        result += `${forNodeT} -> ${rParenNode};\n`
        result += `${forNodeT} -> ${instructionNode};\n`
        result += this.variable.getAst(instructionNode)
        result += `${forNodeT} -> ${semicolonNode1};\n`
        result += `${forNodeT} -> ${expressionNode};\n`
        result += this.condition.getAst(expressionNode)
        result += `${forNodeT} -> ${semicolonNode2};\n`
        result += `${forNodeT} -> ${instructionNode2};\n`
        result += this.increment.getAst(instructionNode2)
        result += `${forNodeT} -> ${blockNode};\n`
        result += this.block.getAst(blockNode)
        return result
    }
}