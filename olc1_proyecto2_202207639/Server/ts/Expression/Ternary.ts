import { env } from "process";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { dataType, Result } from "../Abstract/Result";

export class Ternary extends Expression {
    condition: Expression
    blockIf: Expression
    blockElse: Expression

    constructor(condition: Expression, blockIf: Expression, blockElse: Expression, line: number, column: number) {
        super(line, column);
        this.condition = condition
        this.blockIf = blockIf
        this.blockElse = blockElse
    }

    public interpreter(environment: Environment) : Result {
        const condition = this.condition.interpreter(environment)
        if (condition.type != dataType.BOOL) {
            throw Error("Error: Type mismatch")
        }
        if (condition.value) {
            return this.blockIf.interpreter(environment)
        } else {
            return this.blockElse.interpreter(environment)
        }
    }
}