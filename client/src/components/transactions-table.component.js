import React, { Component } from "react";
import TransactionDataService from "../services/transaction.service";
import { Link } from "react-router-dom";
import '../App.css'

export default class TransactionsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchSerialNumber = this.onChangeSearchSerialNumber.bind(this);
    this.retrieveTransactions = this.retrieveTransactions.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.searchSerialNumber = this.searchSerialNumber.bind(this);

    this.state = {
      transactions: [],
      searchSerialNumber: ""
    };
  }

  componentDidMount() {
    this.retrieveTransactions();
  }

  onChangeSearchSerialNumber(e) {
    const searchSerialNumber = e.target.value;

    this.setState({
      searchSerialNumber: searchSerialNumber
    });
  }

  retrieveTransactions() {
    TransactionDataService.getAllDateDesc()
      .then(response => {
        this.setState({
          transactions: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTransactions();
  }

  searchSerialNumber() {
    TransactionDataService.findBySerialNumber(this.state.searchSerialNumber)
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
    const { searchSerialNumber, transactions } = this.state;

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
        <div>
          <h4>Transactions List</h4>
          <table>
            <thead>
                <tr>
                    <th>Date & Time</th>
                    <th>SerialNumber</th>
                    <th>From Location</th>
                    <th>To Location</th>
                    <th>From User</th>
                    <th>To User</th>
                </tr>
            </thead>
            <tbody>
            {transactions &&
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>
                  {transaction.dateTime}
                  </td>
                  <td>
                  {transaction.serialNumber}
                  </td>
                  <td>
                  {transaction.fromLocation.name}
                  </td>
                  <td>
                  {transaction.toLocation.name}
                  </td>
                  <td>
                  {transaction.fromUser}
                  </td>
                  <td>
                  {transaction.toUser}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
