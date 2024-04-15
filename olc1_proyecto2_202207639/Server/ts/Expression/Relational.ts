import { env } from "process";
import { Environment } from "../Symbol/Environment";
import {Expression} from "../Abstract/Expression";
import {dataType, RelationalOp, Result} from "../Abstract/Result";

export class Relational extends Expression {
    public left: Expression;
    public right: Expression;
    public op: RelationalOp;

    constructor(left: Expression, right: Expression, op: RelationalOp, line: number, column: number) {
        super(line, column);
        this.left = left;
        this.right = right;
        this.op = op;
    }

    public interpreter(environment: Environment): Result{
        const leftResult = this.left.interpreter(environment);
        const rightResult = this.right.interpreter(environment);

        if (leftResult.type == dataType.NULL || rightResult.type == dataType.NULL){
            throw Error ("Error: type null");
        }

        if (((leftResult.type == dataType.NUMBER || leftResult.type == dataType.DOUBLE || leftResult.type == dataType.CHAR) &&
            (rightResult.type == dataType.NUMBER || rightResult.type == dataType.DOUBLE || rightResult.type == dataType.CHAR))
            || (leftResult.type == dataType.BOOL && rightResult.type == dataType.BOOL)
            || (leftResult.type == dataType.STRING && rightResult.type == dataType.STRING)){
            switch (this.op){
                case RelationalOp.EQ:
                    return {value: leftResult.value == rightResult.value, type: dataType.BOOL};
                case RelationalOp.NEQ:
                    return {value: leftResult.value != rightResult.value, type: dataType.BOOL};
                case RelationalOp.GT:
                    return {value: leftResult.value > rightResult.value, type: dataType.BOOL};
                case RelationalOp.LT:
                    return {value: leftResult.value < rightResult.value, type: dataType.BOOL};
                case RelationalOp.GEQ:
                    return {value: leftResult.value >= rightResult.value, type: dataType.BOOL};
                case RelationalOp.LEQ:
                    return {value: leftResult.value <= rightResult.value, type: dataType.BOOL};
                default:
                    return {value: null, type: dataType.NULL};
            }
        }
        return {value: null, type: dataType.NULL};
    }
}
