"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Function = void 0;
const Instruction_1 = require("../Abstract/Instruction");
class Function extends Instruction_1.Instruction {
    constructor(id, statement, parameters, line, column) {
        super(line, column);
        this.id = id;
        this.statement = statement;
        this.parameters = parameters;
    }
    interpreter(environment, tConsole) {
        environment.saveFunction(this.id, this);
        return null;
    }
}
exports.Function = Function;
