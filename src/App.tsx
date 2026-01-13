import CssBaseline from "@mui/material/CssBaseline";
import { useStore } from "./store/store";

function App() {
    const { projects } = useStore();

    return (
        <>
            {/* <CssBaseline /> */}
            <div>
                <h1 className="text-3xl font-bold underline text-blue-500">
                    Tailwind v4 is Working!
                </h1>
            </div>
        </>
    );
}

export default App;
