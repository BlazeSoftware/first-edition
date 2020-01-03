import { h, Component } from '@stencil/core';

@Component({
  tag: 'app-page',
})
export class AppPage {
  render() {
    return (
      <main class="o-container o-container--medium u-window-box-medium">
        <header class="c-masthead">
          <stencil-route-link url="/">
            <typd-logo />
          </stencil-route-link>
          <nav class="o-nav">
            <stencil-route-link anchorClass="c-link" url="/documents">
              Documents
            </stencil-route-link>
            <stencil-route-link anchorClass="c-link" url="/account">
              Account
            </stencil-route-link>
            <stencil-route-link anchorClass="c-link" url="/contact-help">
              Contact
            </stencil-route-link>
            <stencil-route-link anchorClass="c-link" url="/logout">
              Logout
            </stencil-route-link>
          </nav>
        </header>
        <div class="u-letter-box-small">
          <slot />
        </div>
      </main>
    );
  }
}
