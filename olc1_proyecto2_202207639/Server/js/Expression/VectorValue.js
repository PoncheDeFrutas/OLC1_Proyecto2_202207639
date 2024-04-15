"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorValue = void 0;
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
class VectorValue extends Expression_1.Expression {
    constructor(id, x, y, line, column) {
        super(line, column);
        this.id = id;
        this.x = x;
        this.y = y;
    }
    interpreter(environment) {
        const vector = environment.getVectors(this.id);
        const x = this.x.interpreter(environment);
        if (x.type != Result_1.dataType.NUMBER) {
            throw new Error(`Type Error: ${x.type} is not assignable to NUMBER`);
        }
        let y;
        if (this.y != null) {
            y = this.y.interpreter(environment).value;
        }
        else {
            y = 0;
        }
        if (vector == null) {
            throw new Error(`Vector ${this.id} doesn't exist`);
        }
        return { value: vector.getValue(x.value, y).value, type: vector.type };
    }
}
exports.VectorValue = VectorValue;
