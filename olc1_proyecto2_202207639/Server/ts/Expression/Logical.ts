import { Expression } from "./Expression";
import { LogicalOp, dataType, Result } from "./Result";

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

    public interpreter(): Result {
        const leftResult = this.left.interpreter();
        const rightResult =  this.right.interpreter();

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
                throw Error("Error: Type mismatch");
        }
        return {value: null, type: dataType.NULL}
    }
}