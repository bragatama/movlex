import Navbar from "./Navbar";

const Layout = ({ children }: Props) => {
    return (
        <div style={{ minHeight:'100vh' }}>
            <Navbar />
            <main style={{ paddingTop: '55px' }}>
                {children}
            </main>
        </div>
    );
}

type Props = {
    children: React.ReactNode
}

export default Layout;
