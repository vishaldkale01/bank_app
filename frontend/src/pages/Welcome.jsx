import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class  extends Component {
  render() {
    return (
      <div>

        <div class="card">
          <div class="card-header">header</div>
          <div class="card-body">
            <Link to={"/"}>log_in</Link>
          </div>
          <div class="card-footer">footer</div>
        </div>
      </div>
    )
  }
}
