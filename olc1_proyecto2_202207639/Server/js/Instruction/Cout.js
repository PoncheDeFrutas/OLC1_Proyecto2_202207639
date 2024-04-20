"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cout = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
class Cout extends Instruction_1.Instruction {
    constructor(exp, jump, line, column) {
        super(line, column);
        this.exp = exp;
        this.jump = jump;
    }
    interpreter(environment) {
        const res = this.exp.interpreter(environment);
        if (res == undefined) {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Expression no valida en sentencias cout`, this.line, this.column));
        }
        if (this.jump) {
            tConsole_1.tConsole.push(res.value + "\n");
        }
        else {
            tConsole_1.tConsole.push(res.value + "");
        }
        return null;
    }
}
exports.Cout = Cout;
