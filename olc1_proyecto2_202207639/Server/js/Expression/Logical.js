"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logical = void 0;
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
class Logical extends Expression_1.Expression {
    constructor(left, right, op, line, column) {
        super(line, column);
        this.left = left;
        this.right = right;
        this.op = op;
    }
    interpreter(environment) {
        const leftResult = this.left.interpreter(environment);
        const rightResult = this.right.interpreter(environment);
        switch (this.op) {
            case Result_1.LogicalOp.OR:
                if (leftResult.type == Result_1.dataType.BOOL && rightResult.type == Result_1.dataType.BOOL) {
                    return { value: leftResult.value || rightResult.value, type: Result_1.dataType.BOOL };
                }
                break;
            case Result_1.LogicalOp.AND:
                if (leftResult.type == Result_1.dataType.BOOL && rightResult.type == Result_1.dataType.BOOL) {
                    return { value: leftResult.value && rightResult.value, type: Result_1.dataType.BOOL };
                }
                break;
            case Result_1.LogicalOp.NOT:
                if (leftResult.type == Result_1.dataType.BOOL) {
                    return { value: !leftResult.value, type: Result_1.dataType.BOOL };
                }
                break;
            default:
                throw Error("Error: Type mismatch");
        }
        return { value: null, type: Result_1.dataType.NULL };
    }
}
exports.Logical = Logical;
