import { Expression } from "../../Abstract/Expression";
import { dataType } from "../../Abstract/Result";
import { Instruction } from "../../Abstract/Instruction";
import { Block } from "../Block";
import { Environment} from "../../Symbol/Environment";

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

    public interpreter(environment: Environment, tConsole: string[]): any {
        const condition = this.condition.interpreter(environment)
        if (condition.type != dataType.BOOL) {
            throw Error("Error: Type mismatch")
        }
        if (condition.value) {
            return this.blockIf.interpreter(environment, tConsole)
        } else if(this.blockElse != null){
            return this.blockElse.interpreter(environment, tConsole)
        }
        return null
    }
}