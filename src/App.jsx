import "./App.css";
import { AuthContextProvider } from "./context/AuthContextProvider";
import AppRoutes from "./routes";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <>
      <AuthContextProvider>
        <AppRoutes />
      </AuthContextProvider>
    </>
  );
}

export default App;
