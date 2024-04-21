"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
const Counter_1 = __importDefault(require("../Symbol/Counter"));
class execute extends Instruction_1.Instruction {
    constructor(Function, line, column) {
        super(line, column);
        this.Function = Function;
    }
    interpreter(environment) {
        if (environment.getFunction(this.Function.id) == null) {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `La función ${this.Function.id} no existe D:`, this.line, this.column));
        }
        else {
            const result = this.Function.interpreter(environment);
            if (result != null) {
                return { value: result.value, type: result.type };
            }
            else {
                return { value: null, type: Result_1.dataType.NULL };
            }
        }
    }
    /*
    * execute functionValue ;
    */
    getAst(last) {
        let result = "";
        let counter = Counter_1.default.getInstance();
        let executeNodeT = `n${counter.get()}`;
        let executeNode = `n${counter.get()}`;
        let functionNode = `n${counter.get()}`;
        result += `${executeNodeT}[label="I_execute"];\n`;
        result += `${executeNode}[label="execute"];\n`;
        result += `${functionNode}[label="functionValue"];\n`;
        result += `${last} -> ${executeNodeT};\n`;
        result += `${executeNodeT} -> ${executeNode};\n`;
        result += `${executeNodeT} -> ${functionNode};\n`;
        result += this.Function.getAst(functionNode);
        let semicolonNode = `n${counter.get()}`;
        result += `${semicolonNode}[label=";"];\n`;
        result += `${executeNodeT} -> ${semicolonNode};\n`;
        return result;
    }
}
exports.execute = execute;
