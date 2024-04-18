"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Return = void 0;
const Instruction_1 = require("../Abstract/Instruction");
class Return extends Instruction_1.Instruction {
    constructor(exp, line, column) {
        super(line, column);
        this.exp = exp;
    }
    interpreter(environment) {
        const value = this.exp.interpreter(environment);
        return { line: this.line, column: this.column, typeValue: "return", value: value.value, type: value.type };
    }
}
exports.Return = Return;
