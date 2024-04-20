import { Expression } from "../../Abstract/Expression";
import { dataType } from "../../Abstract/Result";
import { Instruction } from "../../Abstract/Instruction";
import { Block } from "../Block";
import { Environment } from "../../Symbol/Environment";
import {tError} from "../../tConsole";
import {Error_} from "../../Error";

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

    public interpreter(environment: Environment): any {
        const condition = this.condition.interpreter(environment)
        if (condition.type != dataType.BOOL) {
            throw tError.push(new Error_(tError.length, "Semantico",
                `Condición no booleana en sentencia if`, this.line, this.column ))
        }
        if (condition.value) {
            return this.blockIf.interpreter(environment)
        } else if(this.blockElse != null){
            return this.blockElse.interpreter(environment)
        }
        return null
    }
}