"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
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
                            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${element.type} no es valido en [Default] code`, this.line, this.column));
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
