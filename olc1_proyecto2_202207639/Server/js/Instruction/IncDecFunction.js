"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncDecFunction = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Result_1 = require("../Abstract/Result");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
const Counter_1 = __importDefault(require("../Symbol/Counter"));
class IncDecFunction extends Instruction_1.Instruction {
    constructor(id, IncDec, line, column) {
        super(line, column);
        this.id = id;
        this.IncDec = IncDec;
    }
    interpreter(environment) {
        var _a, _b, _c, _d;
        const value = environment.getVariable(this.id);
        if (value == null) {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `La variable ${this.id} no existe`, this.line, this.column));
        }
        if (value.type == Result_1.dataType.NUMBER || value.type == Result_1.dataType.DOUBLE) {
            if (this.IncDec) {
                environment.editVariable(this.id, value.value + 1, value.type, (_a = environment.getVariable(this.id)) === null || _a === void 0 ? void 0 : _a.line, (_b = environment.getVariable(this.id)) === null || _b === void 0 ? void 0 : _b.column);
            }
            else {
                environment.editVariable(this.id, value.value - 1, value.type, (_c = environment.getVariable(this.id)) === null || _c === void 0 ? void 0 : _c.line, (_d = environment.getVariable(this.id)) === null || _d === void 0 ? void 0 : _d.column);
            }
        }
        else {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `La variable ${this.id} no es asignable a incremento o decremento`, this.line, this.column));
        }
        return null;
    }
    /*
    *  ID (++ | --) ;
    * */
    getAst(last) {
        let result = "";
        let counter = Counter_1.default.getInstance();
        let incDecNodeT = `n${counter.get()}`;
        let idNode = `n${counter.get()}`;
        let incDecNode = `n${counter.get()}`;
        let semicolonNode = `n${counter.get()}`;
        result += `${incDecNodeT}[label="I_IncDecFunction"];\n`;
        result += `${idNode}[label="${this.id}"];\n`;
        result += `${incDecNode}[label="${this.IncDec ? "++" : "--"}"];\n`;
        result += `${semicolonNode}[label=";"];\n`;
        result += `${last} -> ${incDecNodeT};\n`;
        result += `${incDecNodeT} -> ${idNode};\n`;
        result += `${incDecNodeT} -> ${incDecNode};\n`;
        result += `${incDecNodeT} -> ${semicolonNode};\n`;
        return result;
    }
}
exports.IncDecFunction = IncDecFunction;
