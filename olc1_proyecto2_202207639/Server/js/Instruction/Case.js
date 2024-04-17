"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Case = void 0;
const Instruction_1 = require("../Abstract/Instruction");
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
}
exports.Case = Case;
