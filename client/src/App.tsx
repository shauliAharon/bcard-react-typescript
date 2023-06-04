import "./App.css";
import Layout from "./layout/Layout";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { ThemeProvider } from "./providers/ThemeProvider";
import { SnackbarProvider } from "./providers/SnackbarProvider";
import { UserProvider } from "./users/providers/UserProvider";
// import LandingPage from "./layout/LandingPage";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>       
        <ThemeProvider>
          <SnackbarProvider>
            <UserProvider>
                <Layout>    
                <Router />
              </Layout>
            </UserProvider>
          </SnackbarProvider>
        </ThemeProvider>           
      </BrowserRouter>
    </div>
  );
};

export default App;
