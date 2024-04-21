"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.C_str = void 0;
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
const Primitive_1 = require("./Primitive");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
const Counter_1 = __importDefault(require("../Symbol/Counter"));
class C_str extends Expression_1.Expression {
    constructor(exp, line, column) {
        super(line, column);
        this.exp = exp;
    }
    interpreter(environment) {
        const result = this.exp.interpreter(environment);
        if (result.type != Result_1.dataType.STRING) {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${result.type} Invalido en Operación C_str`, this.line, this.column));
        }
        const array = [];
        const word = result.value;
        for (let i = 0; i < word.length; i++) {
            array.push(new Primitive_1.Primitive(result.value[i], Result_1.dataType.CHAR, this.line, this.column));
        }
        return { value: array, type: Result_1.dataType.CHAR };
    }
    /*
    * exp . c_str ( ) ;
    * */
    getAst(last) {
        let result = "";
        let counter = Counter_1.default.getInstance();
        let c_strNodeT = `n${counter.get()}`;
        let expNode = `n${counter.get()}`;
        let dotNode = `n${counter.get()}`;
        let c_strNode = `n${counter.get()}`;
        let lParenNode = `n${counter.get()}`;
        let rParenNode = `n${counter.get()}`;
        result += `${c_strNodeT}[label="C_str"];\n`;
        result += `${expNode}[label="Expresion"];\n`;
        result += `${dotNode}[label="."];\n`;
        result += `${c_strNode}[label="c_str"];\n`;
        result += `${lParenNode}[label="("];\n`;
        result += `${rParenNode}[label=")"];\n`;
        result += `${last} -> ${c_strNodeT};\n`;
        result += `${c_strNodeT} -> ${expNode};\n`;
        result += this.exp.getAst(expNode);
        result += `${c_strNodeT} -> ${dotNode};\n`;
        result += `${c_strNodeT} -> ${c_strNode};\n`;
        result += `${c_strNodeT} -> ${lParenNode};\n`;
        result += `${c_strNodeT} -> ${rParenNode};\n`;
        return result;
    }
}
exports.C_str = C_str;
