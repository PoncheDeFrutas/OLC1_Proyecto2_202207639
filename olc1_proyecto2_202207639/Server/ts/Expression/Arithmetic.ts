import { env } from "process";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { ArithmeticOp, dataType, Result } from "../Abstract/Result";
import { tError } from "../tConsole";
import {Error_} from "../Error";

export class Arithmetic extends Expression{
    public left: Expression;
    public right: Expression;
    public op: ArithmeticOp;

    constructor(left: Expression, right: Expression, op: ArithmeticOp, line: number, column: number){
        super(line, column);
        this.left = left;
        this.right = right;
        this.op = op;
    }

    public interpreter(environment: Environment): Result {
        const leftResult = this.left.interpreter(environment);
        const rightResult = this.right.interpreter(environment);
        let dominantType;

        switch (this.op) {
            case ArithmeticOp.UMINUS:
                dominantType = UMINUS[leftResult.type];
                switch (dominantType) {
                    case dataType.NUMBER:
                        return {value: -leftResult.value, type: dominantType}
                    case dataType.DOUBLE:
                        return {value: -leftResult.value, type: dominantType}
                    default:
                        throw tError.push(new Error_(tError.length, "Semantico",
                            `Tipo ${dominantType} Invalido en Operación Unimus`, this.line, this.column ))
                }
            case ArithmeticOp.SUM:
                dominantType = SUM[leftResult.type][rightResult.type];
                switch (dominantType) {
                    case dataType.NUMBER:
                        convertType(leftResult);
                        convertType(rightResult);
                        return {value: leftResult.value + rightResult.value, type: dominantType}
                    case dataType.DOUBLE:
                        convertType(leftResult);
                        convertType(rightResult);
                        return {value: leftResult.value + rightResult.value, type: dominantType}
                    case dataType.STRING:
                        return {value: leftResult.value.toString() + rightResult.value.toString(), type: dominantType}
                    default:
                        throw tError.push(new Error_(tError.length, "Semantico",
                            `Tipo ${dominantType} Invalido en Operación SUM`, this.line, this.column ))
                }
            case ArithmeticOp.RES:
                dominantType = RES[leftResult.type][rightResult.type];
                switch (dominantType) {
                    case dataType.NUMBER:
                        convertType(leftResult);
                        convertType(rightResult);
                        return {value: leftResult.value - rightResult.value, type: dominantType}
                    case dataType.DOUBLE:
                        convertType(leftResult);
                        convertType(rightResult);
                        return {value: leftResult.value - rightResult.value, type: dominantType}
                    default:
                        throw tError.push(new Error_(tError.length, "Semantico",
                            `Tipo ${dominantType} Invalido en Operación RES`, this.line, this.column ))
                }
            case ArithmeticOp.MUL:
                dominantType = MUL[leftResult.type][rightResult.type];
                switch (dominantType) {
                    case dataType.NUMBER:
                        convertType(leftResult);
                        convertType(rightResult);
                        return {value: leftResult.value * rightResult.value, type: dominantType}
                    case dataType.DOUBLE:
                        convertType(leftResult);
                        convertType(rightResult);
                        return {value: leftResult.value * rightResult.value, type: dominantType}
                    default:
                        throw tError.push(new Error_(tError.length, "Semantico",
                                `Tipo ${dominantType} Invalido en Operación MUL`, this.line, this.column ))
                }
            case ArithmeticOp.DIV:
                dominantType = DIV[leftResult.type][rightResult.type];
                switch (dominantType) {
                    case dataType.DOUBLE:
                        convertType(leftResult);
                        convertType(rightResult);
                        if (rightResult.value == 0) throw Error("Error: Division by zero");
                        return {value: leftResult.value / rightResult.value, type: dominantType}
                    default:
                        throw tError.push(new Error_(tError.length, "Semantico",
                            `Tipo ${dominantType} Invalido en Operación DIV`, this.line, this.column ))
                }
            case ArithmeticOp.MOD:
                dominantType = MOD[leftResult.type][rightResult.type];
                switch (dominantType) {
                    case dataType.DOUBLE:
                        convertType(leftResult);
                        convertType(rightResult);
                        if (rightResult.value == 0) throw Error("Error: Division by zero");
                        return {value: leftResult.value % rightResult.value, type: dominantType}
                    default:
                        throw tError.push(new Error_(tError.length, "Semantico",
                            `Tipo ${dominantType} Invalido en Operación MOD`, this.line, this.column ))
                }
            case ArithmeticOp.POW:
                dominantType = POW[leftResult.type][rightResult.type];
                switch (dominantType) {
                    case dataType.NUMBER:
                        convertType(leftResult);
                        convertType(rightResult);
                        return {value: Math.pow(leftResult.value, rightResult.value), type: dominantType}
                    case dataType.DOUBLE:
                        convertType(leftResult);
                        convertType(rightResult);
                        return {value: Math.pow(leftResult.value, rightResult.value), type: dominantType}
                    default:
                        throw tError.push(new Error_(tError.length, "Semantico",
                            `Tipo ${dominantType} Invalido en Operación POW`, this.line, this.column ))
                }
            default:
                return {value: null, type: dataType.NULL}
        }
    }
}

