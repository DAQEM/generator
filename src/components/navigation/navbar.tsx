import logo from "@/assets/logo.svg";
import { Button } from "../ui/button";

const Navbar = () => {
    return (
        <header className="h-20 w-full px-4 py-2 bg-white">
            <div className="px-4 flex items-center justify-between h-full w-full">
                <img src={logo} alt="Logo" height="56px" width="130px" />
                <Button asChild>
                    <a
                        href="https://daqem.com/discord"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Join our Discord"
                    >
                        Join Our Discord
                    </a>
                </Button>
            </div>
        </header>
    );
};

export default Navbar;
