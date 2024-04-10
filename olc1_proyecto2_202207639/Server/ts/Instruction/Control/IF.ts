import { Expression } from "../../Expression/Expression";
import { dataType } from "../../Expression/Result";
import { Instruction } from "../Instruction";
import { Block } from "../Block";

export class FN_IF extends Instruction {
    condition: Expression
    blockIf: Block
    blockElse: Block

    constructor(condition: Expression, blockIf: Block, blockElse: Block, line: number, column: number) {
        super(line, column);
        this.condition = condition
        this.blockIf = blockIf
        this.blockElse = blockElse
    }

    public interpreter(tConsole: string[]): null {
        const condition = this.condition.interpreter()
        if (condition.type != dataType.BOOL) {
            throw Error("Error: Type mismatch")
        }
        if (condition.value) {
            this.blockIf.interpreter(tConsole)
        } else if(this.blockElse != null){
            this.blockElse.interpreter(tConsole)
        }
        return null
    }
}