"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Environment_1 = require("../Symbol/Environment");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
const Counter_1 = __importDefault(require("../Symbol/Counter"));
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
        let aDefault = true;
        const condition = this.condition.interpreter(environment);
        const newEnv = new Environment_1.Environment(environment);
        if (this.Cases != null) {
            for (const Case of this.Cases) {
                const element = Case.condition.interpreter(newEnv);
                if (element.value == condition.value && element.type == condition.type && !value) {
                    const result = Case.interpreter(newEnv);
                    if (result != null || result != undefined) {
                        if (result.type == 'break') {
                            aDefault = false;
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
                            aDefault = false;
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
                aDefault = false;
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
        if (this.Default != null && aDefault) {
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
    /*
    * switch ( exp ) { case list, default }
    */
    getAst(last) {
        let result = "";
        let counter = Counter_1.default.getInstance();
        let switchNodeT = `n${counter.get()}`;
        let switchNode = `n${counter.get()}`;
        let lParenNode = `n${counter.get()}`;
        let expNode = `n${counter.get()}`;
        let rParenNode = `n${counter.get()}`;
        let lBraceNode = `n${counter.get()}`;
        let casesNode = `n${counter.get()}`;
        let defaultNode = `n${counter.get()}`;
        let rBraceNode = `n${counter.get()}`;
        result += `${switchNodeT}[label="I_Switch"];\n`;
        result += `${switchNode}[label="switch"];\n`;
        result += `${lParenNode}[label="("];\n`;
        result += `${expNode}[label="exp"];\n`;
        result += `${rParenNode}[label=")"];\n`;
        result += `${lBraceNode}[label="{" ];\n`;
        result += `${casesNode}[label="Cases"];\n`;
        result += `${defaultNode}[label="Default"];\n`;
        result += `${rBraceNode}[label="}"];\n`;
        result += `${last} -> ${switchNodeT};\n`;
        result += `${switchNodeT} -> ${switchNode};\n`;
        result += `${switchNodeT} -> ${lParenNode};\n`;
        result += `${switchNodeT} -> ${expNode};\n`;
        result += this.condition.getAst(expNode);
        result += `${switchNodeT} -> ${rParenNode};\n`;
        result += `${switchNodeT} -> ${lBraceNode};\n`;
        result += `${switchNodeT} -> ${casesNode};\n`;
        if (this.Cases != null) {
            for (const Case of this.Cases) {
                result += Case.getAst(casesNode);
            }
        }
        result += `${switchNodeT} -> ${defaultNode};\n`;
        if (this.Default != null) {
            result += this.Default.getAst(defaultNode);
        }
        result += `${switchNodeT} -> ${rBraceNode};\n`;
        return result;
    }
}
exports.Switch = Switch;
