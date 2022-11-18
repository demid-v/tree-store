import TreeStore from "./src/TreeStore";

const items = [
  { id: 1, parent: "root" },
  { id: 2, parent: 1, type: "test" },
  { id: 3, parent: 1, type: "test" },

  { id: 4, parent: 2, type: "test" },
  { id: 5, parent: 2, type: "test" },
  { id: 6, parent: 2, type: "test" },

  { id: 7, parent: 4, type: null },
  { id: 8, parent: 4, type: null },
];

const ts = new TreeStore(items);

console.log("getAll:", ts.getAll());
/* 
[{"id":1,"parent":"root"},{"id":2,"parent":1,"type":"test"},
{"id":3,"parent":1,"type":"test"},{"id":4,"parent":2,"type":"test"},
{"id":5,"parent":2,"type":"test"},{"id":6,"parent":2,"type":"test"},
{"id":7,"parent":4,"type":null},{"id":8,"parent":4,"type":null}]
*/

console.log("getItem(7):", ts.getItem(7));
// {"id":7,"parent":4,"type":null}

console.log("getChildren(4):", ts.getChildren(4));
// [{"id":7,"parent":4,"type":null},{"id":8,"parent":4,"type":null}]

console.log("getChildren(5):", ts.getChildren(5));
// []

console.log("getChildren(2):", ts.getChildren(2));
/* 
[{"id":4,"parent":2,"type":"test"},{"id":5,"parent":2,"type":"test"},
{"id":6,"parent":2,"type":"test"}]
*/

console.log("getAllChildren(2):", ts.getAllChildren(2));
/* 
[{"id":4,"parent":2,"type":"test"},{"id":5,"parent":2,"type":"test"},
{"id":6,"parent":2,"type":"test"},{"id":7,"parent":4,"type":null},
{"id":8,"parent":4,"type":null}]
*/

console.log("getAllParents(7):", ts.getAllParents(7));
/*
[{"id":4,"parent":2,"type":"test"},{"id":2,"parent":1,"type":"test"},
{"id":1,"parent":"root"}]
*/
