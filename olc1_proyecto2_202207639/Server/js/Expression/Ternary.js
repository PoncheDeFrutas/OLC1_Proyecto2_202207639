"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ternary = void 0;
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
const Counter_1 = __importDefault(require("../Symbol/Counter"));
class Ternary extends Expression_1.Expression {
    constructor(condition, blockIf, blockElse, line, column) {
        super(line, column);
        this.condition = condition;
        this.blockIf = blockIf;
        this.blockElse = blockElse;
    }
    interpreter(environment) {
        const condition = this.condition.interpreter(environment);
        if (condition.type != Result_1.dataType.BOOL) {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Condición no booleana en operador ternario`, this.line, this.column));
        }
        if (condition.value) {
            return this.blockIf.interpreter(environment);
        }
        else {
            return this.blockElse.interpreter(environment);
        }
    }
    /*
    * exp ? exp : exp
    * */
    getAst(last) {
        let result = "";
        let counter = Counter_1.default.getInstance();
        let ternaryNodeT = `n${counter.get()}`;
        let exp1Node = `n${counter.get()}`;
        let ternaryNode = `n${counter.get()}`;
        let exp2Node = `n${counter.get()}`;
        let colonNode = `n${counter.get()}`;
        let exp3Node = `n${counter.get()}`;
        result += `${ternaryNodeT}[label="Ternary"];\n`;
        result += `${exp1Node}[label="Condicion"];\n`;
        result += `${ternaryNode}[label="?"];\n`;
        result += `${exp2Node}[label="Bloque If"];\n`;
        result += `${colonNode}[label=":"];\n`;
        result += `${exp3Node}[label="Bloque Else"];\n`;
        result += `${last} -> ${ternaryNodeT};\n`;
        result += `${ternaryNodeT} -> ${exp1Node};\n`;
        result += this.condition.getAst(exp1Node);
        result += `${ternaryNodeT} -> ${ternaryNode};\n`;
        result += `${ternaryNodeT} -> ${exp2Node};\n`;
        result += this.blockIf.getAst(exp2Node);
        result += `${ternaryNodeT} -> ${colonNode};\n`;
        result += `${ternaryNodeT} -> ${exp3Node};\n`;
        result += this.blockElse.getAst(exp3Node);
        return result;
    }
}
exports.Ternary = Ternary;
