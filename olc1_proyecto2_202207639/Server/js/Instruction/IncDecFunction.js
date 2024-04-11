"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncDecFunction = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Result_1 = require("../Abstract/Result");
class IncDecFunction extends Instruction_1.Instruction {
    constructor(id, IncDec, line, column) {
        super(line, column);
        this.id = id;
        this.IncDec = IncDec;
    }
    interpreter(environment, tConsole) {
        const value = environment.getVariable(this.id);
        if (value == null) {
            throw new Error(`Variable ${this.id} doesn't exist`);
        }
        if (value.type == Result_1.dataType.NUMBER || value.type == Result_1.dataType.DOUBLE) {
            if (this.IncDec) {
                environment.editVariable(this.id, value.value + 1, value.type);
            }
            else {
                environment.editVariable(this.id, value.value - 1, value.type);
            }
        }
        else {
            throw new Error(`Type Error: ${value.type} is not assignable to number`);
        }
        return null;
    }
}
exports.IncDecFunction = IncDecFunction;
