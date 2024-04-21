"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeclarationVector = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
const Counter_1 = __importDefault(require("../Symbol/Counter"));
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
    interpreter(environment) {
        var _a;
        if (this.confirmType != this.type) {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${this.confirmType} no coincide con ${this.type}`, this.line, this.column));
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
                throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${this.type}, no permitivo para la declaración de vectores`, this.line, this.column));
        }
        const valRows = this.row.interpreter(environment);
        if (this.columns != null) {
            const valColumns = this.columns.interpreter(environment);
            if (Result_1.dataType.NUMBER != valRows.type || Result_1.dataType.NUMBER != valColumns.type) {
                throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `El tipo de una dimensional no es compatible con los vectores`, this.line, this.column));
            }
            environment.saveVectors(this.id, dominantType, valRows.value, valColumns.value, this.line, this.column);
        }
        else {
            if (Result_1.dataType.NUMBER != valRows.type) {
                throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `El tipo de una dimensional no es compatible con los vectores`, this.line, this.column));
            }
            environment.saveVectors(this.id, dominantType, valRows.value, 1, this.line, this.column);
        }
        (_a = environment.getVectors(this.id)) === null || _a === void 0 ? void 0 : _a.defaultValues("VectorV", dominantType, defaultVal, this.line, this.column);
    }
    /*
    *  type id([] | [][]) = new type [exp] | new type [exp][exp];
    * */
    getAst(last) {
        let result = "";
        let counter = Counter_1.default.getInstance();
        let declarationNode = `n${counter.get()}`;
        let typeNode = `n${counter.get()}`;
        result += `${declarationNode}[label="Declaración Vector"];\n`;
        result += `${typeNode}[label="${this.type}"];\n`;
        result += `${last} -> ${declarationNode};\n`;
        result += `${declarationNode} -> ${typeNode};\n`;
        if (this.simple) {
            let idNode = `n${counter.get()}`;
            result += `${idNode}[label="${this.id}[]"];\n`;
            result += `${declarationNode} -> ${idNode};\n`;
        }
        else {
            let idNode = `n${counter.get()}`;
            result += `${idNode}[label="${this.id}[][]"];\n`;
            result += `${declarationNode} -> ${idNode};\n`;
        }
        let assignNode = `n${counter.get()}`;
        result += `${assignNode}[label="="];\n`;
        result += `${declarationNode} -> ${assignNode};\n`;
        let newNode = `n${counter.get()}`;
        result += `${newNode}[label="new"];\n`;
        result += `${declarationNode} -> ${newNode};\n`;
        let typeNode2 = `n${counter.get()}`;
        result += `${typeNode2}[label="${this.confirmType}"];\n`;
        result += `${declarationNode} -> ${typeNode2};\n`;
        let lbraceNode = `n${counter.get()}`;
        result += `${lbraceNode}[label="["];\n`;
        result += `${declarationNode} -> ${lbraceNode};\n`;
        let expNode = `n${counter.get()}`;
        result += `${expNode}[label="Expresion"];\n`;
        result += `${declarationNode} -> ${expNode};\n`;
        result += this.row.getAst(expNode);
        let rbraceNode = `n${counter.get()}`;
        result += `${rbraceNode}[label="]"];\n`;
        result += `${declarationNode} -> ${rbraceNode};\n`;
        if (this.columns != null) {
            let lbraceNode2 = `n${counter.get()}`;
            result += `${lbraceNode2}[label="["];\n`;
            result += `${declarationNode} -> ${lbraceNode2};\n`;
            let expNode2 = `n${counter.get()}`;
            result += `${expNode2}[label="Expresion"];\n`;
            result += `${declarationNode} -> ${expNode2};\n`;
            result += this.columns.getAst(expNode2);
            let rbraceNode2 = `n${counter.get()}`;
            result += `${rbraceNode2}[label="]"];\n`;
            result += `${declarationNode} -> ${rbraceNode2};\n`;
        }
        let semicolonNode = `n${counter.get()}`;
        result += `${semicolonNode}[label=";"];\n`;
        result += `${declarationNode} -> ${semicolonNode};\n`;
        return result;
    }
}
exports.DeclarationVector = DeclarationVector;
