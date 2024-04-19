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
}
exports.Block = Block;
