import JobDetailView from "./components/jobs/job-detail-view";
import Layout from "./components/layout/layout";
import NoProjectSelected from "./components/layout/no-project-selected";
import Navbar from "./components/navigation/navbar";
import ProjectView from "./components/projects/project-view";
import { useStore } from "./store/store";

function App() {
    const { projects } = useStore();
    const { currentProjectId, currentJobId } = useStore();

    return (
        <Layout>
            <Navbar />
            {currentProjectId ? (
                currentJobId ? (
                    <JobDetailView />
                ) : (
                    <ProjectView />
                )
            ) : (
                <NoProjectSelected />
            )}
        </Layout>
    );
}

export default App;
