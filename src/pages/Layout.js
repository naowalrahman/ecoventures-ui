import { Outlet, Link } from "react-router-dom";
import './Layout.css';

const Layout = (props) => {
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
                            <Link className="link" to={`/locations/${props.userLoc}`}>Locations</Link>
                        </div>
                        <div>
                            <Link className="link" to="/aboutus">About Us</Link>
                        </div>
                        <div>
                        <Link className="link" to="/contactus">Contact Us</Link>
                            
                        </div>
                    </div>
                </div>
     

      <Outlet />
    </>
  )
};

export default Layout;