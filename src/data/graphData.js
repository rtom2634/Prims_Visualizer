export const initialNodes = [
  { id: '0', position: { x: 50, y: 200 }, data: { label: '0' } },
  { id: '1', position: { x: 220, y: 50 }, data: { label: '1' } },
  { id: '7', position: { x: 220, y: 350 }, data: { label: '7' } },
  { id: '2', position: { x: 440, y: 50 }, data: { label: '2' } },
  { id: '8', position: { x: 440, y: 200 }, data: { label: '8' } },
  { id: '6', position: { x: 440, y: 350 }, data: { label: '6' } },
  { id: '3', position: { x: 660, y: 50 }, data: { label: '3' } },
  { id: '5', position: { x: 660, y: 350 }, data: { label: '5' } },
  { id: '4', position: { x: 830, y: 200 }, data: { label: '4' } },
];

export const initialEdges = [
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
];
