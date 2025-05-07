import Header from "./Header";
import MenuSider from "./MenuSider";
import Main from "./Main";
import "./LayoutAdmin.css";

const LayoutAdmin = () => {
  return (
    <>
      {/* <h1>Layout Admin</h1> */}

      {/* <Layout className="layout-admin">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Main collapsed={collapsed} setCollapsed={setCollapsed} />
      </Layout> */}
      <div className="layout-admin">
        <Header />
        <MenuSider />
        <Main />
      </div>
    </>
  );
}

export default LayoutAdmin;