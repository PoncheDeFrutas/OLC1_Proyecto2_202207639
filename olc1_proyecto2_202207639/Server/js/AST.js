"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST = void 0;
const Environment_1 = require("./Symbol/Environment");
const tConsole_1 = require("./tConsole");
const Declaration_1 = require("./Instruction/Declaration");
const DeclarationVector_1 = require("./Instruction/DeclarationVector");
const DeclarationVector2_1 = require("./Instruction/DeclarationVector2");
const Function_1 = require("./Instruction/Function");
const execute_1 = require("./Instruction/execute");
class AST {
    constructor(instructions) {
        this.instructions = instructions;
        this.tConsole = [];
        this.global = new Environment_1.Environment(null);
    }
    Execute() {
        tConsole_1.tConsole.length = 0;
        this.instructions.forEach(instruction => {
            if (instruction instanceof Function_1.Function || instruction instanceof Declaration_1.Declaration ||
                instruction instanceof DeclarationVector_1.DeclarationVector || instruction instanceof DeclarationVector2_1.DeclarationVector2) {
                instruction.interpreter(this.global);
            }
        });
        for (let instruction of this.instructions) {
            if (instruction instanceof execute_1.execute) {
                instruction.interpreter(this.global);
                break;
            }
        }
        this.tConsole = tConsole_1.tConsole;
    }
    getConsole() {
        let exit = "";
        for (let index = 0; index < this.tConsole.length; index++) {
            exit += this.tConsole[index].toString();
        }
        return exit.replace("\\n", "\n").replace("\\t", "\t").replace("\\\"", "\"").replace("\\\'", "\'").replace("\\", "\\");
    }
}
exports.AST = AST;
