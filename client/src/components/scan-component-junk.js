import React, { Component } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
//import { Link } from "react-router-dom";

export default class Scanner extends Component {
  constructor(props) {
    super(props);
    this.onScanSuccess = this.onScanSuccess.bind(this);
    this.onScanFailure = this.onScanFailure.bind(this);

    this.state = {
        serialNumber: ""
    };
  }

//   componentDidMount() {

//   }

  onScanSuccess(decodedText, decodedResult) {
    this.setState({
        serialNumber: decodedText
      });

    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
  }
  
  onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
  }

  renderScanner() {
    let html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: {width: 250, height: 250} },
        /* verbose= */ false);
    html5QrcodeScanner.render(this.onScanSuccess, this.onScanFailure);
  }

  render() {
    // let html5QrcodeScanner = new Html5QrcodeScanner(
    //     "reader",
    //     { fps: 10, qrbox: {width: 250, height: 250} },
    //     /* verbose= */ false);
    // html5QrcodeScanner.render(this.onScanSuccess, this.onScanFailure);

    return (
        // <div className="col-md-8">
        //   <div className="input-group mb-3">
        //     <input
        //       type="text"
        //       className="form-control"
        //       placeholder="serial number"
        //       value={this.state.serialNumber}
        //     //   onChange={this.onChangeSearchSerialNumber}
        //     />
        //     <div className="input-group-append">
        //       <button
        //         className="btn btn-outline-secondary"
        //         type="button"
        //         // onClick={this.searchSerialNumber}
        //       >
        //         Search
        //       </button>
        //     </div>
        //   </div>
        // </div>
    <div>
        <h1>QR Code Reader using Javascript</h1>

        <div class="row">
        <div class="col">
            <div id="reader"></div>
        </div>
        {/* <div class="col" style="padding: 30px"> */}
        <div class="col">
            <h4>Scan Result </h4>
            <div id="result">
            Result goes here
            </div>
        </div>

        </div>
    </div>
    );
  }
}