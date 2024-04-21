"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLowUp = void 0;
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
const Counter_1 = __importDefault(require("../Symbol/Counter"));
class toLowUp extends Expression_1.Expression {
    constructor(text, LowUp, line, column) {
        super(line, column);
        this.text = text;
        this.LowUp = LowUp;
    }
    interpreter(environment) {
        const result = this.text.interpreter(environment);
        if (result.type != Result_1.dataType.STRING) {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${result.type}, no valido para operación toLowUp`, this.line, this.column));
        }
        if (this.LowUp) {
            return { value: result.value.toLowerCase(), type: Result_1.dataType.STRING };
        }
        else {
            return { value: result.value.toUpperCase(), type: Result_1.dataType.STRING };
        }
    }
    /*
    * toLowUp ( exp )
    * */
    getAst(last) {
        let result = "";
        let counter = Counter_1.default.getInstance();
        let LowUpNodeT = `n${counter.get()}`;
        let LowUpNode = `n${counter.get()}`;
        let lParenNode = `n${counter.get()}`;
        let expNode = `n${counter.get()}`;
        let rParenNode = `n${counter.get()}`;
        if (this.LowUp) {
            result += `${LowUpNodeT}[label="toLow"];\n`;
            result += `${LowUpNode}[label="toLow"];\n`;
        }
        else {
            result += `${LowUpNodeT}[label="toUp"];\n`;
            result += `${LowUpNode}[label="toUp"];\n`;
        }
        result += `${lParenNode}[label="("];\n`;
        result += `${expNode}[label="Expresion"];\n`;
        result += `${rParenNode}[label=")"];\n`;
        result += `${last} -> ${LowUpNodeT};\n`;
        result += `${LowUpNodeT} -> ${LowUpNode};\n`;
        result += `${LowUpNodeT} -> ${lParenNode};\n`;
        result += `${LowUpNodeT} -> ${expNode};\n`;
        result += this.text.getAst(expNode);
        result += `${LowUpNodeT} -> ${rParenNode};\n`;
        return result;
    }
}
exports.toLowUp = toLowUp;
