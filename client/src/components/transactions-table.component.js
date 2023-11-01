import React, { Component, useState, useEffect, useContext } from "react";
import TransactionDataService from "../services/transaction.service";
import { TablePagination } from "@mui/material";
import { Link } from "react-router-dom";
import '../App.css'

export default class TransactionsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchSerialNumber = this.onChangeSearchSerialNumber.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.getRequestParams = this.getRequestParams.bind(this);
    this.retrieveTransactions = this.retrieveTransactions.bind(this);

    this.state = {
      transactions: [],
      searchSerialNumber: "",
      count: 0,
      totalPages: 1,
      page: 0,
      pageSize: 3,
      pageSizes: [3, 6, 9]
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

  handlePageChange(event, value) {
    this.setState({
      page: value
    },
    () => {
        this.retrieveTransactions();
      }
    );
  }

  handleChangeRowsPerPage(event) {
    this.setState({
      pageSize: event.target.value,
      page: 0
    },
    () => {
        this.retrieveTransactions();
      }
    );
  }

  getRequestParams(searchSn, page, pageSize){
    let params = {};

    if (searchSn) {
      params["serialNumber"] = searchSn;
    }

    if (page >= 0) {
      params["page"] = page;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  }

  retrieveTransactions() {
    const params = this.getRequestParams(this.state.searchSerialNumber, this.state.page, this.state.pageSize);

    TransactionDataService.getAndCountAllDateDesc(params)
      .then(response => {
        this.setState({
          count: response.data.totalItems,
          transactions: response.data.trans,
          totalPages: response.data.totalPages,
          page: response.data.currentPage
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  
  render() {
    const { searchSerialNumber, transactions, count, page, pageSize, pageSizes } = this.state;

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
                onClick={this.retrieveTransactions}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div>
          <h4>Transaction History</h4>

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
          <TablePagination
              rowsPerPageOptions={pageSizes}
              component="div"
              count={count}
              rowsPerPage={pageSize}
              page={page}
              onPageChange={this.handlePageChange}
              onRowsPerPageChange={this.handleChangeRowsPerPage}
            /> 
        </div>
      </div>
    );
  }
}
