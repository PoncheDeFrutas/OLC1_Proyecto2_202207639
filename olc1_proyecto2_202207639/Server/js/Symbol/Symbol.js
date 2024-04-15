"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Symbol = void 0;
class Symbol {
    constructor(id, type, value, line, column) {
        this.id = id;
        this.type = type;
        this.value = value;
        this.line = line;
        this.column = column;
    }
}
exports.Symbol = Symbol;
