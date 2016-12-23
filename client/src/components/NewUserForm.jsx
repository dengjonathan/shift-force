import React, {Component} from 'react';

export default class NewProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      branch: 'None',
      startDate: null,
      endDate: null,
      passive: true,
      hidden: false,
      locations: [],
      salary: '50000'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddCity = this.handleAddCity.bind(this);
  }
  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }
  handleAddCity(event) {
    if(event.which === 13) {
      this.setState({locations: [...this.state.locations, event.target.value]});
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    //TODO: validate submission
    // make a server call
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input id='name' type='text' value={this.state.name} onChange={this.handleChange} />
      </label>
      <label>
        Branch
        <select name='branch' id='branch' value={this.state.branch} onChange={this.handleChange}>
          <option value='None'>None</option>
          <option value='Army'>Army</option>
          <option value='Navy'>Navy</option>
          <option value='Marines'>Marines</option>
          <option value='Air Force'>Air Force</option>
          <option value='Coast Guard'>Coast Guard</option>
        </select>
      </label>
      <label>
        Minimum Salary Expectation
        <p>${this.state.salary}</p>
        <input id='salary' type='range' value={this.state.salary} min='40000' max='200000' step='5000' onChange={this.handleChange}/>
      </label>
      <label>
        City
        <input type='search' name='search' onKeyPress={this.handleAddCity}/>
        {this.state.locations}
      </label>
      <input type='submit' name='Submit'/>
    </form>
    );
  }
}