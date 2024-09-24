import React, { Component } from "react";
import ChromebookDataService from "../services/chromebook.service";
import { Link } from "react-router-dom";

export default class ChromebooksList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchSerialNumber = this.onChangeSearchSerialNumber.bind(this);
    this.retrieveChromebooks = this.retrieveChromebooks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveChromebook = this.setActiveChromebook.bind(this);
    this.searchSerialNumber = this.searchSerialNumber.bind(this);

    this.state = {
      chromebooks: [],
      currentChromebook: null,
      currentIndex: -1,
      searchSerialNumber: ""
    };
  }

  componentDidMount() {
    this.retrieveChromebooks();
  }

  onChangeSearchSerialNumber(e) {
    const searchSerialNumber = e.target.value;

    this.setState({
      searchSerialNumber: searchSerialNumber
    });
  }

  retrieveChromebooks() {
    ChromebookDataService.getAll()
      .then(response => {
        this.setState({
          chromebooks: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveChromebooks();
    this.setState({
      currentChromebook: null,
      currentIndex: -1
    });
  }

  setActiveChromebook(chromebook, index) {
    this.setState({
      currentChromebook: chromebook,
      currentIndex: index
    });
  }

  removeAllChromebooks() {
    ChromebookDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchSerialNumber() {
    ChromebookDataService.findBySerialNumber(this.state.searchSerialNumber)
      .then(response => {
        this.setState({
          chromebooks: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchSerialNumber, chromebooks, currentChromebook, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by serial number"
              value={searchSerialNumber}
              onChange={this.onChangeSearchSerialNumber}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchSerialNumber}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Chromebooks List</h4>

          <ul className="list-group">
            {chromebooks &&
              chromebooks.map((chromebook, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveChromebook(chromebook, index)}
                  key={index}
                >
                  {chromebook.serialNumber}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentChromebook ? (
            <div>
              <h4>Chromebook</h4>
              <div>
                <label>
                  <strong>SerialNumber:</strong>
                </label>{" "}
                {currentChromebook.serialNumber}
              </div>
              <div>
                <label>
                  <strong>Location:</strong>
                </label>{" "}
                {currentChromebook.location.name}
              </div>
              <div>
                <label>
                  <strong>Last Known User:</strong>
                </label>{" "}
                {currentChromebook.lastKnownUser}
              </div>
              <Link
                to={"/chromebooks/" + currentChromebook.serialNumber}
                className="m-3 btn btn-sm btn-success"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Chromebook...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
