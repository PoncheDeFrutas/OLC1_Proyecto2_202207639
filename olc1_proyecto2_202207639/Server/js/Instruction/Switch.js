"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Environment_1 = require("../Symbol/Environment");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
class Switch extends Instruction_1.Instruction {
    constructor(condition, Cases, Default, line, column) {
        super(line, column);
        this.condition = condition;
        this.Cases = Cases;
        this.Default = Default;
    }
    interpreter(environment) {
        if (this.Cases == null && this.Default == null) {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `No hay Cases o Default en [Switch]`, this.line, this.column));
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
                        else if (result.typeValue == 'return') {
                            return result;
                        }
                        else {
                            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${condition.type} no es valido para retorno [Case]`, this.line, this.column));
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
                        else if (result.typeValue == 'return') {
                            return result;
                        }
                        else {
                            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${condition.type} no es valido para retorno [Case]`, this.line, this.column));
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
                    else if (result.typeValue == 'return') {
                        return result;
                    }
                    else {
                        throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${condition.type} no es valido para retorno [Default]`, this.line, this.column));
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
                else if (result.typeValue == 'return') {
                    return result;
                }
                else {
                    throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${condition.type} no es valido para retorno [Default]`, this.line, this.column));
                }
            }
        }
    }
}
exports.Switch = Switch;
