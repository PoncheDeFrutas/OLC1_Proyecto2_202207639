"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
const Symbol_1 = require("./Symbol");
const Arrays_1 = require("./Arrays");
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
        this.variables.set(id, new Symbol_1.Symbol(id, type, value, line, column));
    }
    saveVectors(id, type, rows, columns, line, column) {
        let env = this;
        if (env.vectors.has(id)) {
            throw Error("Vector already exist");
        }
        this.vectors.set(id, new Arrays_1.Arrays(id, type, rows, columns, line, column));
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
        // TODO arreglar esta madre
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
