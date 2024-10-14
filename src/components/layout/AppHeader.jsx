import styles from "./styles.module.scss";
import { Button, Drawer, Layout, Modal, Select, Space, message } from "antd";
import { useCrypto } from "../../context/crypto-context";
import { useEffect, useRef, useState } from "react";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetForm from "../AddAssetForm";

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 70,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#001529",
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
};

export default function AppHeader() {
  const { crypto, loading } = useCrypto();
  // const [select, setSelect] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [coin, setCoin] = useState(null);
  const selectRef = useRef(null);

  useEffect(() => {
    const keypress = (e) => {
      if (e.key === "/" || e.key === ".") {
        // setSelect((prev) => !prev);
        selectRef.current.focus();
      }
    };
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, []);
  useEffect(() => {
    if (loading) {
      messageApi.open({
        key: "updatable",
        type: "loading",
        content: "Loading...",
        duration: 0,
      });
    } else {
      messageApi.open({
        key: "updatable",
        type: "success",
        content: "Loaded!",
        duration: 0.5,
      });
    }
  }, [loading, messageApi]);
  const success = () => {
    messageApi.destroy();
    messageApi.open({
      type: "success",
      content: "Success!",
      duration: 0.9,
    });
  };
  const error = () => {
    messageApi.destroy();
    messageApi.open({
      type: "error",
      content: "Error!",
      duration: 0.9,
    });
  };

  function handleSelect(value) {
    setCoin(crypto.find((c) => c.id === value));
    setModal(true);
  }

  return (
    <>
      {contextHolder}
      <Layout.Header style={headerStyle}>
        <Select
          className={styles.select}
          ref={selectRef}
          // onClick={() => setSelect((prev) => !prev)}
          // open={select || select}
          onSelect={handleSelect}
          loading={loading}
          size="large"
          style={{ width: 250 }}
          value="press / to open"
          options={crypto.map((coin) => ({
            label: coin.name,
            value: coin.id,
            icon: coin.icon,
          }))}
          optionRender={(option) => (
            <Space style={{ height: "30px" }}>
              <img
                style={{ width: "20px" }}
                src={option.data.icon}
                alt="изображение монеты"
              />{" "}
              {option.data.label}
            </Space>
          )}
        />
        <Button onClick={() => setDrawer(true)} type="primary">
          add Asset
        </Button>

        <Modal
          title={null}
          open={modal}
          onOk={null}
          onCancel={() => setModal(false)}
          footer={null}
        >
          <CoinInfoModal coin={coin} />
        </Modal>

        <Drawer
          title="Add Asset"
          width={600}
          onClose={() => {
            setDrawer(false);
          }}
          open={drawer}
          destroyOnClose
        >
          <AddAssetForm
            handleSuccess={success}
            onFinishFailedForm={error}
            onClose={() => setDrawer(false)}
          />
        </Drawer>
      </Layout.Header>
    </>
  );
}
