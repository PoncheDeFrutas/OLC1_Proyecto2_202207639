"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaration = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
const Counter_1 = __importDefault(require("../Symbol/Counter"));
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
    /*
     * TYPE ID[] ( | = EXPRESSION) ;
     */
    getAst(last) {
        let result = "";
        let counter = Counter_1.default.getInstance();
        let declarationNode = `n${counter.get()}`;
        let typeNode = `n${counter.get()}`;
        result += `${declarationNode}[label="Declaración"];\n`;
        result += `${typeNode}[label="${this.type}"];\n`;
        result += `${last} -> ${declarationNode};\n`;
        result += `${declarationNode} -> ${typeNode};\n`;
        for (let i = 0; i < this.id.length; i++) {
            let idNode = `n${counter.get()}`;
            result += `${idNode}[label="${this.id[i]}"];\n`;
            result += `${declarationNode} -> ${idNode};\n`;
            if (i < this.id.length - 1) {
                let comaNode = `n${counter.get()}`;
                result += `${comaNode}[label=","];\n`;
                result += `${declarationNode} -> ${comaNode};\n`;
            }
        }
        if (this.value != null) {
            let equalNode = `n${counter.get()}`;
            let expNode = `n${counter.get()}`;
            result += `${equalNode}[label="="];\n`;
            result += `${expNode}[label="Expresion"];\n`;
            result += `${declarationNode} -> ${equalNode};\n`;
            result += `${declarationNode} -> ${expNode};\n`;
            result += this.value.getAst(expNode);
        }
        let semicolonNode = `n${counter.get()}`;
        result += `${semicolonNode}[label=";"];\n`;
        result += `${declarationNode} -> ${semicolonNode};\n`;
        return result;
    }
}
exports.Declaration = Declaration;
