"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Return = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Result_1 = require("../Abstract/Result");
const Counter_1 = __importDefault(require("../Symbol/Counter"));
class Return extends Instruction_1.Instruction {
    constructor(exp, line, column) {
        super(line, column);
        this.exp = exp;
    }
    interpreter(environment) {
        if (this.exp != null) {
            const value = this.exp.interpreter(environment);
            return { line: this.line, column: this.column, typeValue: "return", value: value.value, type: value.type };
        }
        else {
            return { line: this.line, column: this.column, typeValue: "return", value: null, type: Result_1.dataType.NULL };
        }
    }
    /*
    * return (exp | ) ;
    * */
    getAst(last) {
        let result = "";
        let counter = Counter_1.default.getInstance();
        let returnNodeT = `n${counter.get()}`;
        let returnNode = `n${counter.get()}`;
        result += `${returnNodeT}[label="I_Return"];\n`;
        result += `${returnNode}[label="return"];\n`;
        result += `${last} -> ${returnNodeT};\n`;
        result += `${returnNodeT} -> ${returnNode};\n`;
        if (this.exp != null) {
            let expNode = `n${counter.get()}`;
            result += `${expNode}[label="Expresion"];\n`;
            result += `${returnNodeT} -> ${expNode};\n`;
            result += this.exp.getAst(expNode);
        }
        let semicolonNode = `n${counter.get()}`;
        result += `${semicolonNode}[label=";"];\n`;
        result += `${returnNodeT} -> ${semicolonNode};\n`;
        return result;
    }
}
exports.Return = Return;
