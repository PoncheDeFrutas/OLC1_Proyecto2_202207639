"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arithmetic = void 0;
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
class Arithmetic extends Expression_1.Expression {
    constructor(left, right, op, line, column) {
        super(line, column);
        this.left = left;
        this.right = right;
        this.op = op;
    }
    interpreter(environment) {
        const leftResult = this.left.interpreter(environment);
        const rightResult = this.right.interpreter(environment);
        let dominantType;
        switch (this.op) {
            case Result_1.ArithmeticOp.UMINUS:
                dominantType = UMINUS[leftResult.type];
                switch (dominantType) {
                    case Result_1.dataType.NUMBER:
                        convertType(leftResult);
                        return { value: -leftResult.value, type: dominantType };
                    case Result_1.dataType.DOUBLE:
                        convertType(leftResult);
                        return { value: -leftResult.value, type: dominantType };
                    default:
                        throw Error("Error: Type mismatch");
                }
            case Result_1.ArithmeticOp.SUM:
                dominantType = SUM[leftResult.type][rightResult.type];
                switch (dominantType) {
                    case Result_1.dataType.NUMBER:
                        convertType(leftResult);
                        convertType(rightResult);
                        return { value: leftResult.value + rightResult.value, type: dominantType };
                    case Result_1.dataType.DOUBLE:
                        convertType(leftResult);
                        convertType(rightResult);
                        return { value: leftResult.value + rightResult.value, type: dominantType };
                    case Result_1.dataType.STRING:
                        return { value: leftResult.value.toString() + rightResult.value.toString(), type: dominantType };
                    default:
                        throw Error("Error: Type mismatch");
                }
            case Result_1.ArithmeticOp.RES:
                dominantType = RES[leftResult.type][rightResult.type];
                switch (dominantType) {
                    case Result_1.dataType.NUMBER:
                        convertType(leftResult);
                        convertType(rightResult);
                        return { value: leftResult.value - rightResult.value, type: dominantType };
                    case Result_1.dataType.DOUBLE:
                        convertType(leftResult);
                        convertType(rightResult);
                        return { value: leftResult.value - rightResult.value, type: dominantType };
                    default:
                        throw Error("Error: Type mismatch");
                }
            case Result_1.ArithmeticOp.MUL:
                dominantType = MUL[leftResult.type][rightResult.type];
                switch (dominantType) {
                    case Result_1.dataType.NUMBER:
                        convertType(leftResult);
                        convertType(rightResult);
                        return { value: leftResult.value * rightResult.value, type: dominantType };
                    case Result_1.dataType.DOUBLE:
                        convertType(leftResult);
                        convertType(rightResult);
                        return { value: leftResult.value * rightResult.value, type: dominantType };
                    default:
                        throw Error("Error: Type mismatch");
                }
            case Result_1.ArithmeticOp.DIV:
                dominantType = DIV[leftResult.type][rightResult.type];
                switch (dominantType) {
                    case Result_1.dataType.DOUBLE:
                        convertType(leftResult);
                        convertType(rightResult);
                        if (rightResult.value == 0)
                            throw Error("Error: Division by zero");
                        return { value: leftResult.value / rightResult.value, type: dominantType };
                    default:
                        throw Error("Error: Type mismatch");
                }
            case Result_1.ArithmeticOp.MOD:
                dominantType = MOD[leftResult.type][rightResult.type];
                switch (dominantType) {
                    case Result_1.dataType.DOUBLE:
                        convertType(leftResult);
                        convertType(rightResult);
                        if (rightResult.value == 0)
                            throw Error("Error: Division by zero");
                        return { value: leftResult.value % rightResult.value, type: dominantType };
                    default:
                        throw Error("Error: Type mismatch");
                }
            case Result_1.ArithmeticOp.POW:
                dominantType = POW[leftResult.type][rightResult.type];
                switch (dominantType) {
                    case Result_1.dataType.NUMBER:
                        convertType(leftResult);
                        convertType(rightResult);
                        return { value: Math.pow(leftResult.value, rightResult.value), type: dominantType };
                    case Result_1.dataType.DOUBLE:
                        convertType(leftResult);
                        convertType(rightResult);
                        return { value: Math.pow(leftResult.value, rightResult.value), type: dominantType };
                    default:
                        throw Error("Error: Type mismatch");
                }
            default:
                return { value: null, type: Result_1.dataType.NULL };
        }
    }
}
exports.Arithmetic = Arithmetic;
function convertType(tmpResult) {
    if (tmpResult.type == Result_1.dataType.BOOL)
        tmpResult.value = tmpResult.value ? 1 : 0;
    if (tmpResult.type == Result_1.dataType.CHAR)
        tmpResult.value = tmpResult.value.charCodeAt(0);
}
const SUM = [
    [Result_1.dataType.NUMBER, Result_1.dataType.DOUBLE, Result_1.dataType.NUMBER, Result_1.dataType.NUMBER, Result_1.dataType.STRING],
    [Result_1.dataType.DOUBLE, Result_1.dataType.DOUBLE, Result_1.dataType.DOUBLE, Result_1.dataType.DOUBLE, Result_1.dataType.STRING],
    [Result_1.dataType.NUMBER, Result_1.dataType.DOUBLE, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.STRING],
    [Result_1.dataType.NUMBER, Result_1.dataType.DOUBLE, Result_1.dataType.NULL, Result_1.dataType.STRING, Result_1.dataType.STRING],
    [Result_1.dataType.STRING, Result_1.dataType.STRING, Result_1.dataType.STRING, Result_1.dataType.STRING, Result_1.dataType.STRING]
];
const RES = [
    [Result_1.dataType.NUMBER, Result_1.dataType.DOUBLE, Result_1.dataType.NUMBER, Result_1.dataType.NUMBER, Result_1.dataType.NULL],
    [Result_1.dataType.DOUBLE, Result_1.dataType.DOUBLE, Result_1.dataType.DOUBLE, Result_1.dataType.DOUBLE, Result_1.dataType.NULL],
    [Result_1.dataType.NUMBER, Result_1.dataType.DOUBLE, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL],
    [Result_1.dataType.NUMBER, Result_1.dataType.DOUBLE, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL],
    [Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL]
];
const MUL = [
    [Result_1.dataType.NUMBER, Result_1.dataType.DOUBLE, Result_1.dataType.NULL, Result_1.dataType.NUMBER, Result_1.dataType.NULL],
    [Result_1.dataType.DOUBLE, Result_1.dataType.DOUBLE, Result_1.dataType.NULL, Result_1.dataType.DOUBLE, Result_1.dataType.NULL],
    [Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL],
    [Result_1.dataType.NUMBER, Result_1.dataType.DOUBLE, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL],
    [Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL]
];
const DIV = [
    [Result_1.dataType.DOUBLE, Result_1.dataType.DOUBLE, Result_1.dataType.NULL, Result_1.dataType.NUMBER, Result_1.dataType.NULL],
    [Result_1.dataType.DOUBLE, Result_1.dataType.DOUBLE, Result_1.dataType.NULL, Result_1.dataType.DOUBLE, Result_1.dataType.NULL],
    [Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL],
    [Result_1.dataType.DOUBLE, Result_1.dataType.DOUBLE, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL],
    [Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL]
];
const POW = [
    [Result_1.dataType.NUMBER, Result_1.dataType.DOUBLE, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL],
    [Result_1.dataType.DOUBLE, Result_1.dataType.DOUBLE, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL],
    [Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL],
    [Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL],
    [Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL]
];
const MOD = [
    [Result_1.dataType.DOUBLE, Result_1.dataType.DOUBLE, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL],
    [Result_1.dataType.DOUBLE, Result_1.dataType.DOUBLE, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL],
    [Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL],
    [Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL],
    [Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL]
];
const UMINUS = [Result_1.dataType.NUMBER, Result_1.dataType.DOUBLE, Result_1.dataType.NULL, Result_1.dataType.NULL, Result_1.dataType.NULL];
