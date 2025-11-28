import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaVideo, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";

import "./style.css";

const Sidebar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="sidebar">
            <h2 className="logo">短视频后台</h2>

            <nav className="menu">
                <Link to="/" className={pathname === "/" ? "active" : ""}>
                    <FaHome className="icon" />
                    推荐视频
                </Link>

                <Link to="/create" className={pathname === "/create" ? "active" : ""}>
                    <FaVideo className="icon" />
                    创作中心
                </Link>

                <Link to="/my" className={pathname === "/my" ? "active" : ""}>
                    <FaUser className="icon" />
                    我的主页
                </Link>

                <Link to="/settings" className={pathname === "/settings" ? "active" : ""}>
                    <FaCog className="icon" />
                    设置
                </Link>

                <div className="logout" onClick={logout}>
                    <FaSignOutAlt className="icon" />
                    退出登录
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
