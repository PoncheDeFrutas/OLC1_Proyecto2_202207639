"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoWhile = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Result_1 = require("../Abstract/Result");
class DoWhile extends Instruction_1.Instruction {
    constructor(condition, code, line, column) {
        super(line, column);
        this.condition = condition;
        this.code = code;
    }
    interpreter(env) {
        let condition = this.condition.interpreter(env);
        if (condition.type != Result_1.dataType.BOOL) {
            throw Error(`Error: Type [${condition.type}] is not valid for [While] condition`);
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
                    throw Error(`Error: Type [${element.type}] is not valid for [Do While] code`);
                }
            }
            condition = this.condition.interpreter(env);
            if (condition.type != Result_1.dataType.BOOL) {
                throw Error(`Error: Type [${condition.type}] is not valid for [Do While] condition`);
            }
        } while (condition.value);
    }
}
exports.DoWhile = DoWhile;
