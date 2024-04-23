import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import Counter from "../Symbol/Counter";

export class Continue extends Instruction {
    constructor(line: number, column: number) {
        super(line, column);
    }

    public interpreter(environment: Environment): any {
        return {line: this.line, column: this.column, type: 'continue'}
    }

    /*
    * continue ;
    */
    public getAst(last: string): string{
        let result = ""
        let counter = Counter.getInstance()
        let continueNodeT = `n${counter.get()}`
        let continueNode = `n${counter.get()}`
        let semicolonNode = `n${counter.get()}`
        result += `${continueNodeT}[label="I_continue"];\n`
        result += `${continueNode}[label="continue"];\n`
        result += `${semicolonNode}[label=";"];\n`
        result += `${last} -> ${continueNodeT};\n`
        result += `${continueNodeT} -> ${continueNode};\n`
        result += `${continueNodeT} -> ${semicolonNode};\n`
        return result
    }
}