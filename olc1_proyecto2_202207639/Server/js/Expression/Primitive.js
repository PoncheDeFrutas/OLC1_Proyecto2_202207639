"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primitive = void 0;
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
class Primitive extends Expression_1.Expression {
    constructor(exp, type, line, column) {
        super(line, column);
        this.exp = exp;
        this.type = type;
    }
    interpreter() {
        switch (this.type) {
            case Result_1.dataType.NUMBER:
                return { value: Number(this.exp), type: Result_1.dataType.NUMBER };
            case Result_1.dataType.DOUBLE:
                return { value: Number(this.exp), type: Result_1.dataType.DOUBLE };
            case Result_1.dataType.BOOL:
                return { value: this.exp == "true", type: Result_1.dataType.BOOL };
            case Result_1.dataType.STRING:
                return { value: this.exp.toString(), type: Result_1.dataType.STRING };
            case Result_1.dataType.CHAR:
                return { value: this.exp, type: Result_1.dataType.CHAR };
            default:
                return { value: null, type: Result_1.dataType.NULL };
        }
    }
}
exports.Primitive = Primitive;
