"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.While = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
const Counter_1 = __importDefault(require("../Symbol/Counter"));
class While extends Instruction_1.Instruction {
    constructor(condition, code, line, column) {
        super(line, column);
        this.condition = condition;
        this.code = code;
    }
    interpreter(env) {
        let condition = this.condition.interpreter(env);
        if (condition.type != Result_1.dataType.BOOL) {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${condition.type}  no es valido para la condición [While]`, this.line, this.column));
        }
        while (condition.value) {
            condition = this.condition.interpreter(env);
            if (condition.type != Result_1.dataType.BOOL) {
                throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${condition.type}  no es valido para la condición [While]`, this.line, this.column));
            }
            const element = this.code.interpreter(env);
            if (element != null || element != undefined) {
                if (element.type == 'break') {
                    break;
                }
                else if (element.type == 'continue') {
                    continue;
                }
                else if (element.typeValue == 'return') {
                    return element;
                }
                else {
                    throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${condition.type} no es valido para retorno [While]`, this.line, this.column));
                }
            }
        }
    }
    /*
    * while ( exp ) block
    * */
    getAst(last) {
        let result = "";
        let counter = Counter_1.default.getInstance();
        let whileNodeT = `n${counter.get()}`;
        let whileNode = `n${counter.get()}`;
        let lParenNode = `n${counter.get()}`;
        let expressionNode = `n${counter.get()}`;
        let rParenNode = `n${counter.get()}`;
        let blockNode = `n${counter.get()}`;
        result += `${whileNodeT}[label="I_While"];\n`;
        result += `${whileNode}[label="While"];\n`;
        result += `${lParenNode}[label="("];\n`;
        result += `${expressionNode}[label="Expression"];\n`;
        result += `${rParenNode}[label=")"];\n`;
        result += `${blockNode}[label="Block"];\n`;
        result += `${last} -> ${whileNodeT};\n`;
        result += `${whileNodeT} -> ${whileNode};\n`;
        result += `${whileNode} -> ${lParenNode};\n`;
        result += `${whileNode} -> ${expressionNode};\n`;
        result += this.condition.getAst(expressionNode);
        result += `${whileNode} -> ${rParenNode};\n`;
        result += `${whileNode} -> ${blockNode};\n`;
        result += this.code.getAst(blockNode);
        return result;
    }
}
exports.While = While;
