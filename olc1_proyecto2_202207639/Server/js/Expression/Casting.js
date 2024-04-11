"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casting = void 0;
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
class Casting extends Expression_1.Expression {
    constructor(type, value, line, column) {
        super(line, column);
        this.type = type;
        this.value = value;
    }
    interpreter(environment) {
        const value = this.value.interpreter(environment);
        let result;
        switch (this.type) {
            case "int":
                switch (value.type) {
                    case Result_1.dataType.NUMBER:
                        result = { value: value.value, type: Result_1.dataType.NUMBER };
                        break;
                    case Result_1.dataType.DOUBLE:
                        result = { value: Math.floor(value.value), type: Result_1.dataType.NUMBER };
                        break;
                    case Result_1.dataType.CHAR:
                        result = { value: value.value.charCodeAt(0), type: Result_1.dataType.NUMBER };
                        break;
                    default:
                        throw Error("Error: Type mismatch");
                }
                break;
            case "double":
                switch (value.type) {
                    case Result_1.dataType.NUMBER:
                        result = { value: value.value + 0.0, type: Result_1.dataType.DOUBLE };
                        break;
                    case Result_1.dataType.DOUBLE:
                        result = { value: value.value, type: Result_1.dataType.DOUBLE };
                        break;
                    case Result_1.dataType.CHAR:
                        result = { value: value.value.charCodeAt(0) + 0.0, type: Result_1.dataType.DOUBLE };
                        break;
                    default:
                        throw Error("Error: Type mismatch");
                }
                break;
            case "char":
                if (value.type == Result_1.dataType.NUMBER) {
                    result = { value: String.fromCharCode(value.value), type: Result_1.dataType.CHAR };
                }
                else {
                    throw new Error("Error: Type mismatch");
                }
                break;
            case "string":
                if (value.type == Result_1.dataType.NUMBER || value.type == Result_1.dataType.DOUBLE) {
                    result = { value: value.value.toString(), type: Result_1.dataType.STRING };
                }
                else {
                    throw new Error("Error: Type mismatch");
                }
                break;
            default:
                throw new Error("Error: Type not valid");
        }
        return result;
    }
}
exports.Casting = Casting;
