import React, { Component } from 'react';
import classnames from 'classnames';
import QrReader from 'react-qr-reader'
import './style.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      delay: 300,
      result: 'No result',
    }
    this.handleScan = this.handleScan.bind(this)
    console.log(this.props);
  }
  QRToHash(data) {
    let res = data.split(" ");
    return res[1];
    }
  handleScan(data) {
    if (data) {
      const hash = this.QRToHash(data);
      console.log(hash);
      this.setState({
        result: hash,
      })
    }
  }
  handleError(err) {
    console.error(err)
  }

  getMultiChainData(hash) {
    const cli = new FactomCli({
      host: '52.202.51.228',
      port: 8088,
      retry: {
        retries: 4,
        factor: 2,
        minTimeout: 500,
        maxTimeout: 2000
      }
    });


  }

  render() {
    const { className, ...props } = this.props;
    return (
        <div>
          <QrReader
            delay={this.state.delay}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: '25%' }}
          />
          <p>{this.state.result}</p>
        </div>
    );
  }
}

export default App;