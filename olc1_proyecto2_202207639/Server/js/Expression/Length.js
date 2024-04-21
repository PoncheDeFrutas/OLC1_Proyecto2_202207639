"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Length = void 0;
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
const Counter_1 = __importDefault(require("../Symbol/Counter"));
class Length extends Expression_1.Expression {
    constructor(exp, line, column) {
        super(line, column);
        this.exp = exp;
    }
    interpreter(environment) {
        const result = this.exp.interpreter(environment);
        if (result.type == Result_1.dataType.ID) {
            const vector = environment.getVectors(result.value);
            return { value: vector === null || vector === void 0 ? void 0 : vector.values.length, type: Result_1.dataType.NUMBER };
        }
        else if (result.type == Result_1.dataType.STRING) {
            return { value: result.value.length, type: Result_1.dataType.NUMBER };
        }
        else {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Expresión no valida para comando length`, this.line, this.column));
        }
    }
    /*
    * exp . length ( ) ;
    * */
    getAst(last) {
        let result = "";
        let counter = Counter_1.default.getInstance();
        let lengthNodeT = `n${counter.get()}`;
        let expNode = `n${counter.get()}`;
        let dotNode = `n${counter.get()}`;
        let lengthNode = `n${counter.get()}`;
        let lParenNode = `n${counter.get()}`;
        let rParenNode = `n${counter.get()}`;
        let semiColonNode = `n${counter.get()}`;
        result += `${lengthNodeT}[label="Length"];\n`;
        result += `${expNode}[label="Expresion"];\n`;
        result += `${dotNode}[label="."];\n`;
        result += `${lengthNode}[label="length"];\n`;
        result += `${lParenNode}[label="("];\n`;
        result += `${rParenNode}[label=")"];\n`;
        result += `${semiColonNode}[label=";"];\n`;
        result += `${last} -> ${lengthNodeT};\n`;
        result += `${lengthNodeT} -> ${expNode};\n`;
        result += this.exp.getAst(expNode);
        result += `${lengthNodeT} -> ${dotNode};\n`;
        result += `${lengthNodeT} -> ${lengthNode};\n`;
        result += `${lengthNodeT} -> ${lParenNode};\n`;
        result += `${lengthNodeT} -> ${rParenNode};\n`;
        result += `${lengthNodeT} -> ${semiColonNode};\n`;
        return result;
    }
}
exports.Length = Length;
