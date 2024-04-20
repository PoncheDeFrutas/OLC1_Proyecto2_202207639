"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error_ = void 0;
class Error_ {
    constructor(id, type, message, line, column) {
        this.id = id;
        this.type = type;
        this.message = message;
        this.line = line;
        this.column = column;
    }
    toString() {
        return `Error: ${this.type} ${this.message} en la linea ${this.line} y columna ${this.column}`;
    }
}
exports.Error_ = Error_;
