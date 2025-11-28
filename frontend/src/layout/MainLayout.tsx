import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />

            <div style={{ marginLeft: "240px", padding: "20px", width: "100%" }}>
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
