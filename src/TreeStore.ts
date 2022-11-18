import {
  TreeArray,
  TreeArrayItem,
  TreeArrayItemId,
  TreeMap,
  TreeMapDerived,
  TreeMapDerivedItem,
} from "./utils/types";

class TreeStore {
  private treeMap: TreeMap;
  private treeMapDerived: TreeMapDerived;

  constructor(treeArray: TreeArray) {
    this.treeMap = this.arrayToMap(treeArray);
    this.treeMapDerived = this.constructNodes(treeArray);
  }

  private constructNodes(treeArray: TreeArray) {
    const treeMap = new Map();

    treeArray.forEach((item) => {
      const newItem: TreeMapDerivedItem = {};
      newItem.parents = this.constructParents(item);
      [newItem.children, newItem.allChildren] = this.constructChildren(item);

      if (newItem.children.length === 0) {
        delete newItem.children;
      }

      if (newItem.allChildren.length === 0) {
        delete newItem.allChildren;
      }

      treeMap.set(item.id, newItem);
    });

    return treeMap;
  }

  private constructParents(item: TreeArrayItem) {
    if (item.parent === "root") {
      return ["root"];
    }

    const parents = [];
    let nextItem: typeof item | undefined = item;

    while (nextItem !== undefined && nextItem.parent !== "root") {
      nextItem = this.treeMap.get(nextItem.parent);

      if (nextItem !== undefined) {
        parents.push(nextItem);
      }
    }

    return parents;
  }

  private constructChildren(itemIn: TreeArrayItem) {
    const allChildren: TreeArrayItem[] = [];
    const childrenLevel: TreeArrayItem[] = [];

    [...this.treeMap.values()].forEach((item) => {
      if (item.parent === itemIn.id) {
        allChildren.push(item);
        childrenLevel.push(item);
      }
    });

    const children = [...childrenLevel];

    while (true) {
      const childrenLevelCopy = [...childrenLevel];
      childrenLevel.length = 0;

      childrenLevel.push(...this.constructChildrenLevel(childrenLevelCopy));

      if (childrenLevel.length === 0) {
        break;
      }

      allChildren.push(...childrenLevel);
    }

    return [children, allChildren];
  }

  private constructChildrenLevel(childrenLevelIn: TreeArrayItem[]) {
    const childrenLevel: TreeArrayItem[] = [];

    childrenLevelIn.forEach((childrenItem) => {
      [...this.treeMap.values()].forEach((item) => {
        if (item.parent === childrenItem.id) {
          childrenLevel.push(item);
        }
      });
    });

    return childrenLevel;
  }

  private arrayToMap(treeArray: TreeArray): TreeMap {
    return treeArray.reduce((acc, item) => acc.set(item.id, item), new Map());
  }

  getAll() {
    return [...this.treeMap.values()];
  }

  getItem(id: TreeArrayItemId) {
    return this.treeMap.get(id);
  }

  getChildren(id: TreeArrayItemId) {
    return this.treeMapDerived.get(id)?.children || [];
  }

  getAllChildren(id: TreeArrayItemId) {
    return this.treeMapDerived.get(id)?.allChildren || [];
  }

  getAllParents(id: TreeArrayItemId) {
    return this.treeMapDerived.get(id)?.parents || [];
  }
}

export default TreeStore;
