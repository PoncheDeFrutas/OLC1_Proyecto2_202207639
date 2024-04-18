"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cout = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const tConsole_1 = require("../tConsole");
class Cout extends Instruction_1.Instruction {
    constructor(exp, jump, line, column) {
        super(line, column);
        this.exp = exp;
        this.jump = jump;
    }
    interpreter(environment) {
        const res = this.exp.interpreter(environment);
        if (res == undefined) {
            throw new Error("Error en Cout");
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
