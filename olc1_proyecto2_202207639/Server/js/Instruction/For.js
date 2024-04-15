"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.For = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Environment_1 = require("../Symbol/Environment");
class For extends Instruction_1.Instruction {
    constructor(variable, condition, increment, block, line, column) {
        super(line, column);
        this.variable = variable;
        this.condition = condition;
        this.increment = increment;
        this.block = block;
    }
    interpreter(environment, tConsole) {
        const newEnv = new Environment_1.Environment(environment);
        this.variable.interpreter(newEnv, tConsole);
        let condition = this.condition.interpreter(newEnv);
        while (condition.value) {
            const element = this.block.interpreter(newEnv, tConsole);
            if (element != null || element != undefined) {
                if (element.type == 'break') {
                    break;
                }
                else {
                    throw Error(`Error: Type [${element.type}] is not valid for [For] code`);
                }
            }
            this.increment.interpreter(newEnv, tConsole);
            condition = this.condition.interpreter(newEnv);
        }
    }
}
exports.For = For;
