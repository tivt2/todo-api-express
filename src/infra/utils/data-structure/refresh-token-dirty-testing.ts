import { RefreshTokenMap } from './refresh-token-map';

const myRefreshMap = new RefreshTokenMap();
myRefreshMap.set('0', 'token0');
myRefreshMap.set('1', 'token1');
myRefreshMap.set('1', 'token1_changed');
myRefreshMap.set('2', 'token2');
myRefreshMap.set('8', 'token8');
myRefreshMap.set('16', 'token16');
myRefreshMap.set('7', 'token7');
console.log();
console.log('BEFORE GROWING');
myRefreshMap.print();
myRefreshMap.set('9', 'token9');
console.log();
console.log('AFTER GROWING');
myRefreshMap.print();
console.log(
  myRefreshMap.get('1'),
  myRefreshMap.get('8'),
  myRefreshMap.get('16'),
  myRefreshMap.get('22'),
);
myRefreshMap.remove('22');
myRefreshMap.remove('16');
myRefreshMap.remove('1');
myRefreshMap.remove('0');
myRefreshMap.remove('9');
myRefreshMap.print();
