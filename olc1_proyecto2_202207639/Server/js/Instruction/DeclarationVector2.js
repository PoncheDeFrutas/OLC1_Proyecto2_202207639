"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeclarationVector = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Result_1 = require("../Abstract/Result");
class DeclarationVector extends Instruction_1.Instruction {
    constructor(type, id, values, simple, line, column) {
        super(line, column);
        this.type = type;
        this.id = id;
        this.values = values;
        this.simple = simple;
    }
    interpreter(environment, tConsole) {
        let dominantType;
        switch (this.type) {
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
            default:
                throw Error("Error: Type not valid");
        }
    }
}
exports.DeclarationVector = DeclarationVector;
