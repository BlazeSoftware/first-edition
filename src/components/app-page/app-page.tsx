import { Component } from '@stencil/core';

@Component({
  tag: 'app-page',
})
export class AppPage {
  render() {
    return (
      <main class="o-container o-container--medium u-window-box-medium">
        <header class="masthead">
          <h1 class="logo">First Edition</h1>
          <span class="u-xsmall u-text--quiet">v0.1</span>
          <nav>
            <stencil-route-link anchorClass="c-link" url="/dashboard">
              Dashboard
            </stencil-route-link>
            <stencil-route-link anchorClass="c-link" url="/account">
              Account
            </stencil-route-link>
            <stencil-route-link anchorClass="c-link" url="/Logout">
              Logout
            </stencil-route-link>
          </nav>
        </header>
        <div class="u-letter-box-medium">
          <slot />
        </div>
      </main>
    );
  }
}
