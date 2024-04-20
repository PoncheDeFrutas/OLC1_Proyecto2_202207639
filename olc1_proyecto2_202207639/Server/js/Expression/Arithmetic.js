"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arithmetic = void 0;
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
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
                        return { value: -leftResult.value, type: dominantType };
                    case Result_1.dataType.DOUBLE:
                        return { value: -leftResult.value, type: dominantType };
                    default:
                        throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${dominantType} Invalido en Operación Unimus`, this.line, this.column));
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
                        throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${dominantType} Invalido en Operación SUM`, this.line, this.column));
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
                        throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${dominantType} Invalido en Operación RES`, this.line, this.column));
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
                        throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${dominantType} Invalido en Operación MUL`, this.line, this.column));
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
                        throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${dominantType} Invalido en Operación DIV`, this.line, this.column));
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
                        throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${dominantType} Invalido en Operación MOD`, this.line, this.column));
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
                        throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${dominantType} Invalido en Operación POW`, this.line, this.column));
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
