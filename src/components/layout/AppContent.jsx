import { Flex, Layout, Typography } from "antd";
import { useCrypto } from "../../context/crypto-context";
import PortfolioChart from "../PortfolioChart";
import AssetsTable from "../AssetsTable";

const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#001529",
  marginBottom: "20px",
};

export default function AppContent() {
  const { assets, crypto } = useCrypto();

  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price;
    return acc;
  }, {});
  const totalPortfolioValue = assets
    .map((asset) => {
      const price = cryptoPriceMap[asset.id];
      return price ? asset.amount * price : 0;
    })
    .reduce((acc, v) => acc + v, 0);

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: "left", color: "#fff" }}>
        Portfolio: {totalPortfolioValue.toFixed(2)}$
      </Typography.Title>

      <div className="ant-layout-content__container">
        <PortfolioChart />
        <AssetsTable />
      </div>
    </Layout.Content>
  );
}
