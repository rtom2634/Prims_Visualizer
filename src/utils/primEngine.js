export function generatePrimSteps(nodes, edges) {
  const steps = [];
  const visited = [nodes[0].id]; 
  const mstEdges = [];
  const rejectedEdges = [];

  const addStep = (candidates, activeEdge, explanation, pseudoLine, logs) => {
    steps.push({
      visited: [...visited], mstEdges: [...mstEdges], rejectedEdges: [...rejectedEdges],
      candidates: candidates.map(e => e.id), activeEdge: activeEdge ? activeEdge.id : null,
      explanation, pseudoLine, logs
    });
  };

  addStep(
    [], null, 
    `BEGINNER GUIDE: Let's build a Minimum Spanning Tree (MST).\n\nWe must connect every single node together using the cheapest possible total weight, without creating any loops.\n\nStep 1: We arbitrarily pick Node ${nodes[0].id} to start. Our "Visited Set" is now { ${nodes[0].id} }. Our goal is to pull every other node into this set.`, 
    1, [`Initialized. Visited Set: { ${nodes[0].id} }`]
  );

  while (visited.length < nodes.length) {
    const candidates = [];
    const currentLogs = [];
    let cycleEdgesFound = [];

    for (const edge of edges) {
      const srcVisited = visited.includes(edge.source);
      const tgtVisited = visited.includes(edge.target);

      if (srcVisited && tgtVisited && !mstEdges.includes(edge.id) && !rejectedEdges.includes(edge.id)) {
        rejectedEdges.push(edge.id);
        cycleEdgesFound.push(edge);
      } 
      else if ((srcVisited && !tgtVisited) || (!srcVisited && tgtVisited)) {
        candidates.push(edge);
      }
    }

    if (cycleEdgesFound.length > 0) {
      const cycleDetails = cycleEdgesFound.map(e => `${e.source}-${e.target}`).join(', ');
      addStep(candidates, null, `CYCLE PREVENTION: Look at the red dashed lines (${cycleDetails}). \n\nBoth ends of these paths are already in our Visited Set { ${visited.join(', ')} }. If we use them, we create a redundant loop! We permanently reject them.`, 2, [`Rejected cycle-forming paths: ${cycleDetails}`]);
    }

    if (candidates.length === 0) break;

    const candidateDetails = candidates.map(e => `${e.source}-${e.target} (wt: ${e.weight})`).join('\n• ');
    addStep(candidates, null, `EVALUATING CANDIDATES: We look for paths connecting our Visited Set to unvisited nodes. \n\nWe found ${candidates.length} valid paths (shown in dashed blue):\n• ${candidateDetails}\n\nWhich one should we pick?`, 2, [`Evaluating ${candidates.length} candidate paths.`]);

    candidates.sort((a, b) => a.weight - b.weight);
    const minEdge = candidates[0];
    
    addStep(candidates, minEdge, `GREEDY DECISION: We compare the weights of all valid candidate paths. \n\nThe lowest weight is ${minEdge.weight} on path ${minEdge.source}-${minEdge.target}. \n\nBecause Prim's is a "Greedy" algorithm, it doesn't overthink. It simply takes the absolute lowest available valid path right now.`, 3, [`Selected path ${minEdge.source}-${minEdge.target} as minimum weight (${minEdge.weight}).`]);

    const nextNode = visited.includes(minEdge.source) ? minEdge.target : minEdge.source;
    visited.push(nextNode);
    mstEdges.push(minEdge.id);

    addStep(candidates, null, `SUCCESS: We secure the path ${minEdge.source}-${minEdge.target}. \n\nNode ${nextNode} is now officially part of our tree! Our Visited Set grows. We will repeat this cycle until all nodes are connected.`, 4, [`Added Node ${nextNode} to Visited Set.`]);
  }

  addStep([], null, "ALGORITHM COMPLETE: \n\nNotice how every node is connected, yet there are absolutely no loops. We have found the most efficient possible layout for this network.", 5, ["MST mapping successfully completed."]);

  return steps;
}

export const pseudocode = [
  { line: 1, text: "Initialize MST with a starting node." },
  { line: 2, text: "Identify all candidate edges (visited ↔ unvisited). Reject cycle paths." },
  { line: 3, text: "Greedily pick the candidate with the minimum weight." },
  { line: 4, text: "Add the chosen edge and node to the MST." },
  { line: 5, text: "Repeat until all nodes are connected." }
];
