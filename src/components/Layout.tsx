import Navbar from "./Navbar";

const Layout = ({ children }: Props) => {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
        </>
    );
}

type Props = {
    children: React.ReactNode
}

export default Layout;
