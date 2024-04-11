"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaration = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Result_1 = require("../Abstract/Result");
class Declaration extends Instruction_1.Instruction {
    constructor(type, id, value, line, column) {
        super(line, column);
        this.id = id;
        this.type = type;
        this.value = value;
    }
    interpreter(environment, tConsole) {
        let dominantType;
        let auxiliaryType = Result_1.dataType.NULL;
        let defaultVal;
        switch (this.type) {
            case "int":
                dominantType = Result_1.dataType.NUMBER;
                defaultVal = Number(0);
                break;
            case "double":
                dominantType = Result_1.dataType.DOUBLE;
                auxiliaryType = Result_1.dataType.NUMBER;
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
                throw Error("Error: Type not valid");
        }
        if (this.value != null) {
            const val = this.value.interpreter(environment);
            if (dominantType != val.type && auxiliaryType != val.type) {
                throw new Error(`Type Error: ${val.type} is not assignable to ${dominantType}`);
            }
            this.id.forEach(id => {
                environment.save(id, val.value, val.type);
            });
        }
        else {
            this.id.forEach(id => {
                environment.save(id, defaultVal, dominantType);
            });
        }
        return null;
    }
}
exports.Declaration = Declaration;
