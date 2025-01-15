import { IconBrandGithub } from "@tabler/icons-react";
import Navbar from "./Navbar";

const Layout = ({ children }: Props) => {
    return (
        <div style={{ minHeight: "100vh" }}>
            <Navbar />
            <main style={{ paddingTop: "55px" }}>{children}</main>
            <div
                style={{
                    bottom: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "50px",
                    backgroundColor: "#000",
                    color: "#fff",
                }}
            >
                <p style={{ margin:0, fontWeight:600 }}>All rights reserved 2025 - Movlex | Made by Bragatama</p>
            </div>
        </div>
    );
};

type Props = {
    children: React.ReactNode;
};

export default Layout;
