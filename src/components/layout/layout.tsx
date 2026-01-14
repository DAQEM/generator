const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans">
            <main className="flex-1 overflow-y-auto h-full relative">
                {children}
            </main>
        </div>
    );
};

export default Layout;
