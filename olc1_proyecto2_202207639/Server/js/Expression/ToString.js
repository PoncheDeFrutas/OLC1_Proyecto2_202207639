"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToString = void 0;
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
class ToString extends Expression_1.Expression {
    constructor(text, line, column) {
        super(line, column);
        this.text = text;
    }
    interpreter(environment) {
        const result = this.text.interpreter(environment);
        if (result.type != Result_1.dataType.NUMBER && result.type != Result_1.dataType.DOUBLE && Result_1.dataType.BOOL) {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${result.type} no valido para operación ToString`, this.line, this.column));
        }
        return { value: result.value.toString(), type: Result_1.dataType.STRING };
    }
}
exports.ToString = ToString;
