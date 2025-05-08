import { FaBars } from "react-icons/fa";

const Header = () => {
  return (
    <>
      {/* Top header */}
      <div className="top-header">
        <div className="container">
          <div className="inner-wrap">
            <div className="inner-item">
              <i className="fa-solid fa-phone"></i> 0903.727.691
            </div>
            <div className="inner-item">
              <i className="fa-solid fa-envelope"></i> hoangkhoi@contact.com
            </div>
            <div className="inner-item">
              <i className="fa-solid fa-building"></i> Số 123, đường ABC, thành phố XYZ
            </div>
          </div>
        </div>
      </div>
      {/* End top header */}

      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="inner-wrap">
            <button className="inner-menu-mobile-button">
              <FaBars />
            </button>
            <div className="inner-logo">
              <a href="index.html">
                <img src="/logo.png" alt="Logo" />
              </a>
            </div>
            <nav className="inner-menu menu-sider">
              <ul>
                <li>
                  <a href="index.html" className="active">
                    Trang Chủ
                  </a>
                </li>
                <li>
                  <a href="#">
                    Tour Trong Nước
                  </a>
                  <i className="fa-solid fa-caret-down"></i>
                  <ul>
                    <li>
                      <a href="#">
                          Tour Miền Bắc
                      </a>
                    </li>
                    <li>
                      <a href="#">
                          Tour Miền Trung
                      </a>
                    </li>
                    <li>
                      <a href="#">
                          Tour Miền Nam
                      </a>
                    </li>
                    <li>
                      <a href="#">
                          Tour Xuyên Việt
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">
                    Tour Nước Ngoài
                  </a>
                  <i className="fa-solid fa-caret-down"></i>
                  <ul>
                    <li>
                      <a href="#">
                        Tour Châu Á
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Tour Châu Âu
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Tour Châu Mỹ
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Tour Châu Úc
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">
                    Tin Tức
                  </a>
                </li>
                <li>
                  <a href="#">
                    Liên Hệ
                  </a>
                </li>
              </ul>
              <div className="inner-overlay"></div>
            </nav>
            <div className="inner-cart">
              <a href="#">
                <img src="/icon-cart.svg" alt="Cart" />
                <span>1</span>
              </a>
            </div>
          </div>
          <button className="inner-menu-mobile-button-cancel">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </header>
      {/* Header */}

    </>
  );
}

export default Header;