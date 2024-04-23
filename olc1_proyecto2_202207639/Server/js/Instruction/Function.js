"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Function = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
const Counter_1 = __importDefault(require("../Symbol/Counter"));
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
    /*
    * type id (parameters) block
    */
    getAst(last) {
        let result = "";
        let counter = Counter_1.default.getInstance();
        let functionNode = `n${counter.get()}`;
        let typeNode = `n${counter.get()}`;
        let idNode = `n${counter.get()}`;
        let lParenNode = `n${counter.get()}`;
        result += `${functionNode}[label="Declaración Function"];\n`;
        result += `${typeNode}[label="${this.stype}"];\n`;
        result += `${idNode}[label="${this.id}"];\n`;
        result += `${lParenNode}[label="("];\n`;
        result += `${last} -> ${functionNode};\n`;
        result += `${functionNode} -> ${typeNode};\n`;
        result += `${functionNode} -> ${idNode};\n`;
        result += `${functionNode} -> ${lParenNode};\n`;
        if (this.parameters.length != 0) {
            for (let i = 0; i < this.parameters.length; i++) {
                let first = `n${counter.get()}`;
                result += `${first}[label="param"];\n`;
                result += `${functionNode} -> ${first};\n`;
                let typeNode = `n${counter.get()}`;
                let idNode = `n${counter.get()}`;
                result += `${typeNode}[label="${this.parameters[i].type}"];\n`;
                if (this.parameters[i].vector) {
                    if (this.parameters[i].simple) {
                        result += `${idNode}[label="${this.parameters[i].id}[]"];\n`;
                    }
                    else {
                        result += `${idNode}[label="${this.parameters[i].id}[][]"];\n`;
                    }
                }
                else {
                    result += `${idNode}[label="${this.parameters[i].id}"];\n`;
                }
                result += `${first} -> ${typeNode};\n`;
                result += `${first} -> ${idNode};\n`;
                if (i < this.parameters.length - 1) {
                    let comma = `n${counter.get()}`;
                    result += `${comma}[label=","];\n`;
                    result += `${functionNode} -> ${comma};\n`;
                }
            }
        }
        let rParenNode = `n${counter.get()}`;
        result += `${rParenNode}[label=")"];\n`;
        result += `${functionNode} -> ${rParenNode};\n`;
        let blockNode = `n${counter.get()}`;
        result += `${blockNode}[label="Block"];\n`;
        result += `${functionNode} -> ${blockNode};\n`;
        result += this.block.getAst(blockNode);
        return result;
    }
}
exports.Function = Function;
