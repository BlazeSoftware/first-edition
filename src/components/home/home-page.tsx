import { Component } from '@stencil/core';

@Component({
  tag: 'home-page',
})
export class HomePage {
  render() {
    return (
      <div>
        <div class="u-centered u-xlarge">
          <h1 class="c-heading u-super u-serif">First Edition</h1>
          <h2 class="c-heading u-window-box-none u-small u-serif">Proofreading Platform</h2>
          <div class="u-letter-box-xlarge">
            <i class="fa-fw fas fa-book-reader fa-5x" aria-hidden={true} />
          </div>
        </div>
        <div class="u-centered">
          <stencil-route-link anchorClass="c-link" url="/join">
            Create an account
          </stencil-route-link>
        </div>
        <div class="u-centered u-letter-box-large">
          <stencil-route-link anchorClass="c-link" url="/login">
            Login
          </stencil-route-link>
        </div>
      </div>
    );
  }
}
