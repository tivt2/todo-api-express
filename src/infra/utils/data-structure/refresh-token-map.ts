import { IRefreshStorage } from '../../../domain/interface/refresh-storage-interface';

type RefreshNode = {
  key: string;
  token: string;
  createdAt: Date;
  prevIterator?: RefreshNode;
  nextIterator?: RefreshNode;
  prevHash?: RefreshNode;
  nextHash?: RefreshNode;
};

export class RefreshTokenMap implements IRefreshStorage {
  private refreshMap: Array<[head?: RefreshNode, tail?: RefreshNode]>;
  private dataLength;

  private head?: RefreshNode;
  private tail?: RefreshNode;

  constructor(
    private capacity = 8,
    private growLoadFactor = 0.7,
    private shrinkLoadFactor = 0.3,
    private sizeChangeMultiplier = 2,
    private minimumSize = 8,
  ) {
    this.refreshMap = Array.from({ length: this.capacity }, () => [
      undefined,
      undefined,
    ]);
    this.dataLength = 0;
    this.head = this.tail = undefined;
  }

  set(key: string, token: string): { key: string; token: string } | undefined {
    this.growMap();

    const idx = this.hashKey(key);
    const node = this.makeNode(key, token);
    const hashPos = this.refreshMap[idx];

    const nodeExists = this.findNode(hashPos[0], key);
    if (!nodeExists) {
      this.dataLength++;
      this.appendIterator(node);
      this.appendHash(node, idx);
      return;
    }

    const oldToken = nodeExists.token;
    nodeExists.token = token;
    return { key, token: oldToken };
  }

  get(key: string): { key: string; token: string } | undefined {
    const idx = this.hashKey(key);
    const headOfIdx = this.refreshMap[idx][0];

    if (!headOfIdx) {
      return;
    }

    const node = this.findNode(headOfIdx, key);
    if (!node) {
      return;
    }

    return { key: node.key, token: node.token };
  }

  remove(key: string): { key: string; token: string } | undefined {
    this.shrinkMap();

    const idx = this.hashKey(key);
    const headOfIdx = this.refreshMap[idx][0];

    if (!headOfIdx) {
      return;
    }

    const node = this.findNode(headOfIdx, key);
    if (!node) {
      return;
    }

    this.dataLength--;
    this.breakLink(node, idx);
    return { key: node.key, token: node.token };
  }

  print(): void {
    console.log();
    console.log(
      `dataLength: ${this.dataLength} | `,
      `loadFactor: ${this.dataLength / this.capacity}`,
    );

    console.log();
    console.log('ITERATOR');
    let iterator = '';
    let currIterator = this.head;
    while (currIterator) {
      iterator += currIterator?.key + ' -> ';
      currIterator = currIterator.nextIterator;
    }
    console.log(iterator);

    console.log();

    console.log('HASHMAP');
    for (let i = 0; i < this.capacity; i++) {
      let curr = '';
      let currNode = this.refreshMap[i][0];
      if (!currNode) {
        curr = 'undefined';
      }
      while (currNode) {
        curr += currNode?.key + ' -> ';
        currNode = currNode.nextHash;
      }
      console.log(curr);
    }
  }

  get getRefresh(): Array<[head?: RefreshNode, tail?: RefreshNode]> {
    return this.refreshMap;
  }

  get getHead(): RefreshNode | undefined {
    return this.head;
  }

  private appendIterator(node: RefreshNode): void {
    const oldTail = this.tail;
    if (!oldTail) {
      this.head = this.tail = node;
      return;
    }

    this.tail = node;
    node.prevIterator = oldTail;
    oldTail.nextIterator = node;
  }

  private appendHash(node: RefreshNode, idx: number): void {
    const hashPos = this.refreshMap[idx];
    const oldTail = hashPos[1];
    if (!oldTail) {
      hashPos[0] = hashPos[1] = node;
      return;
    }

    hashPos[1] = node;
    node.prevHash = oldTail;
    oldTail.nextHash = node;
  }

  private breakLink(node: RefreshNode, idx: number): void {
    const hashPos = this.refreshMap[idx];

    if (this.dataLength === 1) {
      this.head = this.tail = undefined;
      hashPos[0] = hashPos[1] = undefined;
      return;
    }

    // ITERATOR LINK BREAK
    const prevIterator = node.prevIterator;
    const nextIterator = node.nextIterator;
    if (prevIterator) {
      prevIterator.nextIterator = nextIterator;
    }
    if (nextIterator) {
      nextIterator.prevIterator = prevIterator;
    }
    node.prevIterator = node.nextIterator = undefined;
    if (!prevIterator) {
      this.head = nextIterator;
    }
    if (!nextIterator) {
      this.tail = prevIterator;
    }

    // HASHMAP LINK BREAK
    const prevHash = node.prevHash;
    const nextHash = node.nextHash;
    if (prevHash) {
      prevHash.nextHash = nextHash;
    }
    if (nextHash) {
      nextHash.prevHash = prevHash;
    }
    node.prevHash = node.nextHash = undefined;
    if (!prevHash) {
      hashPos[0] = nextHash;
    }
    if (!nextHash) {
      hashPos[1] = prevHash;
    }
  }

  private findNode(
    head: RefreshNode | undefined,
    key: string,
  ): RefreshNode | undefined {
    let curr: RefreshNode | undefined = head;
    while (curr && curr.key !== key) {
      curr = curr.nextHash;
    }
    return curr;
  }

  private hashKey(key: string): number {
    const idx = this.djb2(key) % this.capacity;
    return idx;
  }

  private djb2(str: string) {
    let len = str.length;
    let hash = 5381;
    for (let i = 0; i < len; i++) {
      hash = ((hash << 5) + hash + str.charCodeAt(i)) & 0xffffffff;
    }
    return hash >>> 0;
  }

  private growMap(): void {
    const needGrowing = this.dataLength / this.capacity > this.growLoadFactor;
    if (!needGrowing) {
      return;
    }

    this.capacity = Math.floor(this.capacity * this.sizeChangeMultiplier);
    this.refreshMap = Array.from({ length: this.capacity }, () => [
      undefined,
      undefined,
    ]);

    let curr = this.head;
    while (curr) {
      const hashIdx = this.hashKey(curr?.key);
      this.appendHash(curr, hashIdx);
      curr = curr.nextIterator;
    }
  }

  private shrinkMap(): void {
    const needShrinking =
      this.dataLength / this.capacity < this.shrinkLoadFactor;
    const canShrink =
      Math.floor(this.capacity / this.sizeChangeMultiplier) >= this.minimumSize;
    if (!needShrinking || !canShrink) {
      return;
    }

    this.capacity = Math.floor(this.capacity / this.sizeChangeMultiplier);
    this.refreshMap = Array.from({ length: this.capacity }, () => [
      undefined,
      undefined,
    ]);

    let curr = this.head;
    while (curr) {
      const hashIdx = this.hashKey(curr?.key);
      this.appendHash(curr, hashIdx);
      curr = curr.nextIterator;
    }
  }

  private makeNode(key: string, token: string): RefreshNode {
    const node = {
      key,
      token,
      createdAt: new Date(),
    } as RefreshNode;
    return node;
  }
}
