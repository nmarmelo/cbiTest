import React, { Component } from "react";
import ChromebookDataService from "../services/chromebook.service";
import { withRouter } from '../common/with-router';

class Chromebook extends Component {
  constructor(props) {
    super(props);
    //this.onChangeTitle = this.onChangeTitle.bind(this);
    //this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getChromebook = this.getChromebook.bind(this);
    //this.updatePublished = this.updatePublished.bind(this);
    this.updateChromebook = this.updateChromebook.bind(this);
    //this.deleteTutorial = this.deleteTutorial.bind(this);

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
    this.getChromebook(this.props.router.params.id);
  }

//   onChangeTitle(e) {
//     const title = e.target.value;

//     this.setState(function(prevState) {
//       return {
//         currentTutorial: {
//           ...prevState.currentTutorial,
//           title: title
//         }
//       };
//     });
//   }

//   onChangeDescription(e) {
//     const description = e.target.value;
    
//     this.setState(prevState => ({
//       currentTutorial: {
//         ...prevState.currentTutorial,
//         description: description
//       }
//     }));
//   }

  getChromebook(serialNumber) {
    ChromebookDataService.findBySerialNumber(serialNumber)
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

//   updatePublished(status) {
//     var data = {
//       id: this.state.currentTutorial.id,
//       title: this.state.currentTutorial.title,
//       description: this.state.currentTutorial.description,
//       published: status
//     };

//     ChromebookDataService.update(this.state.currentTutorial.id, data)
//       .then(response => {
//         this.setState(prevState => ({
//           currentTutorial: {
//             ...prevState.currentTutorial,
//             published: status
//           }
//         }));
//         console.log(response.data);
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

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

//   deleteTutorial() {    
//     ChromebookDataService.delete(this.state.currentTutorial.id)
//       .then(response => {
//         console.log(response.data);
//         this.props.router.navigate('/tutorials');
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

  render() {
    const { currentChromebook } = this.state;

    return (
      <div>
        {currentChromebook ? (
          <div className="edit-form">
            <h4>Chromebook</h4>
            <label htmlFor="serialNum">Serial Number:{currentChromebook.serialNumber}</label>
            <form>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  value={currentChromebook.location.name}
                  onChange={this.onChangeLocation}
                />
              </div>

              {/* <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentChromebook.published ? "Published" : "Pending"}
              </div> */}
            </form>

            {/* {currentChromebook.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )} */}

            {/* <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTutorial}
            >
              Delete
            </button> */}

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateChromebook}
            >
              Update
            </button>
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
