import React from 'react';
import './App.css';

import Card from './components/Card';

class App extends React.Component {
  state = {
    mode: 'betting',
    wallet: 1000,
    currentBet: 0,
    currentHand: [],
    totalValue: 0,
    dealerHand: [],
    dealerValue: 0
  }

  getValue = cards => {
    return cards.reduce((acc, curr) => acc + curr.value, 0);
  }

  dealHands = () => {
    const currentHand = [new Card(), new Card()];
    const dealerHand = [new Card(), new Card()];
    this.setState({
      totalValue: this.getValue(currentHand),
      dealerValue: this.getValue(dealerHand),
      currentHand,
      dealerHand
    });
  }

  getEndState = () => {
    if (this.state.totalValue > 21) {
      this.setState({ mode: 'bust' });
    } else if (this.state.dealerValue > 21 || this.state.totalValue > this.state.dealerValue) {
      this.setState({ mode: 'win' });
    } else if (this.state.dealerValue === this.state.totalValue) {
      this.setState({ mode: 'push' });
    }
  }

  dealCard = () => {
    const currentHand = [...this.state.currentHand];
    currentHand.push(new Card());
    this.setState({
      totalValue: this.getValue(currentHand),
      currentHand
    }, this.getEndState);
  }

  dealersTurn = () => {
    const dealerHand = [...this.state.dealerHand];
    while (this.dealerValue < 17) {
      dealerHand.push(new Card());
    }
    this.getEndState();
  }

  handleBet = (e) => {
    this.setState({ currentBet: e.target.value });
  }

  submitBet = () => {
    this.setState({ mode: 'playing' });
    this.dealHands();
  }

  render() {
    return (
      <main>
        <h1>Blackjack</h1>
        {this.state.mode === 'betting' && (
        <form class="bet-actions" onSubmit={this.submitBet}>
          <label>Bet
            <input type="number" value={this.state.currentBet} onChange={this.handleBet} />
          </label>
          <button type="submit">Bet</button>
        </form>
        )}
        {this.state.mode === 'playing' && (
        <div class="play-actions">
          <button type="button" onClick={this.dealCard}>Hit</button>
          <button type="button" onClick={this.dealersTurn}>Stand</button>
        </div>
        )}
        {this.state.mode === 'bust' && <p>Bust!</p>}
        {this.state.mode === 'win' && <p>You Win!</p>}
        {this.state.mode === 'push' && <p>Push!</p>}
        <h2>Dealer's Hand</h2>
        <dl>
          <dt>Value</dt>
          <dd>{this.state.dealerValue}</dd>
        </dl>
        <ul>
        {this.state.dealerHand.map((card, i) => (
          <li key={`dealerCard${i}`}>{card.name} of {card.suit}</li>
          ))}
        </ul>
        <h2>Your Hand</h2>
        <dl>
          <dt>Current Bet</dt>
          <dd>{this.state.currentBet}</dd>
          <dt>Value</dt>
          <dd>{this.state.totalValue}</dd>
        </dl>
        <ul>
        {this.state.currentHand.map((card, i) => (
          <li key={`card${i}`}>{card.name} of {card.suit}</li>
        ))}
        </ul>
      </main>
    );
  }
}

export default App;
