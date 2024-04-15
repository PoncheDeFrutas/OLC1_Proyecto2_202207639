"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Struct = void 0;
class Struct {
    constructor() {
        this.attributes = new Map();
    }
    getAttribute(id) {
        return this.attributes.get(id);
    }
    addAttribute(symbol) {
        this.attributes.set(symbol.id, symbol);
    }
}
exports.Struct = Struct;
