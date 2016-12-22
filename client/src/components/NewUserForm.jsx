import React, {Component} from 'react';

export default class NewProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      branch: null,
      startDate: null,
      endDate: null,
      passive: true,
      hidden: false,
      locations: [],
      salary: []
    };
  }
  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    //TODO: validate submission
    // make a server call
  }
  render() {
    
  }
}