import { RefreshTokenMap } from './refresh-token-map';

describe('Refresh Token Map', () => {
  test('Map should correctly insert item as the head of iterator and head of corresponding hash', () => {
    const sut = new RefreshTokenMap();
    const data = { key: '0', token: 'token0' };

    sut.set(data.key, data.token);

    expect(sut.getHead).toMatchObject({
      key: data.key,
      token: data.token,
      createdAt: expect.any(Date),
    });
    const setIdx = sut.getRefresh.findIndex((bucket) => {
      for (let i = 0; i < bucket.length; i++) {
        if (!bucket[i]) {
          return false;
        }
        return bucket[i]?.key === data.key;
      }
    });
    expect(sut.getRefresh[setIdx][0]).toMatchObject({
      key: data.key,
      token: data.token,
      createdAt: expect.any(Date),
    });
  });

  test('Map get method should correct return key and token', () => {
    const sut = new RefreshTokenMap();
    const data = { key: '0', token: 'token0' };

    sut.set(data.key, data.token);
    const ans = sut.get(data.key);
    expect(ans).toEqual(data);
  });

  test('Map remove method should correctly remove key value pair from iterator and hashmap', () => {
    const sut = new RefreshTokenMap();
    const data = { key: '0', token: 'token0' };

    sut.set(data.key, data.token);
    const setIdx = sut.getRefresh.findIndex((bucket) => {
      for (let i = 0; i < bucket.length; i++) {
        if (!bucket[i]) {
          return false;
        }
        return bucket[i]?.key === data.key;
      }
    });
    const ans = sut.remove(data.key);
    expect(ans).toEqual(data);
    expect(sut.getHead).toBe(undefined);
    expect(sut.getRefresh[setIdx][0]).toBe(undefined);

    const isEmpty = sut.getRefresh.reduce((acc, bucket) => {
      return acc && !bucket[0] && !bucket[1];
    }, true);
    expect(isEmpty).toBe(true);
  });

  test('Map set should insert two itens where nextIterator of head should be the second insert and prevIterator of 2 item shoudl be head', () => {
    const sut = new RefreshTokenMap();
    const data0 = { key: '0', token: 'token0' };
    const data1 = { key: '1', token: 'token1' };

    sut.set(data0.key, data0.token);
    sut.set(data1.key, data1.token);
    const setIdx0 = sut.getRefresh.findIndex((bucket) => {
      for (let i = 0; i < bucket.length; i++) {
        if (!bucket[i]) {
          return false;
        }
        return bucket[i]?.key === data0.key;
      }
    });
    const setIdx1 = sut.getRefresh.findIndex((bucket) => {
      for (let i = 0; i < bucket.length; i++) {
        if (!bucket[i]) {
          return false;
        }
        return bucket[i]?.key === data1.key;
      }
    });

    expect(sut.getHead).toMatchObject({
      ...data0,
      createdAt: expect.any(Date),
      nextIterator: expect.objectContaining({
        ...data1,
        createdAt: expect.any(Date),
        prevIterator: expect.objectContaining(data0),
      }),
    });

    if (setIdx0 === setIdx1) {
      expect(sut.getRefresh[setIdx0][0]).toMatchObject({
        ...data0,
        nextHash: expect.objectContaining({
          ...data1,
          prevHash: expect.objectContaining(data0),
        }),
      });
    } else {
      expect(sut.getRefresh[setIdx0][0]).toMatchObject({
        ...data0,
      });
      expect(sut.getRefresh[setIdx1][0]).toMatchObject({
        ...data1,
      });
    }
  });

  test('Map set method should insert items in the correct iterator position and hash position', () => {
    const sut = new RefreshTokenMap();
    const dataOrder = ['0', '1', '8', '7', '9'];
    const data = dataOrder.map((item) => ({
      key: item,
      token: 'token' + item,
    }));

    data.forEach((data) => sut.set(data.key, data.token));

    const hashIndexes = sut.getRefresh.map((bucket) => {
      if (bucket[0] && bucket[1]) {
        return [bucket[0].key, bucket[1].key];
      }
      return [undefined, undefined];
    });

    let curr = sut.getHead;
    let iteratorOrder = [];
    while (curr) {
      iteratorOrder.push(curr.key);
      curr = curr.nextIterator;
    }

    expect(dataOrder).toEqual(iteratorOrder);

    for (let i = 0; i < hashIndexes.length; i++) {
      const bucket = sut.getRefresh[i];
      if (bucket[0] && bucket[1] && bucket[0] === bucket[1]) {
        expect(bucket[0].key).toBe(hashIndexes[i][0]);
      } else if (bucket[0] && bucket[1] && bucket[0] !== bucket[1]) {
        expect(bucket[0].nextHash).toEqual(bucket[1]);
        expect(bucket[1].prevHash).toEqual(bucket[0]);
      }
    }
  });
});
