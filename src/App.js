import React from 'react';
import './App.scss';

import Card from './components/Card';

class App extends React.Component {
  state = {
    mode: 'betting',
    wallet: 1000,
    currentBet: 0,
    currentHand: [],
    totalValue: 0,
    dealerHand: [],
    dealerValue: 0,
    playerName: 'Ash'
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
    }, () => {
      if (this.state.totalValue === 21) {
        this.setState({
          mode: 'blackjack',
          wallet: this.state.wallet + (this.state.currentBet * 1.5)
        });
      }
    });
  }

  getEndState = () => {
    if (this.state.dealerValue > 21 || this.state.totalValue > this.state.dealerValue) {
      this.setState({
        mode: 'win',
        wallet: this.state.wallet + this.state.currentBet
      });
    } else if (this.state.dealerValue === this.state.totalValue) {
      this.setState({ mode: 'push' });
    } else if (this.state.totalValue < this.state.dealerValue) {
      this.setState({ mode: 'lose' });
    }
  }

  dealCard = () => {
    const currentHand = [...this.state.currentHand];
    currentHand.push(new Card());
    this.setState({
      totalValue: this.getValue(currentHand),
      currentHand
    }, () => {
      if (this.state.totalValue > 21) {
        this.setState({
          mode: 'bust',
          wallet: this.state.wallet - this.state.currentBet
         });
      }
    });
  }

  dealersTurn = () => {
    const dealerHand = [...this.state.dealerHand];
    let dealerValue = this.state.dealerValue;
    while (dealerValue < 17) {
      dealerHand.push(new Card());
      dealerValue = this.getValue(dealerHand);
    }
    this.setState({
      dealerHand,
      dealerValue
    }, this.getEndState);
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
      <main className="main">
        <div className="main-panel">
          <section className="section-dealer">
          <h1>Blackjack</h1>
          <h2>Dealer's Hand</h2>
          <dl>
            <dt>Value</dt>
            <dd>{this.state.dealerValue}</dd>
          </dl>
          <ul className="cards-container">
          {this.state.dealerHand.map((card, i) => (
            <li key={`dealerCard${i}`} className="card">{card.name} of {card.suit}</li>
            ))}
          </ul>
          </section>
          <section className="section-result d-flex align-items-center">
            {this.state.mode === 'bust' && <p>Bust!</p>}
            {this.state.mode === 'win' && <p>You Win!</p>}
            {this.state.mode === 'push' && <p>Push!</p>}
            {this.state.mode === 'blackjack' && <p>Blackjack!</p>}
          </section>
          <section className="section-player">
            <h2 className="mb-3">{ this.state.playerName }</h2>
            {this.state.mode === 'betting' && (
            <form className="bet-actions mb-5" onSubmit={this.submitBet}>
              <label><span className="visually-hidden">Bet</span>
                <input type="number" value={this.state.currentBet} onChange={this.handleBet} />
              </label>
              <button type="submit">Place Bet</button>
            </form>
            )}
            {this.state.mode === 'playing' && (
              <div className="play-actions">
                <button type="button" onClick={this.dealCard}>Hit</button>
                <button type="button" onClick={this.dealersTurn}>Stand</button>
              </div>
            )}
            {this.state.mode !== 'betting' && (
              <>
                <dl>
                  <dt>Value</dt>
                  <dd>{this.state.totalValue}</dd>
                </dl>
                <ul className="cards-container">
                {this.state.currentHand.map((card, i) => (
                  <li key={`card${i}`} className="card">{card.name} of {card.suit}</li>
                  ))}
                </ul>
              </>
            )}
            <dl className="d-flex justify-content-evenly">
              <div>
                <dt>Current Bet</dt>
                <dd>{this.state.currentBet}</dd>
              </div>
              <div>
                <dt>Wallet</dt>
                <dd>{this.state.wallet}</dd>
              </div>
            </dl>
          </section>
        </div>
        <aside className="players-panel">
          <h2>Other Players</h2>
          <p>Coming soon...</p>
        </aside>
      </main>
    );
  }
}

export default App;
