import graphviz from 'graphviz';

let graph = graphviz.graph("G")

export function createGraph() {
    graph = graphviz.digraph("G");
}

export function createNode(name: string) {
    let node = graph.addNode(`${Math.random()*10000}`, {"label": name});
    node.set("shape", "box");
    return node;
}

export function createNodeColor(name: string, color: any) {
    let node = graph.addNode(`${Math.random()*10000}`, {"label": name, "color": color});
    node.set("style", "filled, bold");
    node.set("shape", "box");
    return node;
}

export function createEdge(parent: any, child: any) {
    graph.addEdge(parent, child);
}

export function saveGraph() {
    graph.output('dot', 'graph.dot');
}