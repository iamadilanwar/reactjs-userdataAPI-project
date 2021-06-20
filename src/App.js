import './App.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component {

  constructor() {
    super();
    this.state={
      users:null,
      currentPage: 1,
      totalPage: 1,
      error: ''
    }
  }
  componentDidMount()
  {
    this.handleFetchUsers(1);
  }

  handleFetchUsers = async(pageNumber) => {
    // fetch('https://reqres.in/api/users').then((resp)=>{
    //   resp.json().then((result) =>{
    //     this.setState({users:result.data})
    //   })
    // })
    var users = null, currentPage = 1, totalPage = 1, error = '';
    await axios.get('https://reqres.in/api/users?page='+pageNumber)
      .then(function(response){
          users = response.data.data;
          currentPage = response.data.page;
          totalPage = response.data.total_pages;
      })
      .catch(function(err){
          error = err.message;
      });
    this.setState({
      users: users,
      currentPage: currentPage,
      totalPage: totalPage,
      error: error
    });
  }

  render() {
    return (
      <div className="App">
       <div id="top-head">
        <h1>
        Question 2
        </h1>
        </div>
        <div id="box-container">
        {
          this.state.users ?
          this.state.users.map((item,i)=>
          <div id="data-container">
          <div id="content-container" key={i}>
         
          <img id="img-container" src={item.avatar} alt=""/>
          <h3>{item.first_name} {item.last_name}</h3>
          <p>{item.email}</p>
          </div>
          </div>)
          :
          null
        }</div>

        {this.state.error ? 
          <h1 className="error">{this.state.error}</h1> 
        : null}
      
        <div>
          {[...Array(this.state.totalPage)].map((page, index) => 
            <button key={index+1} onClick={() => this.handleFetchUsers(index+1)} className={this.state.currentPage===(index+1) ? "selected-page":""}>
              Page {index+1}
            </button>
          )}
        </div>
      </div> 
    );
  }
}

export default App;
