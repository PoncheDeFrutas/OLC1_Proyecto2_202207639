"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoWhile = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
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
}
exports.DoWhile = DoWhile;
