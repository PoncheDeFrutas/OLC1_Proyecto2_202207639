"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ternary = void 0;
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
class Ternary extends Expression_1.Expression {
    constructor(condition, blockIf, blockElse, line, column) {
        super(line, column);
        this.condition = condition;
        this.blockIf = blockIf;
        this.blockElse = blockElse;
    }
    interpreter(environment) {
        const condition = this.condition.interpreter(environment);
        if (condition.type != Result_1.dataType.BOOL) {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Condición no booleana en operador ternario`, this.line, this.column));
        }
        if (condition.value) {
            return this.blockIf.interpreter(environment);
        }
        else {
            return this.blockElse.interpreter(environment);
        }
    }
}
exports.Ternary = Ternary;
