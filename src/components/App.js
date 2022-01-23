import './App.css';
import Header from './Header';
import { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      "folder": ""
    }
  }

  send(event) {
    window.electron.send(event);
  }

  render() {
    return (
      <div className="App">
        <Header title="Rules selection"/>

        <button id="selectFolder" onClick={() => this.send("open_directory_dialog")}>Select folder</button>
        <button id="applyButton" onClick={() => this.send("set_folder")}>Apply</button>

        {/*Create condition*/}
        <form onSubmit={() => this.send("create_condition")}>
          <label htmlFor="name">Condition name</label>
          <input name="name" id="name" type="text" />
          <label htmlFor="property">Property</label>
          <select name="property" id="property">
            <option value="size">Size</option>
            <option value="extension">Extension</option>
            <option value="start">Name starting with</option>
          </select>
          <label htmlFor="value"></label>
          <input name="value" id="value" type="text" />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
