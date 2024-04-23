"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Counter {
    constructor() {
        this.counter = 0;
    }
    static getInstance() {
        if (!Counter.instance) {
            Counter.instance = new Counter();
        }
        return Counter.instance;
    }
    get() {
        this.counter++;
        return this.counter;
    }
}
exports.default = Counter;
