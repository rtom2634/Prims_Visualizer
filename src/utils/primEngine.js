export function generatePrimSteps(nodes, edges) {
  const steps = [];
  const visited = ['0'];
  const mstEdgeIds = [];

  steps.push({
    visited: [...visited],
    mstEdges: [...mstEdgeIds],
    travelingEdge: null,
    explanation: 'Welcome! Let\'s find the Minimum Spanning Tree. We start by placing Node 0 into our visited tree component.'
  });

  while (visited.length < nodes.length) {
    let minEdge = null;

    for (const edge of edges) {
      const srcVisited = visited.includes(edge.source);
      const tgtVisited = visited.includes(edge.target);

      if ((srcVisited && !tgtVisited) || (!srcVisited && tgtVisited)) {
        if (!minEdge || edge.weight < minEdge.weight) {
          minEdge = edge;
        }
      }
    }

    if (!minEdge) break;

    steps.push({
      visited: [...visited],
      mstEdges: [...mstEdgeIds],
      travelingEdge: minEdge.id,
      explanation: `Scanning paths connected to our visited tree... We highlight the edge between Node ${minEdge.source} and Node ${minEdge.target} because it holds the lowest weight (${minEdge.weight}).`
    });

    const nextNode = visited.includes(minEdge.source) ? minEdge.target : minEdge.source;
    visited.push(nextNode);
    mstEdgeIds.push(minEdge.id);

    steps.push({
      visited: [...visited],
      mstEdges: [...mstEdgeIds],
      travelingEdge: null,
      explanation: `The path traveling to Node ${nextNode} is complete. Node ${nextNode} is now added to our growing tree network.`
    });
  }

  steps.push({
    visited: [...visited],
    mstEdges: [...mstEdgeIds],
    travelingEdge: null,
    explanation: 'Awesome! Every node has been safely reached with the absolute lowest possible total connection cost. The lesson is complete.'
  });

  return steps;
}
