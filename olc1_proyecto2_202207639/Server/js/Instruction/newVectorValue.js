"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newVectorValue = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Result_1 = require("../Abstract/Result");
class newVectorValue extends Instruction_1.Instruction {
    constructor(id, x, y, value, line, column) {
        super(line, column);
        this.id = id;
        this.x = x;
        this.y = y;
        this.value = value;
    }
    interpreter(environment, tConsole) {
        var _a, _b;
        const vector = environment.getVectors(this.id);
        const value = this.value.interpreter(environment);
        if (vector == null) {
            throw new Error(`Vector ${this.id} doesn't exist`);
        }
        if (vector.type != value.type) {
            throw new Error(`Type Error: ${value.type} is not assignable to ${vector.type}`);
        }
        const x = this.x.interpreter(environment);
        if (this.y != null) {
            const y = this.y.interpreter(environment);
            if (x.type != Result_1.dataType.NUMBER || y.type != Result_1.dataType.NUMBER) {
                throw new Error(`Type Error: ${x.type} is not assignable to NUMBER`);
            }
            (_a = environment.getVectors(this.id)) === null || _a === void 0 ? void 0 : _a.setValue(x.value, y.value, "VectorV", vector.type, value.value, this.line, this.column);
        }
        else {
            if (x.type != Result_1.dataType.NUMBER) {
                throw new Error(`Type Error: ${x.type} is not assignable to NUMBER`);
            }
            (_b = environment.getVectors(this.id)) === null || _b === void 0 ? void 0 : _b.setValue(x.value, 0, "VectorV", vector.type, value.value, this.line, this.column);
        }
        return null;
    }
}
exports.newVectorValue = newVectorValue;
