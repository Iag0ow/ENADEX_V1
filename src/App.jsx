import "./App.css";
import { AuthContextProvider } from "./context/AuthContextProvider";
import AppRoutes from "./routes";

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
