"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Length = void 0;
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
class Length extends Expression_1.Expression {
    constructor(exp, line, column) {
        super(line, column);
        this.exp = exp;
    }
    interpreter(environment) {
        const result = this.exp.interpreter(environment);
        if (result.type == Result_1.dataType.ID) {
            const vector = environment.getVectors(result.value);
            return { value: vector === null || vector === void 0 ? void 0 : vector.values.length, type: Result_1.dataType.NUMBER };
        }
        else if (result.type == Result_1.dataType.STRING) {
            return { value: result.value.length, type: Result_1.dataType.NUMBER };
        }
        else {
            throw Error("Error: Type mismatch");
        }
    }
}
exports.Length = Length;