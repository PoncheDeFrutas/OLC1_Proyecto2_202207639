import { env } from "process";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { LogicalOp, dataType, Result } from "../Abstract/Result";
import {tError} from "../tConsole";
import {Error_} from "../Error";

export class Logical extends Expression{
    public left: Expression;
    public right: Expression;
    public op: LogicalOp;

    constructor(left: Expression, right: Expression, op: LogicalOp, line: number, column: number){
        super(line, column);
        this.left = left;
        this.right = right;
        this.op = op;
    }

    public interpreter(environment: Environment): Result {
        const leftResult = this.left.interpreter(environment);
        const rightResult =  this.right.interpreter(environment);

        switch (this.op) {
            case LogicalOp.OR:
                if (leftResult.type == dataType.BOOL && rightResult.type == dataType.BOOL) {
                    return {value: leftResult.value || rightResult.value, type: dataType.BOOL}
                }
                break;
            case LogicalOp.AND:
                if (leftResult.type == dataType.BOOL && rightResult.type == dataType.BOOL) {
                    return {value: leftResult.value && rightResult.value, type: dataType.BOOL}
                }
                break;
            case LogicalOp.NOT:
                if (leftResult.type == dataType.BOOL) {
                    return {value: !leftResult.value, type: dataType.BOOL}
                }
                break;
            default:
                throw tError.push(new Error_(tError.length, "Semantico",
                    `Operador logico no valido ${this.op}`, this.line, this.column ))
        }
        return {value: null, type: dataType.NULL}
    }
}