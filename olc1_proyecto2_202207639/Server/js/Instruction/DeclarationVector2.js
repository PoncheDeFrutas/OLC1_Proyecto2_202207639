"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeclarationVector2 = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Expression_1 = require("../Abstract/Expression");
const Result_1 = require("../Abstract/Result");
class DeclarationVector2 extends Instruction_1.Instruction {
    constructor(type, id, values, simple, line, column) {
        super(line, column);
        this.type = type;
        this.id = id;
        this.values = values;
        this.simple = simple;
    }
    interpreter(environment) {
        var _a, _b, _c, _d, _e;
        let dominantType;
        let defaultVal;
        switch (this.type) {
            case "int":
                dominantType = Result_1.dataType.NUMBER;
                defaultVal = Number(0);
                break;
            case "double":
                dominantType = Result_1.dataType.DOUBLE;
                defaultVal = Number(0.0);
                break;
            case "bool":
                dominantType = Result_1.dataType.BOOL;
                defaultVal = true;
                break;
            case "char":
                dominantType = Result_1.dataType.CHAR;
                defaultVal = '0';
                break;
            case "std::string":
                dominantType = Result_1.dataType.STRING;
                defaultVal = "";
                break;
            default:
                throw Error("Error: Type not valid");
        }
        if (this.simple && !(this.values instanceof Expression_1.Expression)) {
            if (!(this.values[0] instanceof Array)) {
                const maxColumns = 1;
                const maxRows = this.values.length;
                environment.saveVectors(this.id, dominantType, maxRows, maxColumns, this.line, this.column);
                (_a = environment.getVectors(this.id)) === null || _a === void 0 ? void 0 : _a.defaultValues("VectorV", dominantType, defaultVal, this.line, this.column);
                for (let i = 0; i < this.values.length; i++) {
                    const exp = this.values[i];
                    const value = exp.interpreter(environment);
                    if (value.type == dominantType) {
                        (_b = environment.getVectors(this.id)) === null || _b === void 0 ? void 0 : _b.setValue(i, 0, "VectorV", dominantType, value.value, this.line, this.column);
                    }
                    else {
                        throw Error("Error: Value type not valid");
                    }
                }
            }
            else {
                throw Error("Error: Type not valid");
            }
        }
        else if (!(this.values instanceof Expression_1.Expression)) {
            if (this.values[0] instanceof Array) {
                const maxRows = this.values.length;
                const maxColumns = Math.max(...this.values.map(columns => columns instanceof Array ? columns.length : 0));
                environment.saveVectors(this.id, dominantType, maxRows, maxColumns, this.line, this.column);
                (_c = environment.getVectors(this.id)) === null || _c === void 0 ? void 0 : _c.defaultValues("VectorV", dominantType, defaultVal, this.line, this.column);
                for (let i = 0; i < this.values.length; i++) {
                    const columns = this.values[i];
                    for (let j = 0; j < columns.length; j++) {
                        const exp = columns[j];
                        const value = exp.interpreter(environment);
                        if (value.type == dominantType) {
                            (_d = environment.getVectors(this.id)) === null || _d === void 0 ? void 0 : _d.setValue(i, j, "VectorV", dominantType, value.value, this.line, this.column);
                        }
                        else {
                            throw Error("Error: Value type not valid");
                        }
                    }
                }
            }
        }
        else {
            const exp = this.values.interpreter(environment);
            const tmp = exp.value;
            environment.saveVectors(this.id, dominantType, tmp.length, 1, this.line, this.column);
            for (let i = 0; i < tmp.length; i++) {
                const value = tmp[i].interpreter(environment);
                if (value.type == dominantType) {
                    (_e = environment.getVectors(this.id)) === null || _e === void 0 ? void 0 : _e.setValue(i, 0, "VectorV", dominantType, value.value, this.line, this.column);
                }
                else {
                    throw Error("Error: Value type not valid");
                }
            }
        }
    }
}
exports.DeclarationVector2 = DeclarationVector2;
