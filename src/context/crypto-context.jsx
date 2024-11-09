import { createContext, useContext, useEffect, useState } from "react";
import { fakeFetchCrypto, fakeFetchAssets } from "../api.js";
import { precentDifference } from "../utils.js";

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("data")) || [];
    return storedData.map((asset) => ({
      ...asset,
      date: asset.date ? new Date(asset.date) : null,
    }));
  });

  function mapAssets(assets, result) {
    return assets.map((asset) => {
      const coin = result.find((c) => c.id === asset.id);
      return {
        grow: asset.price < coin.price,
        growPercent: precentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        name: coin.name,
        ...asset,
      };
    });
  }

  useEffect(() => {
    async function preload() {
      const { result } = await fakeFetchCrypto();
      if (assets.length === 0) {
        const fetchedAssets = await fakeFetchAssets();
        setAssets(mapAssets(fetchedAssets, result));
      } else {
        setAssets(mapAssets(assets, result));
      }
      setCrypto(result);
      setLoading(false);
    }
    preload();
  }, []);

  function addAsset(newAsset) {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto));
  }

  function removeAsset(assetId) {
    setAssets((prev) => prev.filter((asset) => asset.id !== assetId));
  }

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(assets));
  }, [assets]);

  const generateColors = () => {
    const colors = [];
    for (let i = 0; i < assets.length; i++) {
      const hue = (i * 360) / assets.length;
      colors.push(`hsl(${hue}, 100%, 50%)`);
    }
    return colors;
  };

  return (
    <CryptoContext.Provider
      value={{ crypto, assets, loading, addAsset, removeAsset, generateColors }}
    >
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
