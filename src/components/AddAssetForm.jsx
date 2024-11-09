import {
  Button,
  DatePicker,
  Divider,
  Flex,
  Form,
  InputNumber,
  Result,
  Select,
  Space,
  Typography,
} from "antd";
import { useRef, useState } from "react";
import { useCrypto } from "../context/crypto-context";

export default function AddAssetForm({
  onClose,
  onFinishFailedForm,
  handleSuccess,
}) {
  const { crypto, loading, addAsset } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);
  const assetRef = useRef();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Success!",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Error!",
    });
  };

  if (submitted) {
    return (
      <>
        <Result
          status="success"
          title="New Asset Added"
          subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
          extra={[
            <Button type="primary" key="console" onClick={onClose}>
              Close
            </Button>,
          ]}
        />
      </>
    );
  }

  if (!coin) {
    return (
      <>
        <Select
          style={{ width: "100%" }}
          filterOption
          onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
          loading={loading}
          size="large"
          placeholder="Select coin"
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
      </>
    );
  }

  function onFinish(values) {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    };
    assetRef.current = newAsset;
    addAsset(newAsset);
    handleSuccess();
    setSubmitted(true);
  }

  const validateMessages = {
    required: "'${label}' is required!",
    types: {
      number: "${label} is not valid number",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  function handleAmountChange(value) {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  }

  function handlePriceChange(value) {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(amount * value).toFixed(2),
    });
  }

  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 10,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          price: coin.price.toFixed(3),
        }}
        validateMessages={validateMessages}
        onFinish={onFinish}
        onFinishFailed={onFinishFailedForm}
      >
        <Flex align="center">
          <img
            src={coin.icon}
            alt={coin.name}
            style={{ width: "40px", marginRight: "10px" }}
          />
          <Typography.Title style={{ margin: 0 }} level={2}>
            {coin.name}
          </Typography.Title>
        </Flex>

        <Divider />
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
            },
          ]}
        >
          <InputNumber
            autoFocus
            placeholder="Enter coin amount"
            onChange={handleAmountChange}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item label="Price" name="price">
          <InputNumber onChange={handlePriceChange} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Date & Time" name="date">
          <DatePicker showTime />
        </Form.Item>
        <Form.Item label="Total" name="total">
          <InputNumber disabled style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Asset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
