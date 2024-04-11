"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
const Symbol_1 = require("./Symbol");
class Environment {
    constructor(previous) {
        this.previous = previous;
        this.variables = new Map();
        this.functions = new Map();
    }
    save(id, value, type) {
        let env = this;
        if (env.variables.has(id)) {
            env.variables.set(id, new Symbol_1.Symbol(id, type, value));
            return;
        }
        this.variables.set(id, new Symbol_1.Symbol(id, type, value));
    }
    editVariable(id, value, type) {
        let env = this;
        while (env != null) {
            if (env.variables.has(id)) {
                env.variables.set(id, new Symbol_1.Symbol(id, type, value));
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
