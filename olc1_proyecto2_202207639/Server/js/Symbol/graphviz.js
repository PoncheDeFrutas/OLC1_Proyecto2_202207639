"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveGraph = exports.createEdge = exports.createNodeColor = exports.createNode = exports.createGraph = void 0;
const graphviz_1 = __importDefault(require("graphviz"));
let graph = graphviz_1.default.graph("G");
function createGraph() {
    graph = graphviz_1.default.digraph("G");
}
exports.createGraph = createGraph;
function createNode(name) {
    let node = graph.addNode(`${Math.random() * 10000}`, { "label": name });
    node.set("shape", "box");
    return node;
}
exports.createNode = createNode;
function createNodeColor(name, color) {
    let node = graph.addNode(`${Math.random() * 10000}`, { "label": name, "color": color });
    node.set("style", "filled, bold");
    node.set("shape", "box");
    return node;
}
exports.createNodeColor = createNodeColor;
function createEdge(parent, child) {
    graph.addEdge(parent, child);
}
exports.createEdge = createEdge;
function saveGraph() {
    graph.output('dot', 'graph.dot');
}
exports.saveGraph = saveGraph;
