"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaration = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
class Declaration extends Instruction_1.Instruction {
    constructor(type, id, value, line, column) {
        super(line, column);
        this.id = id;
        this.type = type;
        this.value = value;
    }
    interpreter(environment) {
        let dominantType;
        let defaultVal;
        switch (this.type) {
            case "int":
                dominantType = Result_1.dataType.NUMBER;
                defaultVal = Number(0);
                break;
            case "double":
                dominantType = Result_1.dataType.DOUBLE;
                defaultVal = Number(0.0);
                break;
            case "bool":
                dominantType = Result_1.dataType.BOOL;
                defaultVal = true;
                break;
            case "char":
                dominantType = Result_1.dataType.CHAR;
                defaultVal = '0';
                break;
            case "std::string":
                dominantType = Result_1.dataType.STRING;
                defaultVal = "";
                break;
            default:
                throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${this.type}, no permitivo para la declaración de variables`, this.line, this.column));
        }
        if (this.value != null) {
            const val = this.value.interpreter(environment);
            if (dominantType != val.type) {
                throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${val.type} no asignable a ${dominantType}`, this.line, this.column));
            }
            this.id.forEach(id => {
                environment.save(id, val.value, val.type, this.line, this.column);
            });
        }
        else {
            this.id.forEach(id => {
                environment.save(id, defaultVal, dominantType, this.line, this.column);
            });
        }
    }
}
exports.Declaration = Declaration;
