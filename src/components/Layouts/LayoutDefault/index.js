import Header from "./Header";
import Main from "./Main";
import "./LayoutDefault.css";

const LayoutDefault = () => {
  return (
    <>
      <div className="layout-default">
        <Header />
        <Main />
        {/* <Footer /> */}
        Footer
      </div>
    </>
  );
}

export default LayoutDefault;