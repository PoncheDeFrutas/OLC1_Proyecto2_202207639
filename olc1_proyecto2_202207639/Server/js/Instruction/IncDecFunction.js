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
        var _a, _b, _c, _d;
        const value = environment.getVariable(this.id);
        if (value == null) {
            throw new Error(`Variable ${this.id} doesn't exist`);
        }
        if (value.type == Result_1.dataType.NUMBER || value.type == Result_1.dataType.DOUBLE) {
            if (this.IncDec) {
                environment.editVariable(this.id, value.value + 1, value.type, (_a = environment.getVariable(this.id)) === null || _a === void 0 ? void 0 : _a.line, (_b = environment.getVariable(this.id)) === null || _b === void 0 ? void 0 : _b.column);
            }
            else {
                environment.editVariable(this.id, value.value - 1, value.type, (_c = environment.getVariable(this.id)) === null || _c === void 0 ? void 0 : _c.line, (_d = environment.getVariable(this.id)) === null || _d === void 0 ? void 0 : _d.column);
            }
        }
        else {
            throw new Error(`Type Error: ${value.type} is not assignable to Inc Dec`);
        }
        return null;
    }
}
exports.IncDecFunction = IncDecFunction;
