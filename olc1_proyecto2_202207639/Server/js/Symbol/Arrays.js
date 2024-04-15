"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arrays = void 0;
const Symbol_1 = require("./Symbol");
class Arrays {
    constructor(id, type, rows, columns, line, column) {
        this.id = id;
        this.type = type;
        this.line = line;
        this.column = column;
        this.values = new Array(rows);
        for (let i = 0; i < rows; i++) {
            this.values[i] = new Array(columns);
        }
    }
    getValue(x, y) {
        if (x < 0 || x >= this.values.length || y < 0 || y >= this.values[0].length) {
            throw Error("Index out of bounds");
        }
        return this.values[x][y];
    }
    setValue(x, y, id, type, value, line, column) {
        this.values[x][y] = new Symbol_1.Symbol(id, type, value, line, column);
    }
    defaultValues(id, type, value, line, column) {
        for (let i = 0; i < this.values.length; i++) {
            for (let j = 0; j < this.values[i].length; j++) {
                this.values[i][j] = new Symbol_1.Symbol(id, type, value, line, column);
            }
        }
    }
}
exports.Arrays = Arrays;
