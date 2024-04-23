"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
const Counter_1 = __importDefault(require("../Symbol/Counter"));
class Default extends Instruction_1.Instruction {
    constructor(instructions, line, column) {
        super(line, column);
        this.instructions = instructions;
    }
    interpreter(environment) {
        for (const instruction of this.instructions) {
            try {
                const element = instruction.interpreter(environment);
                if (element != null || element != undefined) {
                    if (element != null || element != undefined) {
                        if (element.type == 'break') {
                            return element;
                        }
                        else if (element.typeValue == 'return') {
                            return element;
                        }
                        else {
                            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${element.type} no es valido en [Default] code`, this.line, this.column));
                        }
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    getAst(last) {
        let result = "";
        let counter = Counter_1.default.getInstance();
        let defaultNodeT = `n${counter.get()}`;
        let defaultNode = `n${counter.get()}`;
        let colonNode = `n${counter.get()}`;
        let instructionsNode = `n${counter.get()}`;
        result += `${defaultNodeT}[label="I_default"];\n`;
        result += `${defaultNode}[label="default"];\n`;
        result += `${colonNode}[label=":"];\n`;
        result += `${instructionsNode}[label="instructions"];\n`;
        result += `${last} -> ${defaultNodeT};\n`;
        result += `${defaultNodeT} -> ${defaultNode};\n`;
        result += `${defaultNodeT} -> ${colonNode};\n`;
        result += `${defaultNodeT} -> ${instructionsNode};\n`;
        for (const instruction of this.instructions) {
            result += instruction.getAst(instructionsNode);
        }
        return result;
    }
}
exports.Default = Default;
