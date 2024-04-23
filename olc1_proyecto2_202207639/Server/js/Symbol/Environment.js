"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
const Symbol_1 = require("./Symbol");
const Result_1 = require("../Abstract/Result");
const Arrays_1 = require("./Arrays");
const tConsole_1 = require("../tConsole");
const tablaSimbolos_1 = require("../tablaSimbolos");
class Environment {
    constructor(previous) {
        this.previous = previous;
        this.variables = new Map();
        this.functions = new Map();
        this.vectors = new Map();
    }
    save(id, value, type, line, column) {
        let env = this;
        if (env.variables.has(id)) {
            throw Error("Variable already exist");
        }
        else if (env.vectors.has(id)) {
            throw Error("This ID is a Vector");
        }
        else if (env.functions.has(id)) {
            throw Error("This ID is a function");
        }
        this.variables.set(id, new Symbol_1.Symbol(id, type, value, line, column));
        let newSymbol = new tablaSimbolos_1.tablaSimbolos(tConsole_1.tSimbols.length, id, (0, Result_1.getDataTypeName)(type), "var", line, column);
        let exists = tConsole_1.tSimbols.some(symbol => symbol.tipo === newSymbol.tipo &&
            symbol.ticpo2 === newSymbol.ticpo2 &&
            symbol.linea === newSymbol.linea &&
            symbol.columna === newSymbol.columna);
        if (!exists) {
            tConsole_1.tSimbols.push(newSymbol);
        }
    }
    saveVectors(id, type, rows, columns, line, column) {
        let env = this;
        if (env.vectors.has(id)) {
            throw Error("Vector already exist");
        }
        else if (env.variables.has(id)) {
            throw Error("This ID is a Variable");
        }
        else if (env.functions.has(id)) {
            throw Error("This ID is a function");
        }
        this.vectors.set(id, new Arrays_1.Arrays(id, type, rows, columns, line, column));
        let newSymbol = new tablaSimbolos_1.tablaSimbolos(tConsole_1.tSimbols.length, id, (0, Result_1.getDataTypeName)(type), "vector", line, column);
        let exists = tConsole_1.tSimbols.some(symbol => symbol.tipo === newSymbol.tipo &&
            symbol.ticpo2 === newSymbol.ticpo2 &&
            symbol.linea === newSymbol.linea &&
            symbol.columna === newSymbol.columna);
        if (!exists) {
            tConsole_1.tSimbols.push(newSymbol);
        }
    }
    getVectors(id) {
        let env = this;
        while (env != null) {
            if (env.vectors.has(id)) {
                return env.vectors.get(id);
            }
            env = env.previous;
        }
        return null;
    }
    editVariable(id, value, type, line, column) {
        let env = this;
        while (env != null) {
            if (env.variables.has(id)) {
                env.variables.set(id, new Symbol_1.Symbol(id, type, value, line, column));
                return;
            }
            env = env.previous;
        }
        throw Error("Variable don't exist");
    }
    saveFunction(id, func) {
        let env = this;
        if (env.functions.has(id)) {
            throw Error("Function already exist");
        }
        else if (env.variables.has(id)) {
            throw Error("This ID is a Variable");
        }
        else if (env.vectors.has(id)) {
            throw Error("This ID is a Vector");
        }
        this.functions.set(id, func);
    }
    getVariable(id) {
        let env = this;
        while (env != null) {
            if (env.variables.has(id)) {
                return env.variables.get(id);
            }
            env = env.previous;
        }
        return null;
    }
    getFunction(id) {
        let env = this;
        while (env != null) {
            if (env.functions.has(id)) {
                return env.functions.get(id);
            }
            env = env.previous;
        }
        return undefined;
    }
    getGlobal() {
        let env = this;
        while ((env === null || env === void 0 ? void 0 : env.previous) != null) {
            env = env.previous;
        }
        return env;
    }
}
exports.Environment = Environment;
