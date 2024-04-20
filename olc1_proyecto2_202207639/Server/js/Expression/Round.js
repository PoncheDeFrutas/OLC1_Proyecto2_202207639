"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Round = void 0;
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
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
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${result.type} no valio para la funcion redondeo`, this.line, this.column));
        }
    }
}
exports.Round = Round;
