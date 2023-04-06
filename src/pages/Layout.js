import { Outlet, Link } from "react-router-dom";
import './Layout.css';

const Layout = () => {
  return (
    <>
 <div className="header-container"> 
                    <div className="header-container-left">
                        <Link className="link" to="/">EcoVacations</Link>
                    </div>
                    <div className="header-container-line">
                      
                    </div>
                    <div className="header-container-right">
                        <div>
                            <Link className="link" to="/locations">Locations</Link>
                        </div>
                        <div>
                            <Link className="link" to="/aboutus">About Us</Link>
                        </div>
                        <div>
                        <Link className="link" to="/contactus">Contact Us</Link>
                            
                        </div>
                    </div>
                </div>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav> */}

      <Outlet />
    </>
  )
};

export default Layout;