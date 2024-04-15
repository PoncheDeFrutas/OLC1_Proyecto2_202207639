"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Round = void 0;
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
class Round extends Expression_1.Expression {
    constructor(number, line, column) {
        super(line, column);
        this.number = number;
    }
    interpreter(environment) {
        const result = this.number.interpreter(environment);
        if (result.type == Result_1.dataType.DOUBLE || result.type == Result_1.dataType.NUMBER) {
            return { value: Math.round(result.value), type: Result_1.dataType.NUMBER };
        }
        else {
            throw Error("Error: Type mismatch");
        }
    }
}
exports.Round = Round;
