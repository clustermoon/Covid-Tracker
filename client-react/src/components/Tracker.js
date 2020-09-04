import React from "react";
import axios from "axios";


class Tracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [] };

  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    // Java Spring Boot uses port 8080
    //let url = "http://localhost:8080/tasks";

    // C# dotnetcore uses port 5000
    //let url = "http://localhost:5000/projects";

    // Express uses port 3001 (react uses 3000)
    let url = "http://localhost:3001/tasks";
    axios.get(url).then(response => this.setState({ tasks: response.data }));
  };

  /*addTask = () => {
    let url = "http://localhost:3001/tasks";
    axios.post(url, { name: this.taskName.current.value }).then(response => {
      // refresh the data
      this.getData();
      // empty the input
      this.taskName.current.value = "";
    });
  };*/


  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default Tracker;