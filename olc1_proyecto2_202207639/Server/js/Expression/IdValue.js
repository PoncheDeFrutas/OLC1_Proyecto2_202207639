"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdValue = void 0;
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
const Counter_1 = __importDefault(require("../Symbol/Counter"));
class IdValue extends Expression_1.Expression {
    constructor(id, line, column) {
        super(line, column);
        this.id = id;
    }
    interpreter(environment) {
        const value = environment.getVariable(this.id);
        if (value != null) {
            return { value: value.value, type: value.type };
        }
        const vector = environment.getVectors(this.id);
        if (vector != null) {
            return { value: vector.id, type: Result_1.dataType.ID };
        }
        throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `(variable/vector) no encontrado: ${this.id}`, this.line, this.column));
    }
    /*
    * ID
    * */
    getAst(last) {
        let result = "";
        let counter = Counter_1.default.getInstance();
        let idNodeT = `n${counter.get()}`;
        let idNode = `n${counter.get()}`;
        result += `${idNodeT}[label="IdValue"];\n`;
        result += `${idNode}[label="${this.id}"];\n`;
        result += `${last} -> ${idNodeT};\n`;
        result += `${idNodeT} -> ${idNode};\n`;
        return result;
    }
}
exports.IdValue = IdValue;
