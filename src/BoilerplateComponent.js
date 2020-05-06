/*global chrome*/

import React, { useState, useEffect } from "react";
import { debounce } from "throttle-debounce";
import {
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  FormHelperText,
  makeStyles,
  CardActionArea,
  CircularProgress,
} from "@material-ui/core";

const logo = "https://i.ibb.co/hBwtzJ1/logo.png";
const backgroundImg = "https://i.ibb.co/XzYbXYQ/Background.png";
const baseURL = "https://hatchways.io";
const styles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
    height: 750,
    border: "none",
    boxShadow: theme.shadows[1],
  },
  containerGrid: {
    padding: "10px 10px 10px",
  },
  background: {
    minHeight: "calc(100vh - 60px)",
    width: "calc(100% - 20px)",
    position: "absolute",
    top: 60,
    backgroundSize: "contain",
    backgroundPosition: "bottom center",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${backgroundImg})`,
  },
  logo: {
    width: 75,
    height: 75,
    objectFit: "cover",
    display: "block",
    margin: "auto",
    marginBottom: 15,
    borderRadius: "50%",
    background: "white",
  },

  marginBottom: {
    marginBottom: theme.spacing.unit * 2,
  },
  alignCenter: {
    textAlign: "center",
  },

  white: {
    color: "white",
  },
}));

//This allows you to fetch data from this popup by proxing it via the app background.js
function fetchSomething(input, init) {
  if (!chrome) {
    throw Error("No fetching in test mode");
  }
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ input, init }, (messageResponse) => {
      const [response, error] = messageResponse;
      if (response === null) {
        reject(error);
      } else {
        const body = response.body ? new Blob([response.body]) : undefined;
        resolve(
          new Response(body, {
            status: response.status,
            statusText: response.statusText,
          })
        );
      }
    });
  });
}
export default function BoilerplateComponent(props) {
  const classes = styles();

  return (
    <div className={classes.background}>
      <Grid container name="home" className={classes.containerGrid}>
        <img className={classes.logo} alt="" src={logo} />

        <Grid
          item
          container
          alignItems="flex-start"
          className={classes.mainItem}
        >
          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            lg={5}
            className={classes.homeTextBlock}
          >
            <Typography variant="h4" className={classes.alignCenter}>
              Boilerplate
            </Typography>
            <Grid container alignItems="center"></Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
