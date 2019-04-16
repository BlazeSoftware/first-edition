import { Component } from '@stencil/core';

@Component({
  tag: 'app-page',
})
export class AppPage {
  render() {
    return (
      <div class="o-container o-container--medium u-window-box-medium">
        <div class="o-header">
          <div class="o-logo">
            <h1 class="c-logo">First Edition</h1>
            <span class="u-xsmall u-text--quiet">v0.1</span>
          </div>
          <div class="c-nav-strip">
            <stencil-route-link url="/dashboard">Dashboard</stencil-route-link>
            <stencil-route-link url="/account">Account</stencil-route-link>
            <stencil-route-link url="/Logout">Logout</stencil-route-link>
          </div>
        </div>
        <div class="u-letter-box-medium">
          <slot />
        </div>
      </div>
    );
  }
}
