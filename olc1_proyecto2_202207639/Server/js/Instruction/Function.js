"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Function = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
class Function extends Instruction_1.Instruction {
    constructor(stype, id, parameters, block, line, column) {
        super(line, column);
        this.type = Result_1.dataType.NULL;
        this.id = id;
        this.parameters = parameters;
        this.block = block;
        this.stype = stype;
    }
    interpreter(environment) {
        let dominantType;
        switch (this.stype) {
            case "int":
                dominantType = Result_1.dataType.NUMBER;
                break;
            case "double":
                dominantType = Result_1.dataType.DOUBLE;
                break;
            case "bool":
                dominantType = Result_1.dataType.BOOL;
                break;
            case "char":
                dominantType = Result_1.dataType.CHAR;
                break;
            case "std::string":
                dominantType = Result_1.dataType.STRING;
                break;
            case "void":
                dominantType = Result_1.dataType.NULL;
                break;
            default:
                throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${this.type}, no permitivo para la declaración de funciones`, this.line, this.column));
        }
        this.type = dominantType;
        environment.saveFunction(this.id, this);
    }
}
exports.Function = Function;
