"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_IF = void 0;
const Result_1 = require("../../Expression/Result");
const Instruction_1 = require("../Instruction");
class FN_IF extends Instruction_1.Instruction {
    constructor(condition, blockIf, blockElse, line, column) {
        super(line, column);
        this.condition = condition;
        this.blockIf = blockIf;
        this.blockElse = blockElse;
    }
    interpreter(tConsole) {
        const condition = this.condition.interpreter();
        if (condition.type != Result_1.dataType.BOOL) {
            throw Error("Error: Type mismatch");
        }
        if (condition.value) {
            this.blockIf.interpreter(tConsole);
        }
        else if (this.blockElse != null) {
            this.blockElse.interpreter(tConsole);
        }
        return null;
    }
}
exports.FN_IF = FN_IF;
