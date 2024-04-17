"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Environment_1 = require("../Symbol/Environment");
class Switch extends Instruction_1.Instruction {
    constructor(condition, Cases, Default, line, column) {
        super(line, column);
        this.condition = condition;
        this.Cases = Cases;
        this.Default = Default;
    }
    interpreter(environment) {
        if (this.Cases == null && this.Default == null) {
            throw Error("Error: No [Cases] or [Default] code");
        }
        let value = false;
        const condition = this.condition.interpreter(environment);
        const newEnv = new Environment_1.Environment(environment);
        if (this.Cases != null) {
            for (const Case of this.Cases) {
                const element = Case.condition.interpreter(newEnv);
                if (element.value == condition.value && element.type == condition.type && !value) {
                    const result = Case.interpreter(newEnv);
                    if (result != null || result != undefined) {
                        if (result.type == 'break') {
                            break;
                        }
                        else {
                            throw Error(`Error: Type [${result.type}] is not valid for [Case] code`);
                        }
                    }
                    value = true;
                }
                else if (value) {
                    const result = Case.interpreter(newEnv);
                    if (result != null || result != undefined) {
                        if (result.type == 'break') {
                            value = false;
                            break;
                        }
                        else {
                            throw Error(`Error: Type [${result.type}] is not valid for [Case] code`);
                        }
                    }
                }
            }
            if (this.Default != null && value) {
                const result = this.Default.interpreter(newEnv);
                if (result != null || result != undefined) {
                    if (result.type == 'break') {
                        return;
                    }
                    else {
                        throw Error(`Error: Type [${result.type}] is not valid for [Case] code`);
                    }
                }
            }
        }
        if (this.Default != null && !value) {
            const result = this.Default.interpreter(newEnv);
            if (result != null || result != undefined) {
                if (result.type == 'break') {
                    return;
                }
                else {
                    throw Error(`Error: Type [${result.type}] is not valid for [Case] code`);
                }
            }
        }
    }
}
exports.Switch = Switch;
