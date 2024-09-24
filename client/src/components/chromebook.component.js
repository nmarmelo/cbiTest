import React, { Component } from "react";
import ChromebookDataService from "../services/chromebook.service";
import LocationDataService from "../services/location.service";
import TransactionDataService from "../services/transaction.service";
import { withRouter } from '../common/with-router';
import Select from 'react-select';

class Chromebook extends Component {
  constructor(props) {
    super(props);
    this.getChromebook = this.getChromebook.bind(this);
    this.updateChromebook = this.updateChromebook.bind(this);
    this.retrieveLocations = this.retrieveLocations.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);

    this.state = {
      currentChromebook: {
        serialNumber: "",
        lastKnownUser: "",
        locationId: null,
        location: { id: null, name: ""}
      },
      originalChromebook: {
        serialNumber: "",
        lastKnownUser: "",
        locationId: null,
        location: { id: null, name: ""}
      },
      locations: [],
      message: ""
    };
  }

  componentDidMount() {
    this.getChromebook(this.props.router.params.serialNumber);
    this.retrieveLocations();
  }

  retrieveLocations() {
    LocationDataService.getAll()
      .then(response => {
        this.setState(function() {
          return {
              locations: response.data
          }
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
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
 
  onChangeLocation(obj) {
    const location = { id: obj.value, name: obj.label };

    this.setState(function(prevState) {
      return {
        currentChromebook: {
          ...prevState.currentChromebook,
          locationId: location.id,
          location: location
        }
      };
    });
  }

  getChromebook(serialNumber) {
    ChromebookDataService.get(serialNumber)
      .then(response => {
        this.setState({
          currentChromebook: response.data,
          originalChromebook: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateChromebook() {
    const transaction = {
        toUser: this.state.currentChromebook.lastKnownUser,
        toLocationId: this.state.currentChromebook.locationId,
        fromUser: this.state.originalChromebook.lastKnownUser,
        fromLocationId: this.state.originalChromebook.locationId,
        serialNumber: this.state.currentChromebook.serialNumber
    };

    ChromebookDataService.update(
      this.state.currentChromebook.serialNumber,
      this.state.currentChromebook
    )
      .then(response => {
        console.log(response.data);

        TransactionDataService.create(transaction)
          .then(response => {
            console.log("Created transaction " + response.data.id)
          }).
          catch(e => {
            console.log(e);
          });

        this.setState({
          message: "The chromebook was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });

      this.state.originalChromebook = this.state.currentChromebook;
  }

  render() {
    const { currentChromebook } = this.state;

    const options = this.state.locations.map((location) => {
      return {
        label: location.name,
        value: location.id
      }
    });

    const LocationsComponent = () => (
      <Select 
        options={options} 
        className="basic-single"
        classNamePrefix="select"
        defaultValue={{ 
          value: currentChromebook.location.id, 
          label: currentChromebook.location.name 
        }}
        onChange={this.onChangeLocation}
      />
    )

    return (
      <div>
        {currentChromebook ? (
          <div className="edit-form centered col-md-4">
            <h4>Chromebook</h4>
            <label htmlFor="serialNumber">Serial Number: {currentChromebook.serialNumber}</label>
            <form>
              <div className="form-group">
                <label htmlFor="location">Location: </label>
              </div>
              <br></br>
              <div>
                <LocationsComponent></LocationsComponent>
              </div>
              
              <div className="form-group">
                <label htmlFor="lastKnownUser">Last Known User:</label>
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
