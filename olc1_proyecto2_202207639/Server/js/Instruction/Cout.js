"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cout = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
const Counter_1 = __importDefault(require("../Symbol/Counter"));
class Cout extends Instruction_1.Instruction {
    constructor(exp, jump, line, column) {
        super(line, column);
        this.exp = exp;
        this.jump = jump;
    }
    interpreter(environment) {
        const res = this.exp.interpreter(environment);
        if (res == undefined) {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Expression no valida en sentencias cout`, this.line, this.column));
        }
        if (this.jump) {
            tConsole_1.tConsole.push(res.value + "\n");
        }
        else {
            tConsole_1.tConsole.push(res.value + "");
        }
        return null;
    }
    /*
    * cout << exp << endl ;
    */
    getAst(last) {
        let result = "";
        let counter = Counter_1.default.getInstance();
        let coutNodeT = `n${counter.get()}`;
        let coutNode = `n${counter.get()}`;
        let minusNode = `n${counter.get()}`;
        let expNode = `n${counter.get()}`;
        result += `${coutNodeT}[label="I_cout"];\n`;
        result += `${coutNode}[label="cout"];\n`;
        result += `${minusNode}[label="<<"];\n`;
        result += `${expNode}[label="exp"];\n`;
        result += `${last} -> ${coutNodeT};\n`;
        result += `${coutNodeT} -> ${coutNode};\n`;
        result += `${coutNodeT} -> ${minusNode};\n`;
        result += `${coutNodeT} -> ${expNode};\n`;
        result += this.exp.getAst(expNode);
        if (this.jump) {
            let sMinusNode = `n${counter.get()}`;
            let sEndlNode = `n${counter.get()}`;
            result += `${sMinusNode}[label="<<"];\n`;
            result += `${sEndlNode}[label="endl"];\n`;
            result += `${coutNodeT} -> ${sMinusNode};\n`;
            result += `${coutNodeT} -> ${sEndlNode};\n`;
        }
        let semicolonNode = `n${counter.get()}`;
        result += `${semicolonNode}[label=";"];\n`;
        result += `${coutNodeT} -> ${semicolonNode};\n`;
        return result;
    }
}
exports.Cout = Cout;
