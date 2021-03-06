import { h, Component } from '@stencil/core';

@Component({
  tag: 'page-not-found',
})
export class PageNotFound {
  render() {
    return (
      <div class="o-container o-container--small u-window-box-xlarge u-centered">
        <stencil-route-title pageTitle="404" />
        <i class="fa-fw fas fa-map-signs fa-5x" />
        <h2 class="c-heading">That page doesn't exist.</h2>
        <div>
          <a class="c-link" href="/">
            Go back to the home page
          </a>
        </div>
      </div>
    );
  }
}
