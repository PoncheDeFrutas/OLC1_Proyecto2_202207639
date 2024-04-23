"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorValue = void 0;
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
const Counter_1 = __importDefault(require("../Symbol/Counter"));
class VectorValue extends Expression_1.Expression {
    constructor(id, x, y, line, column) {
        super(line, column);
        this.id = id;
        this.x = x;
        this.y = y;
    }
    interpreter(environment) {
        const vector = environment.getVectors(this.id);
        const x = this.x.interpreter(environment);
        if (x.type != Result_1.dataType.NUMBER) {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${x.type} no valido para obtener valor de vector`, this.line, this.column));
        }
        let y;
        if (this.y != null) {
            y = this.y.interpreter(environment).value;
        }
        else {
            y = 0;
        }
        if (vector == null) {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Vector ${this.id} no existe`, this.line, this.column));
        }
        return { value: vector.getValue(x.value, y).value, type: vector.type };
    }
    /*
    * ID [exp]( | [exp])
    * */
    getAst(last) {
        let result = "";
        let counter = Counter_1.default.getInstance();
        let vectorValueNodeT = `n${counter.get()}`;
        let idNode = `n${counter.get()}`;
        let lBracketNode = `n${counter.get()}`;
        let expNode = `n${counter.get()}`;
        let rBracketNode = `n${counter.get()}`;
        result += `${vectorValueNodeT}[label="VectorValue"];\n`;
        result += `${idNode}[label="${this.id}"];\n`;
        result += `${lBracketNode}[label="["];\n`;
        result += `${expNode}[label="Expresion"];\n`;
        result += `${rBracketNode}[label="]"];\n`;
        result += `${last} -> ${vectorValueNodeT};\n`;
        result += `${vectorValueNodeT} -> ${idNode};\n`;
        result += `${vectorValueNodeT} -> ${lBracketNode};\n`;
        result += `${vectorValueNodeT} -> ${expNode};\n`;
        result += this.x.getAst(expNode);
        result += `${vectorValueNodeT} -> ${rBracketNode};\n`;
        if (this.y != null) {
            let lbracketNode = `n${counter.get()}`;
            let expNode = `n${counter.get()}`;
            let rbracketNode = `n${counter.get()}`;
            result += `${lbracketNode}[label="["];\n`;
            result += `${expNode}[label="Expresion"];\n`;
            result += `${rbracketNode}[label="]"];\n`;
            result += `${vectorValueNodeT} -> ${lbracketNode};\n`;
            result += `${vectorValueNodeT} -> ${expNode};\n`;
            result += this.y.getAst(expNode);
            result += `${vectorValueNodeT} -> ${rbracketNode};\n`;
        }
        return result;
    }
}
exports.VectorValue = VectorValue;
