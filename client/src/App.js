import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Routes, Route } from "react-router-dom";
import ChromebooksList from "./components/chromebooks-list.component";
import Chromebook from "./components/chromebook.component";
import TransactionsTable from "./components/transactions-table.component";
import TutorialsList from "./components/tutorials-list.component";
import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/chromebooks" className="navbar-brand">
            nMarmelo
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/chromebooks"} className="nav-link">
                Chromebooks
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/transactions"} className="nav-link">
                Transactions
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Tutorials
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<ChromebooksList/>} />
            <Route path="/chromebooks" element={<ChromebooksList/>} />
            <Route path="/chromebooks/:serialNumber" element={<Chromebook/>} />     
            <Route path="/transactions" element={<TransactionsTable/>} />
            <Route path="/tutorials" element={<TutorialsList/>} />
            <Route path="/add" element={<AddTutorial/>} />
            <Route path="/tutorials/:id" element={<Tutorial/>} />
          </Routes>
        </div>

        <Footer />
        
      </div>
      
    );
  }
}

export default App;

// default code from npx create-react-app react-crud
// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;
