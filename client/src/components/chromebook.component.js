import React, { Component } from "react";
import ChromebookDataService from "../services/chromebook.service";
import { withRouter } from '../common/with-router';

class Chromebook extends Component {
  constructor(props) {
    super(props);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.getChromebook = this.getChromebook.bind(this);
    this.updateChromebook = this.updateChromebook.bind(this);

    this.state = {
      currentChromebook: {
        serialNumber: "",
        lastKnownUser: "",
        location: { id: null, name: ""}
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getChromebook(this.props.router.params.serialNumber);
  }

  onChangeUser(e) {
    const user = e.target.value;

    this.setState(function(prevState) {
      return {
        currentChromebook: {
          ...prevState.currentChromebook,
          lastKnownUser: user
        }
      };
    });
  }

  //TODO: onChangeLocation(e)

  getChromebook(serialNumber) {
    ChromebookDataService.get(serialNumber)
      .then(response => {
        this.setState({
          currentChromebook: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateChromebook() {
    ChromebookDataService.update(
      this.state.currentChromebook.serialNumber,
      this.state.currentChromebook
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The chromebook was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentChromebook } = this.state;

    return (
      <div>
        {currentChromebook ? (
          <div className="edit-form">
            <h4>Chromebook</h4>
            <label htmlFor="serialNumber">Serial Number: {currentChromebook.serialNumber}</label>
            <form>
              <div className="form-group">
                <label htmlFor="location">Location: {currentChromebook.location.name}</label>
              </div>
              <div className="form-group">
                <label htmlFor="lastKnownUser">Last Known User</label>
                <input
                  type="text"
                  className="form-control"
                  id="chromebookUser"
                  value={currentChromebook.lastKnownUser}
                  onChange={this.onChangeUser}
                />
              </div>
            </form>
            <div>
              <button
                type="submit"
                className="md-3 btn btn-success"
                onClick={this.updateChromebook}
                >
                Update
              </button>
            </div>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Chromebook...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Chromebook);
