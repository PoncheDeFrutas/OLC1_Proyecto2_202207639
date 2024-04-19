"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C_str = void 0;
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
const Primitive_1 = require("./Primitive");
class C_str extends Expression_1.Expression {
    constructor(exp, line, column) {
        super(line, column);
        this.exp = exp;
    }
    interpreter(environment) {
        const result = this.exp.interpreter(environment);
        if (result.type != Result_1.dataType.STRING) {
            throw Error("Error: Type not valid");
        }
        const array = [];
        const word = result.value;
        for (let i = 0; i < word.length; i++) {
            array.push(new Primitive_1.Primitive(result.value[i], Result_1.dataType.CHAR, this.line, this.column));
        }
        return { value: array, type: Result_1.dataType.CHAR };
    }
}
exports.C_str = C_str;
