import React from 'react';
import ReactDOM from 'react-dom';
import './../styles.scss';

// Clock component -- to export to seperate module.
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

// NameForm component -- to export to seperate module.
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      echoesArray: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    const currentEchoes = this.state.echoesArray;
    const updatedEchoes = currentEchoes.concat(this.state.value);
    this.setState({ echoesArray: updatedEchoes });
    this.setState({value: ''});
    event.preventDefault();
  }

  render() {
    return (
      <div id="form-div">
        <form onSubmit={this.handleSubmit} autocomplete="off">
          <label>
            <input type="text" id="submit-field" value={this.state.value} onChange={this.handleChange} />
          </label><br></br>
          <input id="button" type="submit" value="Submit" onClick={this.handleSubmit}/>
          <Echoes echoes={this.state.echoesArray} />
        </form>
      </div>
    );
  }
}

class Echoes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      echo: [],
      count: 0,
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(this.state.count),
      2500
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick(count) {
    this.setState({
      echo: this.props.echoes[count],
    });
    this.setState({count: this.state.count + 1});
    //console.log('Count is ', this.state.count)
    if (this.state.count >= this.props.echoes.length) {
      //console.log('Resetting count');
      this.setState({ count: 0 });
    }
  }

  render() {
    return (
      <div>
        <div className="echo">{this.state.echo}</div>
      </div>
    );
  }

}


const App = () => {
  return(
    <div id="flex-container">
      <div id="main-content">
        <h1>Shout, shout<br></br>
          Let it all out:</h1>
        <NameForm />
      </div>
      {/*<Clock id="clock"/>*/}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))