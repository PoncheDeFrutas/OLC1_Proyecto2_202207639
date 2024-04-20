"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relational = void 0;
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
class Relational extends Expression_1.Expression {
    constructor(left, right, op, line, column) {
        super(line, column);
        this.left = left;
        this.right = right;
        this.op = op;
    }
    interpreter(environment) {
        const leftResult = this.left.interpreter(environment);
        const rightResult = this.right.interpreter(environment);
        if (leftResult.type == Result_1.dataType.NULL || rightResult.type == Result_1.dataType.NULL) {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Valor null no es valido en operacion relacional`, this.line, this.column));
        }
        if (((leftResult.type == Result_1.dataType.NUMBER || leftResult.type == Result_1.dataType.DOUBLE || leftResult.type == Result_1.dataType.CHAR) &&
            (rightResult.type == Result_1.dataType.NUMBER || rightResult.type == Result_1.dataType.DOUBLE || rightResult.type == Result_1.dataType.CHAR))
            || (leftResult.type == Result_1.dataType.BOOL && rightResult.type == Result_1.dataType.BOOL)
            || (leftResult.type == Result_1.dataType.STRING && rightResult.type == Result_1.dataType.STRING)) {
            switch (this.op) {
                case Result_1.RelationalOp.EQ:
                    return { value: leftResult.value == rightResult.value, type: Result_1.dataType.BOOL };
                case Result_1.RelationalOp.NEQ:
                    return { value: leftResult.value != rightResult.value, type: Result_1.dataType.BOOL };
                case Result_1.RelationalOp.GT:
                    return { value: leftResult.value > rightResult.value, type: Result_1.dataType.BOOL };
                case Result_1.RelationalOp.LT:
                    return { value: leftResult.value < rightResult.value, type: Result_1.dataType.BOOL };
                case Result_1.RelationalOp.GEQ:
                    return { value: leftResult.value >= rightResult.value, type: Result_1.dataType.BOOL };
                case Result_1.RelationalOp.LEQ:
                    return { value: leftResult.value <= rightResult.value, type: Result_1.dataType.BOOL };
                default:
                    return { value: null, type: Result_1.dataType.NULL };
            }
        }
        return { value: null, type: Result_1.dataType.NULL };
    }
}
exports.Relational = Relational;
