import { Flex, Typography } from "antd";

export default function CoinInfo({ coin, withSymbol }) {
  <Flex align="center">
    <img
      src={coin.icon}
      alt={coin.name}
      style={{ width: "40px", marginRight: "10px" }}
    />
    <Typography.Title style={{ margin: 0 }} level={2}>
      {withSymbol && coin.symbol} {coin.name}
    </Typography.Title>
  </Flex>
}
