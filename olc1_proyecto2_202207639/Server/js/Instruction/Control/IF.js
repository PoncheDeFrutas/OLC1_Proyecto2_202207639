"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_IF = void 0;
const Result_1 = require("../../Abstract/Result");
const Instruction_1 = require("../../Abstract/Instruction");
const tConsole_1 = require("../../tConsole");
const Error_1 = require("../../Error");
class FN_IF extends Instruction_1.Instruction {
    constructor(condition, blockIf, blockElse, line, column) {
        super(line, column);
        this.condition = condition;
        this.blockIf = blockIf;
        this.blockElse = blockElse;
    }
    interpreter(environment) {
        const condition = this.condition.interpreter(environment);
        if (condition.type != Result_1.dataType.BOOL) {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Condición no booleana en sentencia if`, this.line, this.column));
        }
        if (condition.value) {
            return this.blockIf.interpreter(environment);
        }
        else if (this.blockElse != null) {
            return this.blockElse.interpreter(environment);
        }
        return null;
    }
    getAst(last) {
        return "";
    }
}
exports.FN_IF = FN_IF;
