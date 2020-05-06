import React from "react";
import "./content.css";

import CustomFrame, { Main } from "./Main";

export class App extends React.Component {
  render() {
    return (
      <CustomFrame>
        <Main></Main>
      </CustomFrame>
    );
  }
}

export default App;
