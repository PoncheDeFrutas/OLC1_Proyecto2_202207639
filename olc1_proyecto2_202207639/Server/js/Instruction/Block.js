"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
const Environment_1 = require("../Symbol/Environment");
const Instruction_1 = require("../Abstract/Instruction");
const Counter_1 = __importDefault(require("../Symbol/Counter"));
class Block extends Instruction_1.Instruction {
    constructor(instructions, line, column) {
        super(line, column);
        this.instructions = instructions;
    }
    interpreter(environment) {
        const newEnv = new Environment_1.Environment(environment);
        for (const instruction of this.instructions) {
            try {
                const element = instruction.interpreter(newEnv);
                if (element != null || element != undefined) {
                    if (element.type == 'continue') {
                        continue;
                    }
                    return element;
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        return null;
    }
    /*
    * lbracket instructions rbracket
    * lbracket rbracket
    */
    getAst(last) {
        let result = "";
        let counter = Counter_1.default.getInstance();
        let lbracket = `n${counter.get()}`;
        result += `${lbracket}[label="{"];\n`;
        result += `${last} -> ${lbracket};\n`;
        for (const instruction of this.instructions) {
            result += instruction.getAst(last);
        }
        let rbracket = `n${counter.get()}`;
        result += `${rbracket}[label="}"];\n`;
        result += `${last} -> ${rbracket};\n`;
        return result;
    }
}
exports.Block = Block;
