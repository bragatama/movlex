import Navbar from "./Navbar";

const Layout = ({ children }: Props) => {
    return (
        <>
            <Navbar />
            <main style={{ paddingTop: '55px' }}>
                {children}
            </main>
        </>
    );
}

type Props = {
    children: React.ReactNode
}

export default Layout;
