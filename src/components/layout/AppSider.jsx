import styles from "./styles.module.scss";
import { Card, Statistic, List, Skeleton, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { capitalize } from "../../utils.js";
import { useContext } from "react";
import CryptoContext from "../../context/crypto-context.jsx";

export default function AppSider() {
  const { assets, loading, generateColors } = useContext(CryptoContext);
  const colors = generateColors();
  const nameCount = {};

  return (
    <>
      {loading ? (
        <aside className={styles.aside}>
          <Card style={{ marginBottom: "1rem", minHeight: "250px" }}>
            <Skeleton.Input
              active
              width
              block
              style={{ height: "20px", width: "60px", marginBottom: "10px" }}
            />
            <Skeleton.Input
              active
              width
              style={{ height: "40px", width: "250px", marginBottom: "15px" }}
            />
            <Skeleton.Input active block style={{ height: "116px" }} />
          </Card>
          <Card style={{ marginBottom: "1rem", minHeight: "250px" }}>
            <Skeleton.Input
              active
              width
              block
              style={{ height: "20px", width: "60px", marginBottom: "10px" }}
            />
            <Skeleton.Input
              active
              width
              style={{ height: "40px", width: "250px", marginBottom: "15px" }}
            />
            <Skeleton.Input active block style={{ height: "116px" }} />
          </Card>
          <Card style={{ marginBottom: "1rem", minHeight: "250px" }}>
            <Skeleton.Input
              active
              width
              block
              style={{ height: "20px", width: "60px", marginBottom: "10px" }}
            />
            <Skeleton.Input
              active
              width
              style={{ height: "40px", width: "250px", marginBottom: "15px" }}
            />
            <Skeleton.Input active block style={{ height: "116px" }} />
          </Card>
        </aside>
      ) : (
        <aside className={styles.aside}>
          {assets.map((asset, index) => {
            if (nameCount[asset.id]) {
              nameCount[asset.id]++;
            } else {
              nameCount[asset.id] = 1;
            }

            return (
              <Card
                key={`${asset.id}-${index}`}
                style={{ marginBottom: "1rem" }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Statistic
                    style={{
                      marginBottom: "20px",
                    }}
                    // title={capitalize(asset.id)}
                    title={
                      nameCount[asset.id] === 1
                        ? capitalize(asset.id)
                        : `${capitalize(asset.id)} (${nameCount[asset.id] - 1})`
                    }
                    value={asset.totalAmount}
                    precision={2}
                    valueStyle={{
                      color: asset.grow ? "#3f8600" : "#cf1322",
                    }}
                    prefix={
                      asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />
                    }
                    suffix="$"
                  />
                  <a href="#header"
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: colors[index],
                    }}
                  ></a>
                </div>
                <List
                  size="small"
                  bordered
                  dataSource={[
                    {
                      title: "Total Profit",
                      value: asset.totalProfit,
                      withTag: true,
                    },
                    {
                      title: "Asset Amount",
                      value: asset.amount,
                      isPlain: true,
                    },
                    {
                      title: "Date",
                      value:
                        asset.date.toLocaleTimeString() +
                        " / " +
                        asset.date.toLocaleDateString(),
                      isPlain: true,
                    },
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <span>{item.title}</span>
                      {item.withTag && (
                        <Tag color={asset.grow ? "green" : "red"}>
                          {asset.growPercent.toFixed(2)}%
                        </Tag>
                      )}
                      {item.isPlain && <span>{item.value}</span>}
                      {!item.isPlain && (
                        <span style={{ color: asset.grow ? "green" : "red" }}>
                          {item.value.toFixed(2)}$
                        </span>
                      )}
                    </List.Item>
                  )}
                />
              </Card>
            );
          })}
        </aside>
      )}
    </>
  );
}
