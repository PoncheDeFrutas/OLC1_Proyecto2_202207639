"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST = void 0;
class AST {
    constructor(instructions) {
        this.instructions = instructions;
        this.tConsole = [];
    }
    Execute() {
        this.instructions.forEach(instruction => {
            instruction.interpreter(this.tConsole);
        });
    }
    getConsole() {
        let exit = "";
        for (let index = 0; index < this.tConsole.length; index++) {
            exit += this.tConsole[index].toString();
        }
        return exit;
    }
}
exports.AST = AST;
