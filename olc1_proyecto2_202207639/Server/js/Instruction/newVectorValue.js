"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newVectorValue = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
const Counter_1 = __importDefault(require("../Symbol/Counter"));
class newVectorValue extends Instruction_1.Instruction {
    constructor(id, x, y, value, line, column) {
        super(line, column);
        this.id = id;
        this.x = x;
        this.y = y;
        this.value = value;
    }
    interpreter(environment) {
        var _a, _b;
        const vector = environment.getVectors(this.id);
        const value = this.value.interpreter(environment);
        if (vector == null) {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Vector ${this.id} no existe`, this.line, this.column));
        }
        if (vector.type != value.type) {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo: ${value.type} no es asignable a  ${vector.type}`, this.line, this.column));
        }
        const x = this.x.interpreter(environment);
        if (this.y != null) {
            const y = this.y.interpreter(environment);
            if (x.type != Result_1.dataType.NUMBER || y.type != Result_1.dataType.NUMBER) {
                throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${x.type} no es asignable a Number`, this.line, this.column));
            }
            (_a = environment.getVectors(this.id)) === null || _a === void 0 ? void 0 : _a.setValue(x.value, y.value, "VectorV", vector.type, value.value, this.line, this.column);
        }
        else {
            if (x.type != Result_1.dataType.NUMBER) {
                throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${x.type} no es asignable a Number`, this.line, this.column));
            }
            (_b = environment.getVectors(this.id)) === null || _b === void 0 ? void 0 : _b.setValue(x.value, 0, "VectorV", vector.type, value.value, this.line, this.column);
        }
        return null;
    }
    /*
    * ID ([exp]|[exp][exp]) = exp;
    * */
    getAst(last) {
        let result = "";
        let counter = Counter_1.default.getInstance();
        let newVectorValueNodeT = `n${counter.get()}`;
        let idNode = `n${counter.get()}`;
        let rbracketNode = `n${counter.get()}`;
        let exp1Node = `n${counter.get()}`;
        let lbracketNode = `n${counter.get()}`;
        result += `${newVectorValueNodeT}[label="I_newVectorValue"];\n`;
        result += `${idNode}[label="${this.id}"];\n`;
        result += `${lbracketNode}[label="["];\n`;
        result += `${exp1Node}[label="Expresion"];\n`;
        result += `${rbracketNode}[label="]"];\n`;
        result += `${last} -> ${newVectorValueNodeT};\n`;
        result += `${newVectorValueNodeT} -> ${idNode};\n`;
        result += `${newVectorValueNodeT} -> ${lbracketNode};\n`;
        result += `${newVectorValueNodeT} -> ${exp1Node};\n`;
        result += this.x.getAst(exp1Node);
        result += `${newVectorValueNodeT} -> ${rbracketNode};\n`;
        if (this.y != null) {
            let exp2Node = `n${counter.get()}`;
            let lbracketNode2 = `n${counter.get()}`;
            let rbracketNode2 = `n${counter.get()}`;
            result += `${lbracketNode2}[label="["];\n`;
            result += `${exp2Node}[label="Expresion"];\n`;
            result += `${rbracketNode2}[label="]"];\n`;
            result += `${newVectorValueNodeT} -> ${lbracketNode2};\n`;
            result += `${newVectorValueNodeT} -> ${exp2Node};\n`;
            result += this.y.getAst(exp2Node);
            result += `${newVectorValueNodeT} -> ${rbracketNode2};\n`;
        }
        let equalNode = `n${counter.get()}`;
        let expNode = `n${counter.get()}`;
        let semicolonNode = `n${counter.get()}`;
        result += `${equalNode}[label="="];\n`;
        result += `${expNode}[label="Expresion"];\n`;
        result += `${semicolonNode}[label=";"];\n`;
        result += `${newVectorValueNodeT} -> ${equalNode};\n`;
        result += `${newVectorValueNodeT} -> ${expNode};\n`;
        result += this.value.getAst(expNode);
        result += `${newVectorValueNodeT} -> ${semicolonNode};\n`;
        return result;
    }
}
exports.newVectorValue = newVectorValue;
