"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.For = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Environment_1 = require("../Symbol/Environment");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
class For extends Instruction_1.Instruction {
    constructor(variable, condition, increment, block, line, column) {
        super(line, column);
        this.variable = variable;
        this.condition = condition;
        this.increment = increment;
        this.block = block;
    }
    interpreter(environment) {
        const newEnv = new Environment_1.Environment(environment);
        this.variable.interpreter(newEnv);
        let condition = this.condition.interpreter(newEnv);
        while (condition.value) {
            const element = this.block.interpreter(newEnv);
            if (element != null || element != undefined) {
                if (element.type == 'break') {
                    break;
                }
                else if (element.typeValue == 'return') {
                    return element;
                }
                else {
                    throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${condition.type} no es valido para retorno [For]`, this.line, this.column));
                }
            }
            this.increment.interpreter(newEnv);
            condition = this.condition.interpreter(newEnv);
        }
    }
}
exports.For = For;
