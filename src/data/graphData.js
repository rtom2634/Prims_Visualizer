export const graphProblems = [
  {
    id: 1,
    title: "Standard Routing Network",
    difficulty: "Medium",
    description: "The classic network topology map. Good for understanding multiple candidate branches.",
    nodes: [
      { id: '0', position: { x: 50, y: 200 }, data: { label: '0' } },
      { id: '1', position: { x: 220, y: 50 }, data: { label: '1' } },
      { id: '7', position: { x: 220, y: 350 }, data: { label: '7' } },
      { id: '2', position: { x: 440, y: 50 }, data: { label: '2' } },
      { id: '8', position: { x: 440, y: 200 }, data: { label: '8' } },
      { id: '6', position: { x: 440, y: 350 }, data: { label: '6' } },
      { id: '3', position: { x: 660, y: 50 }, data: { label: '3' } },
      { id: '5', position: { x: 660, y: 350 }, data: { label: '5' } },
      { id: '4', position: { x: 830, y: 200 }, data: { label: '4' } },
    ],
    edges: [
      { id: 'e01', source: '0', target: '1', weight: 4, label: '4' },
      { id: 'e07', source: '0', target: '7', weight: 8, label: '8' },
      { id: 'e12', source: '1', target: '2', weight: 8, label: '8' },
      { id: 'e17', source: '1', target: '7', weight: 11, label: '11' },
      { id: 'e78', source: '7', target: '8', weight: 7, label: '7' },
      { id: 'e76', source: '7', target: '6', weight: 1, label: '1' },
      { id: 'e28', source: '2', target: '8', weight: 2, label: '2' },
      { id: 'e86', source: '8', target: '6', weight: 6, label: '6' },
      { id: 'e23', source: '2', target: '3', weight: 7, label: '7' },
      { id: 'e25', source: '2', target: '5', weight: 4, label: '4' },
      { id: 'e65', source: '6', target: '5', weight: 2, label: '2' },
      { id: 'e35', source: '3', target: '5', weight: 14, label: '14' },
      { id: 'e34', source: '3', target: '4', weight: 9, label: '9' },
      { id: 'e54', source: '5', target: '4', weight: 10, label: '10' },
    ]
  },
  {
    id: 2,
    title: "Simple Star Topology",
    difficulty: "Easy",
    description: "A centralized hub graph perfect for beginners to see greedy edge selection in action.",
    nodes: [
      { id: '0', position: { x: 300, y: 200 }, data: { label: 'Center' } },
      { id: '1', position: { x: 100, y: 100 }, data: { label: 'A' } },
      { id: '2', position: { x: 500, y: 100 }, data: { label: 'B' } },
      { id: '3', position: { x: 100, y: 300 }, data: { label: 'C' } },
      { id: '4', position: { x: 500, y: 300 }, data: { label: 'D' } },
    ],
    edges: [
      { id: 'e01', source: '0', target: '1', weight: 5, label: '5' },
      { id: 'e02', source: '0', target: '2', weight: 2, label: '2' },
      { id: 'e03', source: '0', target: '3', weight: 8, label: '8' },
      { id: 'e04', source: '0', target: '4', weight: 1, label: '1' },
      { id: 'e13', source: '1', target: '3', weight: 4, label: '4' },
      { id: 'e24', source: '2', target: '4', weight: 6, label: '6' },
    ]
  },
  {
    id: 3,
    title: "The Bottleneck Trap",
    difficulty: "Hard",
    description: "A graph designed to test your understanding of why Prim's doesn't always take the globally lowest edge immediately if it's not connected.",
    nodes: [
      { id: 'A', position: { x: 100, y: 200 }, data: { label: 'A' } },
      { id: 'B', position: { x: 300, y: 100 }, data: { label: 'B' } },
      { id: 'C', position: { x: 300, y: 300 }, data: { label: 'C' } },
      { id: 'D', position: { x: 600, y: 200 }, data: { label: 'D' } },
      { id: 'E', position: { x: 800, y: 200 }, data: { label: 'E' } },
    ],
    edges: [
      { id: 'eAB', source: 'A', target: 'B', weight: 10, label: '10' },
      { id: 'eAC', source: 'A', target: 'C', weight: 15, label: '15' },
      { id: 'eBC', source: 'B', target: 'C', weight: 12, label: '12' },
      { id: 'eBD', source: 'B', target: 'D', weight: 25, label: '25' },
      { id: 'eCD', source: 'C', target: 'D', weight: 30, label: '30' },
      { id: 'eDE', source: 'D', target: 'E', weight: 1, label: '1' }, // The trap edge
    ]
  },
  {
    id: 4,
    title: "Linear Chain",
    difficulty: "Easy",
    description: "A straightforward path to build foundational confidence in state tracking.",
    nodes: [
      { id: '1', position: { x: 100, y: 200 }, data: { label: '1' } },
      { id: '2', position: { x: 300, y: 200 }, data: { label: '2' } },
      { id: '3', position: { x: 500, y: 200 }, data: { label: '3' } },
      { id: '4', position: { x: 700, y: 200 }, data: { label: '4' } },
    ],
    edges: [
      { id: 'e12', source: '1', target: '2', weight: 3, label: '3' },
      { id: 'e23', source: '2', target: '3', weight: 5, label: '5' },
      { id: 'e34', source: '3', target: '4', weight: 2, label: '2' },
    ]
  },
  {
    id: 5,
    title: "Hexagonal Cluster",
    difficulty: "Medium",
    description: "Multiple cycles exist here. Watch how Prim's carefully steps around them.",
    nodes: [
      { id: '1', position: { x: 300, y: 100 }, data: { label: '1' } },
      { id: '2', position: { x: 500, y: 100 }, data: { label: '2' } },
      { id: '3', position: { x: 600, y: 250 }, data: { label: '3' } },
      { id: '4', position: { x: 500, y: 400 }, data: { label: '4' } },
      { id: '5', position: { x: 300, y: 400 }, data: { label: '5' } },
      { id: '6', position: { x: 200, y: 250 }, data: { label: '6' } },
      { id: '7', position: { x: 400, y: 250 }, data: { label: 'Mid' } },
    ],
    edges: [
      { id: 'e12', source: '1', target: '2', weight: 4, label: '4' },
      { id: 'e23', source: '2', target: '3', weight: 6, label: '6' },
      { id: 'e34', source: '3', target: '4', weight: 5, label: '5' },
      { id: 'e45', source: '4', target: '5', weight: 9, label: '9' },
      { id: 'e56', source: '5', target: '6', weight: 3, label: '3' },
      { id: 'e61', source: '6', target: '1', weight: 8, label: '8' },
      { id: 'e71', source: '7', target: '1', weight: 7, label: '7' },
      { id: 'e74', source: '7', target: '4', weight: 2, label: '2' },
    ]
  }
];

