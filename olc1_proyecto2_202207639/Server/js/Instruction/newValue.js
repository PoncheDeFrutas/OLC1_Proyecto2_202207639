"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newValue = void 0;
const Instruction_1 = require("../Abstract/Instruction");
class newValue extends Instruction_1.Instruction {
    constructor(id, value, line, column) {
        super(line, column);
        this.id = id;
        this.value = value;
    }
    interpreter(environment, tConsole) {
        const val = environment.getVariable(this.id);
        if (val == null) {
            throw new Error(`Variable ${this.id} doesn't exist`);
        }
        if (this.value != null) {
            const value = this.value.interpreter(environment);
            if (val.type != value.type) {
                throw new Error(`Type Error: ${value.type} is not assignable to ${val.type}`);
            }
            environment.editVariable(this.id, value.value, value.type);
        }
        else {
            throw new Error("Error: Value can't be null");
        }
        return null;
    }
}
exports.newValue = newValue;
