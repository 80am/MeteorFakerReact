import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import axios from 'axios'; 
import Csv from './Csv.js'
 
import { Tasks } from '../api/tasks.js';
import Task from './Task.js';
import faker from 'faker'
// const faker = require('faker');
 
// App component - represents the whole app

class App extends Component {

constructor(props) {
    super(props);
 
    this.state = {
      hideCompleted: false,
      numberFakes: '',
      fakePeople:[],
      showPerson: "show",
    };
  }
handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }
 
  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }
  numberFakes(e) {
    var realNumber = (e.target.value - 1)
    this.setState({ numberFakes: realNumber })
    console.log(this.state.numberFakes)
}
 
handleFaker(){   
    var randomName=[] 
    for(let i=0; i<=this.state.numberFakes; i++){
        var people = faker.name.firstName() + " " + faker.name.lastName()
        randomName.push(people)
    };
    this.setState({fakePeople: randomName})
}

  render() {
      var people = this.state.fakePeople
      let finalFakes= people.map(fakePerson => {
          return(
              <div className="fakePerson" key={fakePerson.id}>
              <div>
                <input type="checkbox"/>
               
              <p>Name: {fakePerson}</p>
              <p>Street Address: {faker.address.streetAddress()}</p>
              <p>Second Address: {faker.address.secondaryAddress()}</p>
              <p>City: {faker.address.city()}</p>
              <p>State: {faker.address.state()}</p>
              <p>Zip: {faker.address.zipCode()}</p>
              <p>County: {faker.address.county()}</p>
              <p>Lat: {faker.address.latitude()}</p>
              <p>Long: {faker.address.longitude()}</p>

             
              
              <button className="saveButton" onClick={()=>this.handleSave(fakePerson.id)}>Save Contact</button>
               </div>
              </div>
          )
        })
      
        console.log(finalFakes)
    return (
        <div>
      <div className="container">
        <header>
          <h1>Todo List</h1>

          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            />
            Hide Completed Tasks
          </label>
          
          <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks"
            />
          </form>
        </header>
 
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
      <div className="lowerBox">
    <input className="numberFakes"type="text" onChange={(e) => this.numberFakes(e)} placeholder="0"/>
    <button className='fakerButtton' onClick={() => this.handleFaker()}>Create Fake People</button>
    
    </div>
    <div className="fakePeople">
    {finalFakes}
    </div>
    </div>
    );
  }
}
export default withTracker(() => {
    return {
      tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
      incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    };
  })(App);