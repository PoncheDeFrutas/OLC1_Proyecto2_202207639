import { env } from "process";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { dataType, Result } from "../Abstract/Result";
import {tError} from "../tConsole";
import {Error_} from "../Error";

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
            throw tError.push(new Error_(tError.length, "Semantico",
                `Condición no booleana en operador ternario`, this.line, this.column ))
        }
        if (condition.value) {
            return this.blockIf.interpreter(environment)
        } else {
            return this.blockElse.interpreter(environment)
        }
    }
}