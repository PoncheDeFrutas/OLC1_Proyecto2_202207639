"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
const Instruction_1 = require("./Instruction");
class Block extends Instruction_1.Instruction {
    constructor(instructions, line, column) {
        super(line, column);
        this.instructions = instructions;
    }
    interpreter(tConsole) {
        this.instructions.forEach(instruction => {
            instruction.interpreter(tConsole);
        });
        return null;
    }
}
exports.Block = Block;
