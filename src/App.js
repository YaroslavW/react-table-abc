import React, { Component } from 'react';


class App extends Component {
  async componentDidMount() {
    const response = await fetch(` http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`)
    const data = await response.json()
    console.log(data)

  }
  render() {
    return (
      <div className="container">
        My App
      </div>
    );
  }
}

export default App;
