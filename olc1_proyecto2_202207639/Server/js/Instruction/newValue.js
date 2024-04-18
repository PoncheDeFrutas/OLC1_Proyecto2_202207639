"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newValue = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Result_1 = require("../Abstract/Result");
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
                throw new Error(`Variable ${this.id} doesn't exist`);
            }
            else {
                if (this.value != null) {
                    const value = this.value.interpreter(environment);
                    if (value.type != Result_1.dataType.ID) {
                        throw new Error(`Type Error: ${value.type} is not assignable to ${Result_1.dataType.ID}`);
                    }
                    else {
                        const vector2 = environment.getVectors(value.value);
                        if (vector2 == null) {
                            throw new Error(`Vector ${value.value} doesn't exist`);
                        }
                        else {
                            if (vector.values.length != vector2.values.length || vector.values[0].length != vector2.values[0].length) {
                                throw new Error("Error: The vectors have different dimensions");
                            }
                            else {
                                (_a = environment.getVectors(this.id)) === null || _a === void 0 ? void 0 : _a.setVector(vector2.values);
                            }
                        }
                    }
                }
                else {
                    throw new Error("Error: Value can't be null");
                }
            }
        }
        else {
            if (this.value != null) {
                const value = this.value.interpreter(environment);
                if (val.type != value.type) {
                    throw new Error(`Type Error: ${value.type} is not assignable to ${val.type}`);
                }
                environment.editVariable(this.id, value.value, value.type, val.line, val.column);
            }
            else {
                throw new Error("Error: Value can't be null");
            }
        }
        return null;
    }
}
exports.newValue = newValue;
