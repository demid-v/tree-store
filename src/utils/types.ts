type TreeArrayItemId = string | number;

type TreeArrayItem = {
  id: TreeArrayItemId;
  parent: TreeArrayItemId;
  type?: string | null;
};

type TreeArray = TreeArrayItem[];

type TreeMap = Map<TreeArrayItemId, TreeArrayItem>;

type Children = {
  children?: TreeArrayItem[];
  allChildren?: TreeArrayItem[];
};

type ChildrenMap = Map<TreeArrayItemId, Children>;

type Parents = { parents?: (TreeArrayItem | string)[] };

type TreeMapDerivedItem = Children & Parents;

type TreeMapDerived = Map<TreeArrayItem["id"], TreeMapDerivedItem>;

export type {
  TreeArrayItemId,
  TreeArrayItem,
  TreeArray,
  TreeMap,
  ChildrenMap,
  TreeMapDerivedItem,
  TreeMapDerived,
};
