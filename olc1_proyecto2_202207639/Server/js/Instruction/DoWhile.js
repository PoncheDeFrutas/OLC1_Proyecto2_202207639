"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoWhile = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
const Counter_1 = __importDefault(require("../Symbol/Counter"));
class DoWhile extends Instruction_1.Instruction {
    constructor(condition, code, line, column) {
        super(line, column);
        this.condition = condition;
        this.code = code;
    }
    interpreter(env) {
        let condition = this.condition.interpreter(env);
        if (condition.type != Result_1.dataType.BOOL) {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${condition.type} no es valido para condicon [Do While]`, this.line, this.column));
        }
        do {
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
                    throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${element.type} no es valido para returno [Do While]`, this.line, this.column));
                }
            }
            condition = this.condition.interpreter(env);
            if (condition.type != Result_1.dataType.BOOL) {
                throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${condition.type} no es valido para condion [Do While]`, this.line, this.column));
            }
        } while (condition.value);
    }
    /*
    * DO block WHILE ( expression ) ;
    * */
    getAst(last) {
        let result = "";
        let counter = Counter_1.default.getInstance();
        let doNodeT = `n${counter.get()}`;
        let doNode = `n${counter.get()}`;
        let blockNode = `n${counter.get()}`;
        let whileNode = `n${counter.get()}`;
        let lParenNode = `n${counter.get()}`;
        let expressionNode = `n${counter.get()}`;
        let rParenNode = `n${counter.get()}`;
        let semicolonNode = `n${counter.get()}`;
        result += `${doNodeT}[label="I_DoWhile"];\n`;
        result += `${doNode}[label="do"];\n`;
        result += `${blockNode}[label="block"];\n`;
        result += `${whileNode}[label="while"];\n`;
        result += `${lParenNode}[label="("];\n`;
        result += `${expressionNode}[label="expression"];\n`;
        result += `${rParenNode}[label=")"];\n`;
        result += `${semicolonNode}[label=";"];\n`;
        result += `${last} -> ${doNodeT};\n`;
        result += `${doNodeT} -> ${doNode};\n`;
        result += `${doNodeT} -> ${blockNode};\n`;
        result += this.code.getAst(blockNode);
        result += `${doNodeT} -> ${whileNode};\n`;
        result += `${doNodeT} -> ${lParenNode};\n`;
        result += `${doNodeT} -> ${expressionNode};\n`;
        result += this.condition.getAst(expressionNode);
        result += `${doNodeT} -> ${rParenNode};\n`;
        result += `${doNodeT} -> ${semicolonNode};\n`;
        return result;
    }
}
exports.DoWhile = DoWhile;
