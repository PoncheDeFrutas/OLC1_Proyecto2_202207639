"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToString = void 0;
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
const Counter_1 = __importDefault(require("../Symbol/Counter"));
class ToString extends Expression_1.Expression {
    constructor(text, line, column) {
        super(line, column);
        this.text = text;
    }
    interpreter(environment) {
        const result = this.text.interpreter(environment);
        if (result.type != Result_1.dataType.NUMBER && result.type != Result_1.dataType.DOUBLE && Result_1.dataType.BOOL) {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${result.type} no valido para operación ToString`, this.line, this.column));
        }
        return { value: result.value.toString(), type: Result_1.dataType.STRING };
    }
    /*
    * std : : to_string ( exp )
    * */
    getAst(last) {
        let result = "";
        let counter = Counter_1.default.getInstance();
        let toStringNodeT = `n${counter.get()}`;
        let toStringNode = `n${counter.get()}`;
        let lParenNode = `n${counter.get()}`;
        let expNode = `n${counter.get()}`;
        let rParenNode = `n${counter.get()}`;
        result += `${toStringNodeT}[label="ToString"];\n`;
        result += `${toStringNode}[label="to_string"];\n`;
        result += `${lParenNode}[label="("];\n`;
        result += `${expNode}[label="Expresion"];\n`;
        result += `${rParenNode}[label=")"];\n`;
        result += `${last} -> ${toStringNodeT};\n`;
        result += `${toStringNodeT} -> ${toStringNode};\n`;
        result += `${toStringNodeT} -> ${lParenNode};\n`;
        result += `${toStringNodeT} -> ${expNode};\n`;
        result += this.text.getAst(expNode);
        result += `${toStringNodeT} -> ${rParenNode};\n`;
        return result;
    }
}
exports.ToString = ToString;
