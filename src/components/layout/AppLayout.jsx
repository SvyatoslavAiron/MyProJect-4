import { Layout } from "antd";
import AppHeader from "./AppHeader";
import AppSider from "./AppSider";
import AppContent from "./AppContent";

export default function AppLayout() {
  return (
    <div className="wrapper" style={{ backgroundColor: "#001529" }}>
      <Layout style={{ maxWidth: "2000px", margin: "0 auto" }}>
        <AppHeader />
        <Layout>
          <AppSider />
          <AppContent />
        </Layout>
      </Layout>
    </div>
  );
}
