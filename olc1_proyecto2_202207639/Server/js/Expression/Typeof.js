"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Typeof = void 0;
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
class Typeof extends Expression_1.Expression {
    constructor(exp, line, column) {
        super(line, column);
        this.exp = exp;
    }
    interpreter(environment) {
        var _a;
        const result = this.exp.interpreter(environment);
        let temporalType = Result_1.dataType.NULL;
        if (result.type == Result_1.dataType.ID) {
            temporalType = (_a = environment.getVectors(result.value)) === null || _a === void 0 ? void 0 : _a.type;
        }
        else {
            temporalType = result.type;
        }
        switch (temporalType) {
            case Result_1.dataType.NUMBER:
                return { value: "int", type: temporalType };
            case Result_1.dataType.DOUBLE:
                return { value: "double", type: temporalType };
            case Result_1.dataType.BOOL:
                return { value: "bool", type: temporalType };
            case Result_1.dataType.CHAR:
                return { value: "char", type: temporalType };
            case Result_1.dataType.STRING:
                return { value: "string", type: temporalType };
            default:
                throw Error("Error: Type not valid");
        }
    }
}
exports.Typeof = Typeof;
