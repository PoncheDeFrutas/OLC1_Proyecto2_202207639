import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import Counter from "../Symbol/Counter";

export class Break extends Instruction {
    constructor(line: number, column: number) {
        super(line, column);
    }

    public interpreter(environment: Environment): any  {
        return {line: this.line, column: this.column, type: 'break'}
    }

    /*
    * break semicolon
    */
    public getAst(last: string): string{
        let result = ""
        let counter = Counter.getInstance()
        let breakNodeT = `n${counter.get()}`
        let breakNode = `n${counter.get()}`
        let semicolonNode = `n${counter.get()}`
        result += `${breakNodeT}[label="I_break"];\n`
        result += `${breakNode}[label="break"];\n`
        result += `${semicolonNode}[label=";"];\n`
        result += `${last} -> ${breakNodeT};\n`
        result += `${breakNodeT} -> ${breakNode};\n`
        result += `${breakNodeT} -> ${semicolonNode};\n`
        return result
    }
}