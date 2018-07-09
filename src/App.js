import React, { Component } from "react";
import AmiiboCard from "./components/AmiiboCard";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Container from "./Container";
import Row from "./Row";
import Column from "./Column";
import amiibos from "./amiibos.json";
import "./App.css";

function shuffleAmiibos(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

class App extends Component {
  state = {
    amiibos,
    currentScore: 0,
    topScore: 0,
    rightWrong: "",
    clicked: [],
  };

  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.handleReset();
    }
  };

  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore,
      rightWrong: ""
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore });
    }
    else if (newScore === 12) {
      this.setState({ rightWrong: "You win!" });
    }
    this.handleShuffle();
  };

  handleReset = () => {
    this.setState({
      currentScore: 0,
      topScore: this.state.topScore,
      rightWrong: "Game Over!!",
      clicked: []
    });
    this.handleShuffle();
  };

  handleShuffle = () => {
    let shuffledAmiibos = shuffleAmiibos(amiibos);
    this.setState({ amiibos: shuffledAmiibos });
  };

  render() {
    return (
      <Wrapper>
        <Nav
          title="Amiibo Clicky Game"
          score={this.state.currentScore}
          topScore={this.state.topScore}
          rightWrong={this.state.rightWrong}
        />

        <Title>
          Try to click on each Amiibo, but if you click on one twice you lose!!!
        </Title>

        <Container>
          <Row>
            {this.state.amiibos.map(Amiibo => (
              <Column size="md-3 sm-6">
                <AmiiboCard
                  key={Amiibo.id}
                  handleClick={this.handleClick}
                  handleIncrement={this.handleIncrement}
                  handleReset={this.handleReset}
                  handleShuffle={this.handleShuffle}
                  id={Amiibo.id}
                  image={Amiibo.image}
                />
              </Column>
            ))}
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

export default App;