"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorValue = void 0;
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
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
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${x.type} no valido para obtener valor de vector`, this.line, this.column));
        }
        let y;
        if (this.y != null) {
            y = this.y.interpreter(environment).value;
        }
        else {
            y = 0;
        }
        if (vector == null) {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Vector ${this.id} no existe`, this.line, this.column));
        }
        return { value: vector.getValue(x.value, y).value, type: vector.type };
    }
}
exports.VectorValue = VectorValue;
