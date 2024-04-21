import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
