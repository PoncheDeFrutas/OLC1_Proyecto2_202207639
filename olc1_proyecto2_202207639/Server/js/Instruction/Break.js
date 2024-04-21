"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Break = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Counter_1 = __importDefault(require("../Symbol/Counter"));
class Break extends Instruction_1.Instruction {
    constructor(line, column) {
        super(line, column);
    }
    interpreter(environment) {
        return { line: this.line, column: this.column, type: 'break' };
    }
    /*
    * break semicolon
    */
    getAst(last) {
        let result = "";
        let counter = Counter_1.default.getInstance();
        let breakNodeT = `n${counter.get()}`;
        let breakNode = `n${counter.get()}`;
        let semicolonNode = `n${counter.get()}`;
        result += `${breakNodeT}[label="I_break"];\n`;
        result += `${breakNode}[label="break"];\n`;
        result += `${semicolonNode}[label=";"];\n`;
        result += `${last} -> ${breakNodeT};\n`;
        result += `${breakNodeT} -> ${breakNode};\n`;
        result += `${breakNodeT} -> ${semicolonNode};\n`;
        return result;
    }
}
exports.Break = Break;
