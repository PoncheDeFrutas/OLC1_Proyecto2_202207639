"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logical = void 0;
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
const Counter_1 = __importDefault(require("../Symbol/Counter"));
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
                throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Operador logico no valido ${this.op}`, this.line, this.column));
        }
        return { value: null, type: Result_1.dataType.NULL };
    }
    /*
    * exp op exp
    * */
    getAst(last) {
        let result = "";
        let counter = Counter_1.default.getInstance();
        let logicalNodeT = `n${counter.get()}`;
        let logicalNode = `n${counter.get()}`;
        let exp1Node = `n${counter.get()}`;
        let opNode = `n${counter.get()}`;
        let exp2Node = `n${counter.get()}`;
        result += `${logicalNodeT}[label="Logical"];\n`;
        result += `${logicalNode}[label="${this.op}"];\n`;
        result += `${exp1Node}[label="Expresion"];\n`;
        result += `${opNode}[label="${(0, Result_1.getLogicalOpName)(this.op)}"];\n`;
        result += `${exp2Node}[label="Expresion"];\n`;
        result += `${last} -> ${logicalNodeT};\n`;
        result += `${logicalNodeT} -> ${exp1Node};\n`;
        result += this.left.getAst(exp1Node);
        result += `${logicalNodeT} -> ${opNode};\n`;
        result += `${logicalNodeT} -> ${exp2Node};\n`;
        result += this.right.getAst(exp2Node);
        return result;
    }
}
exports.Logical = Logical;
