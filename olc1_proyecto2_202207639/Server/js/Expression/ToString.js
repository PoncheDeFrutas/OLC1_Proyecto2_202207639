"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToString = void 0;
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
class ToString extends Expression_1.Expression {
    constructor(text, line, column) {
        super(line, column);
        this.text = text;
    }
    interpreter(environment) {
        const result = this.text.interpreter(environment);
        if (result.type != Result_1.dataType.NUMBER && result.type != Result_1.dataType.DOUBLE && Result_1.dataType.BOOL) {
            throw Error("Error: Type mismatch");
        }
        return { value: result.value.toString(), type: Result_1.dataType.STRING };
    }
}
exports.ToString = ToString;
