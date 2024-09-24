import React, { Component } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
// import Html5QrcodePlugin from "./qr-code-scanner.component";
import Html5QrCodePlugin from "./html5QrCodePlugin.component";
//import { Link } from "react-router-dom";

export default class Scanner extends Component {
  constructor(props) {
    super(props);
    this.onScanSuccess = this.onScanSuccess.bind(this);
    this.onScanFailure = this.onScanFailure.bind(this);
    //this.onNewScanResult = this.onNewScanResult.bind(this);

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

//   onNewScanResult (decodedText, decodedResult) {
//     // handle decoded results here
//         console.log(`decoded text = ${decodedText}`);
//         console.log(`decoded result = ${decodedResult}`)
//     }
//   const 
//     onNewScanResult = (decodedText, decodedResult) => {
//     // handle decoded results here
//         console.log(`decoded text = ${decodedText}`);
//         console.log(`decoded result = ${decodedResult}`)
//     }

  renderScanner() {
    let html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: {width: 250, height: 250} },
        /* verbose= */ false);
    html5QrcodeScanner.render(this.onScanSuccess, this.onScanFailure);
  }

  render() {
    const onNewScanResult = (decodedText, decodedResult) => {
    // handle decoded results here
        console.log(`decoded text = ${decodedText}`);
        console.log(`decoded result = ${decodedResult}`)
    }

    return (

    <div>
        <h1>QR Code Reader using Javascript</h1>
        <Html5QrCodePlugin
                fps={10}
                qrbox={300}
                disableFlip={false}
                qrCodeSuccessCallback={onNewScanResult}
            />
        {/* <div class="row">
        <div class="col">
            <div id="reader"></div>
        </div>
        <div class="col">
            <h4>Scan Result </h4>
            <div id="result">
            Result goes here
            </div>
        </div>

        </div> */}
    </div>
    );
  }
}