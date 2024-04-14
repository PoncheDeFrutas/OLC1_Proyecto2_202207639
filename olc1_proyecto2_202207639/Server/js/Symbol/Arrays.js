"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arrays = void 0;
class Arrays {
    constructor(type) {
        this.values = [];
        this.type = type;
    }
    getValue(index) {
        return this.values[index];
    }
    setValue(index, value) {
        this.values[index] = value;
    }
}
exports.Arrays = Arrays;
