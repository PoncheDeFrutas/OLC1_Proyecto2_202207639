"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newVectorValue = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
class newVectorValue extends Instruction_1.Instruction {
    constructor(id, x, y, value, line, column) {
        super(line, column);
        this.id = id;
        this.x = x;
        this.y = y;
        this.value = value;
    }
    interpreter(environment) {
        var _a, _b;
        const vector = environment.getVectors(this.id);
        const value = this.value.interpreter(environment);
        if (vector == null) {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Vector ${this.id} no existe`, this.line, this.column));
        }
        if (vector.type != value.type) {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo: ${value.type} no es asignable a  ${vector.type}`, this.line, this.column));
        }
        const x = this.x.interpreter(environment);
        if (this.y != null) {
            const y = this.y.interpreter(environment);
            if (x.type != Result_1.dataType.NUMBER || y.type != Result_1.dataType.NUMBER) {
                throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${x.type} no es asignable a Number`, this.line, this.column));
            }
            (_a = environment.getVectors(this.id)) === null || _a === void 0 ? void 0 : _a.setValue(x.value, y.value, "VectorV", vector.type, value.value, this.line, this.column);
        }
        else {
            if (x.type != Result_1.dataType.NUMBER) {
                throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${x.type} no es asignable a Number`, this.line, this.column));
            }
            (_b = environment.getVectors(this.id)) === null || _b === void 0 ? void 0 : _b.setValue(x.value, 0, "VectorV", vector.type, value.value, this.line, this.column);
        }
        return null;
    }
}
exports.newVectorValue = newVectorValue;
