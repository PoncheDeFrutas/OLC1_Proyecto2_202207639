"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
class execute extends Instruction_1.Instruction {
    constructor(Function, line, column) {
        super(line, column);
        this.Function = Function;
    }
    interpreter(environment) {
        if (environment.getFunction(this.Function.id) == null) {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `La función ${this.Function.id} no existe D:`, this.line, this.column));
        }
        else {
            const result = this.Function.interpreter(environment);
            if (result != null) {
                return { value: result.value, type: result.type };
            }
            else {
                return { value: null, type: Result_1.dataType.NULL };
            }
        }
    }
}
exports.execute = execute;
