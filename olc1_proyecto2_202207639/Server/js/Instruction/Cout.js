"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cout = void 0;
const Result_1 = require("../Abstract/Result");
const Instruction_1 = require("../Abstract/Instruction");
class Cout extends Instruction_1.Instruction {
    constructor(exp, jump, line, column) {
        super(line, column);
        this.exp = exp;
        this.jump = jump;
    }
    interpreter(environment, tConsole) {
        const res = this.exp.interpreter(environment);
        if (res.type == Result_1.dataType.BOOL) {
            res.value = res.value ? "true" : "false";
        }
        if (this.jump) {
            tConsole.push(res.value + "\n");
        }
        else {
            tConsole.push(res.value + "");
        }
        return null;
    }
}
exports.Cout = Cout;
