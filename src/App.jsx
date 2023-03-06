import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/theme";
import { DashboardContainer, MiddleContainer } from "./theme/styled";
import { Map } from "./pages/allPages";
import TopNav from "./components/TopNav";
import LeftNav from "./components/LeftNav";

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <TopNav />
        <DashboardContainer>
          <LeftNav />
          <MiddleContainer>
            <Map />
          </MiddleContainer>
        </DashboardContainer>
      </ThemeProvider>
    </div>
  );
};

export default App;