function convertType(tmpResult: Result): void{
    if(tmpResult.type == dataType.BOOL) tmpResult.value = tmpResult.value? 1 : 0;
    if(tmpResult.type == dataType.CHAR) tmpResult.value = tmpResult.value.charCodeAt(0);
}


const SUM = [
    [dataType.NUMBER, dataType.DOUBLE, dataType.NUMBER, dataType.NUMBER, dataType.STRING],
    [dataType.DOUBLE, dataType.DOUBLE, dataType.DOUBLE, dataType.DOUBLE, dataType.STRING],
    [dataType.NUMBER, dataType.DOUBLE, dataType.NULL, dataType.NULL, dataType.STRING],
    [dataType.NUMBER, dataType.DOUBLE, dataType.NULL, dataType.STRING, dataType.STRING],
    [dataType.STRING, dataType.STRING, dataType.STRING, dataType.STRING, dataType.STRING]
]

const RES = [
    [dataType.NUMBER, dataType.DOUBLE, dataType.NUMBER, dataType.NUMBER, dataType.NULL],
    [dataType.DOUBLE, dataType.DOUBLE, dataType.DOUBLE, dataType.DOUBLE, dataType.NULL],
    [dataType.NUMBER, dataType.DOUBLE, dataType.NULL, dataType.NULL, dataType.NULL],
    [dataType.NUMBER, dataType.DOUBLE, dataType.NULL, dataType.NULL, dataType.NULL],
    [dataType.NULL, dataType.NULL, dataType.NULL, dataType.NULL, dataType.NULL]
]

const MUL = [
    [dataType.NUMBER, dataType.DOUBLE, dataType.NULL, dataType.NUMBER, dataType.NULL],
    [dataType.DOUBLE, dataType.DOUBLE, dataType.NULL, dataType.DOUBLE, dataType.NULL],
    [dataType.NULL, dataType.NULL, dataType.NULL, dataType.NULL, dataType.NULL],
    [dataType.NUMBER, dataType.DOUBLE, dataType.NULL, dataType.NULL, dataType.NULL],
    [dataType.NULL, dataType.NULL, dataType.NULL, dataType.NULL, dataType.NULL]
]

const DIV = [
    [dataType.DOUBLE, dataType.DOUBLE, dataType.NULL, dataType.NUMBER, dataType.NULL],
    [dataType.DOUBLE, dataType.DOUBLE, dataType.NULL, dataType.DOUBLE, dataType.NULL],
    [dataType.NULL, dataType.NULL, dataType.NULL, dataType.NULL, dataType.NULL],
    [dataType.DOUBLE, dataType.DOUBLE, dataType.NULL, dataType.NULL, dataType.NULL],
    [dataType.NULL, dataType.NULL, dataType.NULL, dataType.NULL, dataType.NULL]
]

const POW = [
    [dataType.NUMBER, dataType.DOUBLE, dataType.NULL, dataType.NULL, dataType.NULL],
    [dataType.DOUBLE, dataType.DOUBLE, dataType.NULL, dataType.NULL, dataType.NULL],
    [dataType.NULL, dataType.NULL, dataType.NULL, dataType.NULL, dataType.NULL],
    [dataType.NULL, dataType.NULL, dataType.NULL, dataType.NULL, dataType.NULL],
    [dataType.NULL, dataType.NULL, dataType.NULL, dataType.NULL, dataType.NULL]
]

const MOD = [
    [dataType.DOUBLE, dataType.DOUBLE, dataType.NULL, dataType.NULL, dataType.NULL],
    [dataType.DOUBLE, dataType.DOUBLE, dataType.NULL, dataType.NULL, dataType.NULL],
    [dataType.NULL, dataType.NULL, dataType.NULL, dataType.NULL, dataType.NULL],
    [dataType.NULL, dataType.NULL, dataType.NULL, dataType.NULL, dataType.NULL],
    [dataType.NULL, dataType.NULL, dataType.NULL, dataType.NULL, dataType.NULL]
]

const UMINUS = [dataType.NUMBER, dataType.DOUBLE, dataType.NULL, dataType.NULL, dataType.NULL]