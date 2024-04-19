"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Return = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Result_1 = require("../Abstract/Result");
class Return extends Instruction_1.Instruction {
    constructor(exp, line, column) {
        super(line, column);
        this.exp = exp;
    }
    interpreter(environment) {
        if (this.exp != null) {
            const value = this.exp.interpreter(environment);
            return { line: this.line, column: this.column, typeValue: "return", value: value.value, type: value.type };
        }
        else {
            return { line: this.line, column: this.column, typeValue: "return", value: null, type: Result_1.dataType.NULL };
        }
    }
}
exports.Return = Return;
