"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdValue = void 0;
const Expression_1 = require("../Abstract/Expression");
class IdValue extends Expression_1.Expression {
    constructor(id, line, column) {
        super(line, column);
        this.id = id;
    }
    interpreter(environment) {
        const value = environment.getVariable(this.id);
        if (value == null) {
            throw new Error(`Variable ${this.id} doesn't exist`);
        }
        return { value: value.value, type: value.type };
    }
}
exports.IdValue = IdValue;
