"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeclarationVector2 = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
const Counter_1 = __importDefault(require("../Symbol/Counter"));
class DeclarationVector2 extends Instruction_1.Instruction {
    constructor(type, id, values, simple, line, column) {
        super(line, column);
        this.type = type;
        this.id = id;
        this.values = values;
        this.simple = simple;
    }
    interpreter(environment) {
        var _a, _b, _c, _d, _e;
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
        if (this.simple && !(this.values instanceof Expression_1.Expression)) {
            if (!(this.values[0] instanceof Array)) {
                const maxColumns = 1;
                const maxRows = this.values.length;
                environment.saveVectors(this.id, dominantType, maxRows, maxColumns, this.line, this.column);
                (_a = environment.getVectors(this.id)) === null || _a === void 0 ? void 0 : _a.defaultValues("VectorV", dominantType, defaultVal, this.line, this.column);
                for (let i = 0; i < this.values.length; i++) {
                    const exp = this.values[i];
                    const value = exp.interpreter(environment);
                    if (value.type == dominantType) {
                        (_b = environment.getVectors(this.id)) === null || _b === void 0 ? void 0 : _b.setValue(i, 0, "VectorV", dominantType, value.value, this.line, this.column);
                    }
                    else {
                        throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${value.type} de la expresion no coincide con el del vector`, this.line, this.column));
                    }
                }
            }
            else {
                throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `El vector que se intena asignar no es valido`, this.line, this.column));
            }
        }
        else if (!(this.values instanceof Expression_1.Expression)) {
            if (this.values[0] instanceof Array) {
                const maxRows = this.values.length;
                const maxColumns = Math.max(...this.values.map(columns => columns instanceof Array ? columns.length : 0));
                environment.saveVectors(this.id, dominantType, maxRows, maxColumns, this.line, this.column);
                (_c = environment.getVectors(this.id)) === null || _c === void 0 ? void 0 : _c.defaultValues("VectorV", dominantType, defaultVal, this.line, this.column);
                for (let i = 0; i < this.values.length; i++) {
                    const columns = this.values[i];
                    for (let j = 0; j < columns.length; j++) {
                        const exp = columns[j];
                        const value = exp.interpreter(environment);
                        if (value.type == dominantType) {
                            (_d = environment.getVectors(this.id)) === null || _d === void 0 ? void 0 : _d.setValue(i, j, "VectorV", dominantType, value.value, this.line, this.column);
                        }
                        else {
                            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${value.type} de la expresion no coincide con el del vector`, this.line, this.column));
                        }
                    }
                }
            }
        }
        else {
            const exp = this.values.interpreter(environment);
            const tmp = exp.value;
            environment.saveVectors(this.id, dominantType, tmp.length, 1, this.line, this.column);
            for (let i = 0; i < tmp.length; i++) {
                const value = tmp[i].interpreter(environment);
                if (value.type == dominantType) {
                    (_e = environment.getVectors(this.id)) === null || _e === void 0 ? void 0 : _e.setValue(i, 0, "VectorV", dominantType, value.value, this.line, this.column);
                }
                else {
                    throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${value.type} de la expresion no coincide con el del vector`, this.line, this.column));
                }
            }
        }
    }
    /*
    * tipe id ([]|[][]) = EXPRESSION | EXPRESSION[] | EXPRESSION[][];
    * */
    getAst(last) {
        let result = "";
        let counter = Counter_1.default.getInstance();
        let declarationNode = `n${counter.get()}`;
        let typeNode = `n${counter.get()}`;
        let idNode = `n${counter.get()}`;
        result += `${declarationNode}[label="Declaración Vector"];\n`;
        result += `${typeNode}[label="${this.type}"];\n`;
        if (this.simple) {
            result += `${idNode}[label="${this.id}[]"];\n`;
        }
        else {
            result += `${idNode}[label="${this.id}[][]"];\n`;
        }
        result += `${last} -> ${declarationNode};\n`;
        result += `${declarationNode} -> ${typeNode};\n`;
        result += `${declarationNode} -> ${idNode};\n`;
        let equalNode = `n${counter.get()}`;
        result += `${equalNode}[label="="];\n`;
        result += `${declarationNode} -> ${equalNode};\n`;
        let expNodeL = `n${counter.get()}`;
        result += `${expNodeL}[label="Expresion List"];\n`;
        result += `${declarationNode} -> ${expNodeL};\n`;
        if (this.values instanceof Expression_1.Expression) {
            result += this.values.getAst(expNodeL);
        }
        else {
            let lbraceNode = `n${counter.get()}`;
            result += `${lbraceNode}[label="["];\n`;
            result += `${expNodeL} -> ${lbraceNode};\n`;
            if (!(this.values[0] instanceof Array)) {
                for (let i = 0; i < this.values.length; i++) {
                    let expNode = `n${counter.get()}`;
                    result += `${expNode}[label="Expresion"];\n`;
                    result += `${expNodeL} -> ${expNode};\n`;
                    const exp = this.values[i];
                    result += exp.getAst(expNode);
                    if (i < this.values.length - 1) {
                        let comaNode = `n${counter.get()}`;
                        result += `${comaNode}[label=","];\n`;
                        result += `${expNodeL} -> ${comaNode};\n`;
                    }
                }
            }
            else {
                for (let i = 0; i < this.values.length; i++) {
                    const column = this.values[i];
                    let lbraceNode = `n${counter.get()}`;
                    result += `${lbraceNode}[label="["];\n`;
                    result += `${expNodeL} -> ${lbraceNode};\n`;
                    for (let j = 0; j < column.length; j++) {
                        let expNode = `n${counter.get()}`;
                        result += `${expNode}[label="Expresion"];\n`;
                        result += `${expNodeL} -> ${expNode};\n`;
                        const exp = column[j];
                        result += exp.getAst(expNode);
                        if (j < column.length - 1) {
                            let comaNode = `n${counter.get()}`;
                            result += `${comaNode}[label=","];\n`;
                            result += `${expNodeL} -> ${comaNode};\n`;
                        }
                        else {
                            let rbraceNode = `n${counter.get()}`;
                            result += `${rbraceNode}[label="]"];\n`;
                            result += `${expNodeL} -> ${rbraceNode};\n`;
                        }
                    }
                }
            }
            let rbraceNode = `n${counter.get()}`;
            result += `${rbraceNode}[label="]"];\n`;
            result += `${expNodeL} -> ${rbraceNode};\n`;
        }
        let semicolonNode = `n${counter.get()}`;
        result += `${semicolonNode}[label=";"];\n`;
        result += `${declarationNode} -> ${semicolonNode};\n`;
        return result;
    }
}
exports.DeclarationVector2 = DeclarationVector2;
