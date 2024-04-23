"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arithmetic = void 0;
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
const Counter_1 = __importDefault(require("../Symbol/Counter"));
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
    /*
    * Exp, op, Exp
    *
    * -, exp
    *
    * pow ( exp , exp )
    *
    * exp -> value
    */
    getAst(last) {
        let counter = Counter_1.default.getInstance();
        let result = "";
        if (this.op == Result_1.ArithmeticOp.UMINUS) {
            let uminusNode = `n${counter.get()}`;
            let expNode = `n${counter.get()}`;
            result += `${uminusNode}[label="-"];\n`;
            result += `${expNode}[label="Exp"];\n`;
            result += `${last} -> ${uminusNode};\n`;
            result += `${last} -> ${expNode};\n`;
            result += this.left.getAst(expNode);
            return result;
        }
        else if (this.op == Result_1.ArithmeticOp.POW) {
            let powNode = `n${counter.get()}`;
            let lParenNode = `n${counter.get()}`;
            let exp1Node = `n${counter.get()}`;
            let commaNode = `n${counter.get()}`;
            let exp2Node = `n${counter.get()}`;
            let rParenNode = `n${counter.get()}`;
            result += `${powNode}[label="Pow"];\n`;
            result += `${lParenNode}[label="("];\n`;
            result += `${exp1Node}[label="Exp"];\n`;
            result += `${commaNode}[label=","];\n`;
            result += `${exp2Node}[label="Exp"];\n`;
            result += `${rParenNode}[label=")"];\n`;
            result += `${last} -> ${powNode};\n`;
            result += `${last} -> ${lParenNode};\n`;
            result += `${last} -> ${exp1Node};\n`;
            result += this.left.getAst(exp1Node);
            result += `${last} -> ${commaNode};\n`;
            result += `${last} -> ${exp2Node};\n`;
            result += this.right.getAst(exp2Node);
            result += `${last} -> ${rParenNode};\n`;
            return result;
        }
        let exp1 = `n${counter.get()}`;
        let op = `n${counter.get()}`;
        let exp2 = `n${counter.get()}`;
        let stringOp = (0, Result_1.getArithmeticOpName)(this.op);
        result += `${exp1}[label="Exp"];\n`;
        result += `${op}[label="${stringOp}"];\n`;
        result += `${exp2}[label="Exp"];\n`;
        result += `${last} -> ${exp1};\n`;
        result += this.left.getAst(exp1);
        result += `${last} -> ${op};\n`;
        result += `${last} -> ${exp2};\n`;
        result += this.right.getAst(exp2);
        return result;
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
