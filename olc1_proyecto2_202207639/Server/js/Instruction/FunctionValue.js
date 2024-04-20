"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionValue = void 0;
const Result_1 = require("../Abstract/Result");
const Environment_1 = require("../Symbol/Environment");
const Instruction_1 = require("../Abstract/Instruction");
const tConsole_1 = require("../tConsole");
const Error_1 = require("../Error");
class FunctionValue extends Instruction_1.Instruction {
    constructor(id, parameters, enable, line, column) {
        super(line, column);
        this.id = id;
        this.parameters = parameters;
        this.enable = enable;
    }
    interpreter(environment) {
        var _a, _b;
        const func = environment.getFunction(this.id);
        if (func != null) {
            const newEnv = new Environment_1.Environment(environment.getGlobal());
            if (func.parameters.length != this.parameters.length) {
                throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Numero de parametros incorrectos para la función ${func.id}`, this.line, this.column));
            }
            for (let i = 0; i < this.parameters.length; i++) {
                const parameter = func.parameters[i];
                const values = this.parameters[i].interpreter(environment);
                let dominantType;
                switch (parameter.type) {
                    case "int":
                        dominantType = Result_1.dataType.NUMBER;
                        break;
                    case "double":
                        dominantType = Result_1.dataType.DOUBLE;
                        break;
                    case "bool":
                        dominantType = Result_1.dataType.BOOL;
                        break;
                    case "char":
                        dominantType = Result_1.dataType.CHAR;
                        break;
                    case "std::string":
                        dominantType = Result_1.dataType.STRING;
                        break;
                    default:
                        throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${parameter.type}, no permitivo para la declaración de Funciones`, this.line, this.column));
                }
                if (parameter.vector) {
                    if (values.type == Result_1.dataType.ID) {
                        const vector = newEnv.getVectors(values.value);
                        if (vector != null) {
                            if (vector.type != dominantType) {
                                throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${vector.type} de parametro no corresponde al que se asigna`, this.line, this.column));
                            }
                            else {
                                if (parameter.simple && vector.values[0].length == 1) {
                                    newEnv.saveVectors(parameter.id, vector.type, vector.values.length, 1, this.line, this.column);
                                    (_a = newEnv.getVectors(parameter.id)) === null || _a === void 0 ? void 0 : _a.setVector(vector.values);
                                }
                                else if (!parameter.simple) {
                                    newEnv.saveVectors(parameter.id, vector.type, vector.values.length, vector.values[0].length, this.line, this.column);
                                    (_b = newEnv.getVectors(parameter.id)) === null || _b === void 0 ? void 0 : _b.setVector(vector.values);
                                }
                                else {
                                    throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo ${vector.type} de parametro no corresponde al que se asigna`, this.line, this.column));
                                }
                            }
                        }
                        else {
                            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Vector ${values.value} no ha sido encontrado`, this.line, this.column));
                        }
                    }
                    else {
                        throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo de parametro no valido `, this.line, this.column));
                    }
                }
                else {
                    if (dominantType != values.type) {
                        throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo de parametro no valido `, this.line, this.column));
                    }
                    else {
                        newEnv.save(parameter.id, values.value, values.type, this.line, this.column);
                    }
                }
            }
            const block = func.block;
            const element = block.interpreter(newEnv);
            if ((element != null || element != undefined) && this.enable) {
                if (element.typeValue == 'return' && func.type == element.type) {
                    return { value: element.value, type: func.type };
                }
                if (element.type == 'break') {
                    return { value: null, type: Result_1.dataType.NULL };
                }
                else if (element.type == 'continue') {
                    return { value: null, type: Result_1.dataType.NULL };
                }
                else if (func.type == element.type && element.value == null) {
                    return { value: null, type: Result_1.dataType.NULL };
                }
                else {
                    throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo de retorno ${element.type} no es valido para la función definida `, this.line, this.column));
                }
            }
            else {
                if (func.type == Result_1.dataType.NULL) {
                    return null;
                }
                else {
                    throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `Tipo de retorno ${element.type} no es valido para la función definida `, this.line, this.column));
                }
            }
        }
        else {
            throw tConsole_1.tError.push(new Error_1.Error_(tConsole_1.tError.length, "Semantico", `La función ${this.id} no existe`, this.line, this.column));
        }
    }
}
exports.FunctionValue = FunctionValue;
