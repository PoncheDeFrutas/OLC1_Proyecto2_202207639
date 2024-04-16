"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeclarationVector = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Result_1 = require("../Abstract/Result");
class DeclarationVector extends Instruction_1.Instruction {
    constructor(type, id, confirmType, row, columns, simple, line, column) {
        super(line, column);
        this.type = type;
        this.id = id;
        this.confirmType = confirmType;
        this.row = row;
        this.columns = columns;
        this.simple = simple;
    }
    interpreter(environment, tConsole) {
        var _a;
        if (this.confirmType != this.type) {
            throw new Error(`Type Error: ${this.confirmType} is not assignable to ${this.type}`);
        }
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
                throw Error("Error: Type not valid");
        }
        const valRows = this.row.interpreter(environment);
        if (this.columns != null) {
            const valColumns = this.columns.interpreter(environment);
            if (Result_1.dataType.NUMBER != valRows.type || Result_1.dataType.NUMBER != valColumns.type) {
                throw new Error(`Type Error: ${valRows.type} is not assignable to ${Result_1.dataType.NUMBER}`);
            }
            environment.saveVectors(this.id, dominantType, valRows.value, valColumns.value, this.line, this.column);
        }
        else {
            if (Result_1.dataType.NUMBER != valRows.type) {
                throw new Error(`Type Error: ${valRows.type} is not assignable to ${Result_1.dataType.NUMBER}`);
            }
            environment.saveVectors(this.id, dominantType, valRows.value, 1, this.line, this.column);
        }
        (_a = environment.getVectors(this.id)) === null || _a === void 0 ? void 0 : _a.defaultValues("VectorV", dominantType, defaultVal, this.line, this.column);
    }
}
exports.DeclarationVector = DeclarationVector;
