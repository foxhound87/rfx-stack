import React, { Component } from 'react';

export default class Test extends Component {

  static fetchData() {}

  render() {
    return (
      <div>
        <h1>Test Page</h1>
        <h3>Just the UI</h3>
        <p>
          Lots of people use React as the V in MVC.
          Since React makes no assumptions about the rest of your technology stack,
          it's easy to try it out on a small feature in an existing project.
        </p>
      </div>
    );
  }
}
