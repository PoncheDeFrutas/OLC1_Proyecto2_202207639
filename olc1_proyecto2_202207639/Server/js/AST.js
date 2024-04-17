"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST = void 0;
const Environment_1 = require("./Symbol/Environment");
const tConsole_1 = require("./tConsole");
class AST {
    constructor(instructions) {
        this.instructions = instructions;
        this.tConsole = [];
        this.global = new Environment_1.Environment(null);
    }
    Execute() {
        tConsole_1.tConsole.length = 0;
        this.instructions.forEach(instruction => {
            instruction.interpreter(this.global);
        });
        this.tConsole = tConsole_1.tConsole;
    }
    getConsole() {
        let exit = "";
        for (let index = 0; index < this.tConsole.length; index++) {
            exit += this.tConsole[index].toString();
        }
        return exit.toString();
    }
}
exports.AST = AST;
