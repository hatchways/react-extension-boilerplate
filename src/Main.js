import React, { useState } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import BoilerplateComponent from "./BoilerplateComponent";
import PropTypes from "prop-types";
import { create } from "jss";
import { withStyles, jssPreset } from "@material-ui/core/styles";

import { StylesProvider } from "@material-ui/styles";
import NoSsr from "@material-ui/core/NoSsr";
import rtl from "jss-rtl";
import Frame from "react-frame-component";

export function Main(props) {
  return (
    <MuiThemeProvider theme={theme}>
      <BoilerplateComponent classes={props.classes}></BoilerplateComponent>
    </MuiThemeProvider>
  );
}

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
    height: 750,
    border: "none",
    boxShadow: theme.shadows[1],
  },
});

class CustomFrame extends React.Component {
  constructor() {
    super();
    this.state = {
      ready: false,
    };
    this.handleRef = (ref) => {
      this.contentDocument = ref ? ref.node.contentDocument : null;
      this.contentWindow = ref ? ref.node.contentWindow : null;
    };
    this.onContentDidMount = () => {
      this.setState({
        ready: true,
        jss: create({
          plugins: [...jssPreset().plugins, rtl()],
          insertionPoint: this.contentWindow["demo-frame-jss"],
        }),
        sheetsManager: new Map(),
        container: this.contentDocument.body,
      });
    };

    this.onContentDidUpdate = () => {
      this.contentDocument.body.dir = this.props.theme.direction;
    };
  }

  render() {
    const { children, classes } = this.props;

    // NoSsr fixes a strange concurrency issue with iframe and quick React mount/unmount
    return (
      <NoSsr>
        <Frame
          ref={this.handleRef}
          className={classes.root}
          contentDidMount={this.onContentDidMount}
          contentDidUpdate={this.onContentDidUpdate}
        >
          <div id="demo-frame-jss" />
          {this.state.ready ? (
            <StylesProvider
              jss={this.state.jss}
              sheetsManager={this.state.sheetsManager}
            >
              {React.cloneElement(children, {
                classes: this.props.classes,
                container: this.state.container,
              })}
            </StylesProvider>
          ) : null}
        </Frame>
      </NoSsr>
    );
  }
}

CustomFrame.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(CustomFrame);
