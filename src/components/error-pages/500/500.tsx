import { Component } from '@stencil/core';

@Component({
  tag: 'app-broken',
})
export class Broken {
  render() {
    return (
      <div class="o-container o-container--small u-window-box-xlarge u-centered">
        <stencil-route-title pageTitle="500" />
        <i class="fa-fw fas fa-bomb fa-5x" />
        <h2 class="c-heading">
          Sorry, something went wrong. <br />
          We're looking into it.
        </h2>
        <div>
          <a class="c-link" href="/">
            Go back to the home page
          </a>
        </div>
      </div>
    );
  }
}
