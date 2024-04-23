"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Case = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Counter_1 = __importDefault(require("../Symbol/Counter"));
class Case extends Instruction_1.Instruction {
    constructor(condition, instructions, line, column) {
        super(line, column);
        this.condition = condition;
        this.instructions = instructions;
    }
    interpreter(environment) {
        for (const instruction of this.instructions) {
            try {
                const element = instruction.interpreter(environment);
                if (element != null || element != undefined) {
                    return element;
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    /*
      case exp : instructions
    * */
    getAst(last) {
        let result = "";
        let counter = Counter_1.default.getInstance();
        let caseNodeT = `n${counter.get()}`;
        let caseNode = `n${counter.get()}`;
        let expNode = `n${counter.get()}`;
        let colonNode = `n${counter.get()}`;
        let instructionsNode = `n${counter.get()}`;
        result += `${caseNodeT}[label="I_case"];\n`;
        result += `${caseNode}[label="case"];\n`;
        result += `${expNode}[label="exp"];\n`;
        result += `${colonNode}[label=":"];\n`;
        result += `${instructionsNode}[label="instructions"];\n`;
        result += `${last} -> ${caseNodeT};\n`;
        result += `${caseNodeT} -> ${caseNode};\n`;
        result += `${caseNodeT} -> ${expNode};\n`;
        result += this.condition.getAst(expNode);
        result += `${caseNodeT} -> ${colonNode};\n`;
        result += `${caseNodeT} -> ${instructionsNode};\n`;
        for (const instruction of this.instructions) {
            result += instruction.getAst(instructionsNode);
        }
        return result;
    }
}
exports.Case = Case;
