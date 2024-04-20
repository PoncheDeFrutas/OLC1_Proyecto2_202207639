"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLowUp = void 0;
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
class toLowUp extends Expression_1.Expression {
    constructor(text, LowUp, line, column) {
        super(line, column);
        this.text = text;
        this.LowUp = LowUp;
    }
    interpreter(environment) {
        const result = this.text.interpreter(environment);
        if (result.type != Result_1.dataType.STRING) {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${result.type}, no valido para operación toLowUp`, this.line, this.column));
        }
        if (this.LowUp) {
            return { value: result.value.toLowerCase(), type: Result_1.dataType.STRING };
        }
        else {
            return { value: result.value.toUpperCase(), type: Result_1.dataType.STRING };
        }
    }
}
exports.toLowUp = toLowUp;
