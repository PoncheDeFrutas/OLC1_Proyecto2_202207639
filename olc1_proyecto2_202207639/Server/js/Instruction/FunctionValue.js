"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionValue = void 0;
const Result_1 = require("../Abstract/Result");
const Environment_1 = require("../Symbol/Environment");
const Instruction_1 = require("../Abstract/Instruction");
class FunctionValue extends Instruction_1.Instruction {
    constructor(id, parameters, line, column) {
        super(line, column);
        this.id = id;
        this.parameters = parameters;
    }
    interpreter(environment, tConsole) {
        const func = environment.getFunction(this.id);
        const newEnv = new Environment_1.Environment(environment.getGlobal());
        if (func != null) {
            if (func.parameters.length == this.parameters.length) {
                for (let i = 0; i < this.parameters.length; i++) {
                    func.parameters[i].interpreter(newEnv, tConsole);
                    const result = this.parameters[i].interpreter(newEnv);
                    const element = Array.from(newEnv.variables)[i];
                    if (element[1].type == result.type) {
                        newEnv.editVariable(element[0], result.value, result.type, this.line, this.column);
                    }
                    else {
                        throw new Error("The type of the parameter is incorrect");
                    }
                }
                const block = func.block;
                const element = block.interpreter(newEnv, tConsole);
                console.log(tConsole);
                if (element != null || element != undefined) {
                    if (element.type == 'return' && func.type == element.typeValue) {
                        return { value: element.value, type: func.type };
                    }
                    else {
                        throw Error(`Error: Type [${element.type}] is not valid for [Function] code`);
                    }
                }
            }
            else {
                throw new Error("The number of parameters is incorrect");
            }
        }
        return { value: null, type: Result_1.dataType.NULL };
    }
}
exports.FunctionValue = FunctionValue;
