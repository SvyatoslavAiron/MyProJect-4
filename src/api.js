import { cryptoData, cryptoAssets } from "./data.js";

let hasFetchedCrypto = false;
let hasFetchedAssets = false;

export function fakeFetchCrypto() {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!hasFetchedCrypto) {
        hasFetchedCrypto = true;
        resolve(cryptoData);
      }
    }, 2000);
  });
}

export function fakeFetchAssets() {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!hasFetchedAssets) {
        hasFetchedAssets = true;
        resolve(cryptoAssets);
      } else {
        resolve(null);
      }
    }, 2000);
  });
}
