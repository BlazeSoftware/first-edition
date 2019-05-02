import { Component } from '@stencil/core';

@Component({
  tag: 'home-page',
})
export class HomePage {
  render() {
    return (
      <div>
        <div class="u-centered u-super u-letter-box-super">
          <typd-logo animated />
        </div>
        <div class="u-centered u-small">
          <stencil-route-link anchorClass="c-link" url="/join">
            Create an account
          </stencil-route-link>
          <div class="u-display-inline-block u-pillar-box-medium">or</div>
          <stencil-route-link anchorClass="c-link" url="/login">
            login
          </stencil-route-link>
          <div class="u-letter-box-large" />
        </div>
      </div>
    );
  }
}
