"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newValue = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
class newValue extends Instruction_1.Instruction {
    constructor(id, value, line, column) {
        super(line, column);
        this.id = id;
        this.value = value;
    }
    interpreter(environment) {
        var _a;
        const val = environment.getVariable(this.id);
        if (val == null) {
            const vector = environment.getVectors(this.id);
            if (vector == null) {
                throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `La variable ${this.id} no existe`, this.line, this.column));
            }
            else {
                if (this.value != null) {
                    const value = this.value.interpreter(environment);
                    if (value.type != Result_1.dataType.ID) {
                        throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${value.type} no es asignable a ${Result_1.dataType.ID}`, this.line, this.column));
                    }
                    else {
                        const vector2 = environment.getVectors(value.value);
                        if (vector2 == null) {
                            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Vector ${value.value} no existe`, this.line, this.column));
                        }
                        else {
                            if (vector.values.length != vector2.values.length || vector.values[0].length != vector2.values[0].length) {
                                throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Vector ${vector2.id} no tiene las mismas dimensiones que ${vector.id}`, this.line, this.column));
                            }
                            else {
                                (_a = environment.getVectors(this.id)) === null || _a === void 0 ? void 0 : _a.setVector(vector2.values);
                            }
                        }
                    }
                }
                else {
                    throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `El valor de asignación no puede ser nulo`, this.line, this.column));
                }
            }
        }
        else {
            if (this.value != null) {
                const value = this.value.interpreter(environment);
                if (val.type != value.type) {
                    throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${value.type} no es asignable a ${val.type}`, this.line, this.column));
                }
                environment.editVariable(this.id, value.value, value.type, val.line, val.column);
            }
            else {
                throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `El valor de asignación no puede ser nulo`, this.line, this.column));
            }
        }
        return null;
    }
}
exports.newValue = newValue;
