"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncDecFunction = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
class IncDecFunction extends Instruction_1.Instruction {
    constructor(id, IncDec, line, column) {
        super(line, column);
        this.id = id;
        this.IncDec = IncDec;
    }
    interpreter(environment) {
        var _a, _b, _c, _d;
        const value = environment.getVariable(this.id);
        if (value == null) {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `La variable ${this.id} no existe`, this.line, this.column));
        }
        if (value.type == Result_1.dataType.NUMBER || value.type == Result_1.dataType.DOUBLE) {
            if (this.IncDec) {
                environment.editVariable(this.id, value.value + 1, value.type, (_a = environment.getVariable(this.id)) === null || _a === void 0 ? void 0 : _a.line, (_b = environment.getVariable(this.id)) === null || _b === void 0 ? void 0 : _b.column);
                return { value: value.value + 1, type: value.type };
            }
            else {
                environment.editVariable(this.id, value.value - 1, value.type, (_c = environment.getVariable(this.id)) === null || _c === void 0 ? void 0 : _c.line, (_d = environment.getVariable(this.id)) === null || _d === void 0 ? void 0 : _d.column);
                return { value: value.value - 1, type: value.type };
            }
        }
        else {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `La variable ${this.id} no es asignable a incremento o decremento`, this.line, this.column));
        }
    }
}
exports.IncDecFunction = IncDecFunction;
