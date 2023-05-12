import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import RotateLeftIcon from "@mui/icons-material/RotateLeft";

import { useState, useEffect } from "react";
import { Button } from "@mui/material";
export function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function BasicTabs() {
  const [word, setWord] = useState("");
  const [data, setData] = useState([]);
  const [riddle, setRiddle] = useState([]);
  const [fact, setFact] = useState("");
  const [value, setValue] = React.useState(0);
  const [isWordFlipped, setWordIsFlipped] = useState(false);
  const [isRiddleFlipped, setRiddleIsFlipped] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleWordFlipCard = () => {
    setWordIsFlipped(!isWordFlipped);
  };

  const handleRiddleFlipCard = () => {
    setRiddleIsFlipped(!isRiddleFlipped);
  };

  useEffect(() => {
    getRandomWord();
    getRiddle();
    getFact();
  }, []);

  useEffect(() => {
    if (word) {
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.title == "No Definitions Found") {
            setWord("");
            getRandomWord();
          } else {
            setData(data);
          }
        })
        .catch(() => getRandomWord());
    }
  }, [word]);

  function getRandomWord() {
    fetch("https://random-word-api.herokuapp.com/word?lang=en")
      .then((response) => response.json())
      .then((data) => {
        setWord(data);
        setData([]);
      })
      .catch((error) => console.error(error));
  }

  function getRiddle() {
    fetch("https://riddles-api.vercel.app/random").then((response) =>
      response.json().then((data) => {
        setRiddle([data.riddle, data.answer]);
      })
    );
  }

  function getFact() {
    fetch("https://uselessfacts.jsph.pl/api/v2/facts/random").then((response) =>
      response.json().then((data) => {
        setFact(data.text);
      })
    );
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "transparent" }}>
        <Tabs
          value={value}
          centered
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{
            style: {
              backgroundColor: "black",
            },
          }}
          textColor="inherit"
        >
          <Tab disableRipple label="Random Word" {...a11yProps(0)} />
          <Tab disableRipple label="Riddle" {...a11yProps(1)} />
          <Tab disableRipple label="Fun Fact" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Typography
          variant="h1"
          // fontFamily={"Bahnschrift SemiLight"}
          sx={{ alignSelf: "left", paddingLeft: "5%", paddingTop: "12%" }}
        >
          Random <br />
          Word
          <br />
          <Button
            variant="text"
            color="inherit"
            onClick={() => {
              getRandomWord();
            }}
          >
            See another
          </Button>
        </Typography>

        <Box sx={{ minWidth: 275 }}>
          <Card
            className="card-behind-behind-behind"
            sx={{
              width: "32vw",
              minWidth: "275px",
              minHeight: "275px",
              height: "32vw",
              backgroundColor: "#ffbc4b  ",
            }}
          ></Card>
          <Card
            className="card-behind-behind"
            sx={{
              width: "32vw",
              minWidth: "275px",
              minHeight: "275px",
              height: "32vw",
              backgroundColor: "#4f9bf4  ",
            }}
          ></Card>
          <Card
            className="card-behind"
            sx={{
              width: "32vw",
              minWidth: "275px",
              minHeight: "275px",
              height: "32vw",
              backgroundColor: "#f37ba3  ",
            }}
          ></Card>

          <Card
            sx={{ overflow: "auto" }}
            className={`card ${isWordFlipped ? "back" : "front"}`}
          >
            {isWordFlipped ? (
              <>
                {Array.isArray(data) &&
                  data.map((entry) => (
                    <div
                      key={entry.word}
                      style={{
                        height: "100%",
                        alignItems: "center",
                      }}
                    >
                      {entry.meanings.map((meaning) => (
                        <>
                          <Typography variant="h3" sx={{ padding: "3%" }}>
                            {meaning.partOfSpeech}
                          </Typography>
                          <ul>
                            {meaning.definitions.map((definition, index) => (
                              <li key={index}>
                                <Typography variant="h4">
                                  {definition.definition}
                                </Typography>
                              </li>
                            ))}
                          </ul>
                        </>
                      ))}
                    </div>
                  ))}
              </>
            ) : (
              <>
                {Array.isArray(data) &&
                  data
                    .filter(
                      (entry, index, self) =>
                        self.findIndex((e) => e.word === entry.word) === index
                    )
                    .map((entry) => (
                      <Typography
                        variant="h2"
                        sx={{ padding: "3%" }}
                        gutterBottom
                        key={entry.word}
                      >
                        {entry.word}
                      </Typography>
                    ))}
              </>
            )}

            <RotateLeftIcon
              onClick={handleWordFlipCard}
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
              }}
            />
          </Card>
        </Box>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Box sx={{ minWidth: 275 }}>
          <Typography
            variant="h1"
            sx={{ alignSelf: "left", paddingLeft: "5%", paddingTop: "12%" }}
          >
            Riddle
            <br />
            <Button
              variant="text"
              color="inherit"
              onClick={() => {
                getRiddle();
              }}
            >
              See another
            </Button>
          </Typography>

          <Card
            className="card-behind-behind-behind"
            sx={{
              width: "32vw",
              minWidth: "275px",
              minHeight: "275px",
              height: "32vw",
              backgroundColor: "#6900ba  ",
            }}
          ></Card>
          <Card
            className="card-behind-behind"
            sx={{
              width: "32vw",
              minWidth: "275px",
              minHeight: "275px",
              height: "32vw",
              backgroundColor: "#c9f061  ",
            }}
          ></Card>
          <Card
            className="card-behind"
            sx={{
              width: "32vw",
              minWidth: "275px",
              minHeight: "275px",
              height: "32vw",
              backgroundColor: "#ffbc4b  ",
            }}
          ></Card>
          <Card className="card" sx={{ overflow: "auto" }}>
            {isRiddleFlipped ? (
              <Typography variant="h4" sx={{ padding: "3%" }}>
                Answer: {riddle[1]}
              </Typography>
            ) : (
              <div style={{ height: "100%", alignContent: "center" }}>
                <Typography variant="h4" sx={{ padding: "3%" }}>
                  {riddle[0]}
                </Typography>
              </div>
            )}

            <RotateLeftIcon
              onClick={handleRiddleFlipCard}
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
              }}
            />
          </Card>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography
          variant="h1"
          sx={{ alignSelf: "left", paddingLeft: "5%", paddingTop: "12%" }}
        >
          Fun Fact
          <br />
          <Button
            variant="text"
            color="inherit"
            onClick={() => {
              getFact();
            }}
          >
            See another
          </Button>
        </Typography>
        <Box sx={{ minWidth: 275 }}>
          <Card
            className="card-behind-behind-behind"
            sx={{
              width: "32vw",
              minWidth: "275px",
              minHeight: "275px",
              height: "32vw",
              backgroundColor: "#6900ba  ",
            }}
          ></Card>
          <Card
            className="card-behind-behind"
            sx={{
              width: "32vw",
              minWidth: "275px",
              minHeight: "275px",
              height: "32vw",
              backgroundColor: "#c9f061  ",
            }}
          ></Card>
          <Card
            className="card-behind"
            sx={{
              width: "32vw",
              minWidth: "275px",
              minHeight: "275px",
              height: "32vw",
              backgroundColor: "#ffbc4b  ",
            }}
          ></Card>
          <Card className="card" sx={{ overflow: "auto" }}>
            <div style={{ height: "100%", alignContent: "center" }}>
              <Typography variant="h4" sx={{ padding: "3%" }}>
                {fact}
              </Typography>
            </div>
          </Card>
        </Box>
      </TabPanel>
    </Box>
  );
}
