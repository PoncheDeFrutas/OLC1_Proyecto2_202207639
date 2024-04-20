"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casting = void 0;
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
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
                        throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${value.type} no casteable a int`, this.line, this.column));
                }
                break;
            case "double":
                switch (value.type) {
                    case Result_1.dataType.NUMBER:
                        result = { value: value.value.toFixed(1), type: Result_1.dataType.DOUBLE };
                        break;
                    case Result_1.dataType.DOUBLE:
                        result = { value: value.value.toFixed(1), type: Result_1.dataType.DOUBLE };
                        break;
                    case Result_1.dataType.CHAR:
                        result = { value: value.value.charCodeAt(0).toFixed(1), type: Result_1.dataType.DOUBLE };
                        break;
                    default:
                        throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${value.type} no casteable a double`, this.line, this.column));
                }
                break;
            case "char":
                if (value.type == Result_1.dataType.NUMBER) {
                    result = { value: String.fromCharCode(value.value), type: Result_1.dataType.CHAR };
                }
                else {
                    throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${value.type} no casteable a char`, this.line, this.column));
                }
                break;
            case "std::string":
                if (value.type == Result_1.dataType.NUMBER || value.type == Result_1.dataType.DOUBLE) {
                    result = { value: value.value.toString(), type: Result_1.dataType.STRING };
                }
                else {
                    throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${value.type} no casteable a string`, this.line, this.column));
                }
                break;
            default:
                throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Opción casteable no valida ${this.type}`, this.line, this.column));
        }
        return result;
    }
}
exports.Casting = Casting;
