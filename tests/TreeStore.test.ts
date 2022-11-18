import { test, expect } from "@jest/globals";
import TreeStore from "../src/TreeStore";

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

test("getAll():", () => {
  expect(ts.getAll()).toEqual([
    { id: 1, parent: "root" },
    { id: 2, parent: 1, type: "test" },
    { id: 3, parent: 1, type: "test" },
    { id: 4, parent: 2, type: "test" },
    { id: 5, parent: 2, type: "test" },
    { id: 6, parent: 2, type: "test" },
    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
  ]);
});

test("getItem(7):", () => {
  expect(ts.getItem(7)).toEqual({ id: 7, parent: 4, type: null });
});

test("getChildren(4):", () => {
  expect(ts.getChildren(4)).toEqual([
    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
  ]);
});

test("getChildren(5):", () => {
  expect(ts.getChildren(5)).toEqual([]);
});

test("getChildren(2):", () => {
  expect(ts.getChildren(2)).toEqual([
    { id: 4, parent: 2, type: "test" },
    { id: 5, parent: 2, type: "test" },
    { id: 6, parent: 2, type: "test" },
  ]);
});

test("getAllChildren(2):", () => {
  expect(ts.getAllChildren(2)).toEqual([
    { id: 4, parent: 2, type: "test" },
    { id: 5, parent: 2, type: "test" },
    { id: 6, parent: 2, type: "test" },
    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
  ]);
});

test("getAllParents(7):", () => {
  expect(ts.getAllParents(7)).toEqual([
    { id: 4, parent: 2, type: "test" },
    { id: 2, parent: 1, type: "test" },
    { id: 1, parent: "root" },
  ]);
});
