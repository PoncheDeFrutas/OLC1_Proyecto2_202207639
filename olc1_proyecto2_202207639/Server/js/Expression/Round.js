"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Round = void 0;
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
const Counter_1 = __importDefault(require("../Symbol/Counter"));
class Round extends Expression_1.Expression {
    constructor(number, line, column) {
        super(line, column);
        this.number = number;
    }
    interpreter(environment) {
        const result = this.number.interpreter(environment);
        if (result.type == Result_1.dataType.DOUBLE || result.type == Result_1.dataType.NUMBER) {
            return { value: Math.round(result.value), type: Result_1.dataType.NUMBER };
        }
        else {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${result.type} no valio para la funcion redondeo`, this.line, this.column));
        }
    }
    /*
    * round ( exp )
    * */
    getAst(last) {
        let result = "";
        let counter = Counter_1.default.getInstance();
        let roundNodeT = `n${counter.get()}`;
        let roundNode = `n${counter.get()}`;
        let lParenNode = `n${counter.get()}`;
        let expNode = `n${counter.get()}`;
        let rParenNode = `n${counter.get()}`;
        result += `${roundNodeT}[label="Round"];\n`;
        result += `${roundNode}[label="round"];\n`;
        result += `${lParenNode}[label="("];\n`;
        result += `${expNode}[label="Expresion"];\n`;
        result += `${rParenNode}[label=")"];\n`;
        result += `${last} -> ${roundNodeT};\n`;
        result += `${roundNodeT} -> ${roundNode};\n`;
        result += `${roundNodeT} -> ${lParenNode};\n`;
        result += `${roundNodeT} -> ${expNode};\n`;
        result += this.number.getAst(expNode);
        result += `${roundNodeT} -> ${rParenNode};\n`;
        return result;
    }
}
exports.Round = Round;
