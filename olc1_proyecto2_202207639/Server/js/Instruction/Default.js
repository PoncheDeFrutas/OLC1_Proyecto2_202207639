"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const Instruction_1 = require("../Abstract/Instruction");
class Default extends Instruction_1.Instruction {
    constructor(instructions, line, column) {
        super(line, column);
        this.instructions = instructions;
    }
    interpreter(environment) {
        for (const instruction of this.instructions) {
            try {
                const element = instruction.interpreter(environment);
                if (element != null || element != undefined) {
                    if (element != null || element != undefined) {
                        if (element.type == 'break') {
                            break;
                        }
                        else if (element.typeValue == 'return') {
                            return element;
                        }
                        else {
                            throw Error(`Error: Type [${element.type}] is not valid for [Default] code`);
                        }
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }
}
exports.Default = Default;
