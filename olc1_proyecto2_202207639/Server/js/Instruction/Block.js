"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
const Environment_1 = require("../Symbol/Environment");
const Instruction_1 = require("../Abstract/Instruction");
class Block extends Instruction_1.Instruction {
    constructor(instructions, line, column) {
        super(line, column);
        this.instructions = instructions;
    }
    interpreter(environment, tConsole) {
        const newEnv = new Environment_1.Environment(environment);
        this.instructions.forEach(instruction => {
            try {
                const element = instruction.interpreter(newEnv, tConsole);
                if (element != null || element != undefined) {
                    return element;
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.Block = Block;