export const articlesData = {
  greedy: {
    title: "The Greedy Approach",
    icon: "Zap",
    content: `A "Greedy Algorithm" is exactly what it sounds like: at every single step, it makes the choice that looks the best right now, without worrying about the future. \n\nImagine you are trying to drive across a country. A greedy approach would mean at every intersection, you just take the road with the least traffic immediately visible to you. \n\nWhy does this work for Prim's?\nIn graph theory, there is a concept called the "Cut Property". It states that if you separate your nodes into two groups (Visited and Unvisited), the absolute cheapest edge connecting those two groups MUST be part of the Minimum Spanning Tree. \n\nBecause of this mathematical guarantee, Prim's algorithm doesn't need to look ahead or plan complex routes. It simply asks: "What is the cheapest edge touching my current tree?" and grabs it. It is inherently selfish (greedy), but mathematically flawless.`
  },
  cycles: {
    title: "Cycle Prevention",
    icon: "Target",
    content: `A Tree, by mathematical definition, cannot contain any loops (cycles). If there is a loop, it is just a regular Graph, not a Tree. \n\nWhy are cycles bad?\nImagine we are laying down expensive electrical wires to power 5 houses. If House A is connected to House B, and House B is connected to House C... we don't need to lay another wire from House C back to House A! They are already sharing the same power grid. Adding that extra wire is a waste of money (weight).\n\nHow Prim's prevents them:\nPrim's algorithm keeps a strict list of nodes it has already powered up (the "Visited" list). Before it even considers a new wire (edge), it checks both ends. If both nodes are already in the Visited list, it highlights that wire in RED and permanently ignores it. It only looks at wires where one end is Visited, and the other end is completely new.`
  },
  usecases: {
    title: "Real-Life Use Cases",
    icon: "BookOpen",
    content: `Why do software engineers learn Prim's Algorithm? Because finding the most efficient way to connect things saves billions of dollars in the real world.\n\n1. Network Routing:**\nWhen telecommunication companies lay down physical fiber-optic cables across an ocean or between cities, they want to connect every city while using the absolute minimum length of cable possible.\n\n2. Circuit Board Design:\nInside your computer, the motherboard has tiny printed copper wires connecting the CPU, RAM, and graphics card. Engineers use algorithms like Prim's to ensure all components are connected using the least amount of copper, reducing heat, space, and cost.\n\n3. AI and Clustering:\nIn Machine Learning, algorithms sometimes use Minimum Spanning Trees to cluster data points. By connecting all data points and then cutting the longest lines, AI can group similar items together (like recommending similar movies or categorizing images).`
  }
};
