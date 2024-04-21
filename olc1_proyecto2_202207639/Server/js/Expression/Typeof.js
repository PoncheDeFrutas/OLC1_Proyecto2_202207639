"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Typeof = void 0;
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
const Counter_1 = __importDefault(require("../Symbol/Counter"));
class Typeof extends Expression_1.Expression {
    constructor(exp, line, column) {
        super(line, column);
        this.exp = exp;
    }
    interpreter(environment) {
        var _a;
        const result = this.exp.interpreter(environment);
        let temporalType = Result_1.dataType.NULL;
        if (result.type == Result_1.dataType.ID) {
            temporalType = (_a = environment.getVectors(result.value)) === null || _a === void 0 ? void 0 : _a.type;
        }
        else {
            temporalType = result.type;
        }
        switch (temporalType) {
            case Result_1.dataType.NUMBER:
                return { value: "int", type: temporalType };
            case Result_1.dataType.DOUBLE:
                return { value: "double", type: temporalType };
            case Result_1.dataType.BOOL:
                return { value: "bool", type: temporalType };
            case Result_1.dataType.CHAR:
                return { value: "char", type: temporalType };
            case Result_1.dataType.STRING:
                return { value: "string", type: temporalType };
            default:
                throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${temporalType} no valido para operación typeof`, this.line, this.column));
        }
    }
    /*
    * typeof ( exp )
    * */
    getAst(last) {
        let result = "";
        let counter = Counter_1.default.getInstance();
        let typeofNodeT = `n${counter.get()}`;
        let typeofNode = `n${counter.get()}`;
        let lParenNode = `n${counter.get()}`;
        let expNode = `n${counter.get()}`;
        let rParenNode = `n${counter.get()}`;
        result += `${typeofNodeT}[label="Typeof"];\n`;
        result += `${typeofNode}[label="typeof"];\n`;
        result += `${lParenNode}[label="("];\n`;
        result += `${expNode}[label="Expresion"];\n`;
        result += `${rParenNode}[label=")"];\n`;
        result += `${last} -> ${typeofNodeT};\n`;
        result += `${typeofNodeT} -> ${typeofNode};\n`;
        result += `${typeofNodeT} -> ${lParenNode};\n`;
        result += `${typeofNodeT} -> ${expNode};\n`;
        result += this.exp.getAst(expNode);
        result += `${typeofNodeT} -> ${rParenNode};\n`;
        return result;
    }
}
exports.Typeof = Typeof;
