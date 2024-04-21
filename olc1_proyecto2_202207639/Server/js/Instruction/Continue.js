"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Continue = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Counter_1 = __importDefault(require("../Symbol/Counter"));
class Continue extends Instruction_1.Instruction {
    constructor(line, column) {
        super(line, column);
    }
    interpreter(environment) {
        return { line: this.line, column: this.column, type: 'continue' };
    }
    /*
    * continue ;
    */
    getAst(last) {
        let result = "";
        let counter = Counter_1.default.getInstance();
        let continueNodeT = `n${counter.get()}`;
        let continueNode = `n${counter.get()}`;
        let semicolonNode = `n${counter.get()}`;
        result += `${continueNodeT}[label="I_continue"];\n`;
        result += `${continueNode}[label="continue"];\n`;
        result += `${semicolonNode}[label=";"];\n`;
        result += `${last} -> ${continueNodeT};\n`;
        result += `${continueNodeT} -> ${continueNode};\n`;
        result += `${continueNodeT} -> ${semicolonNode};\n`;
        return result;
    }
}
exports.Continue = Continue;
