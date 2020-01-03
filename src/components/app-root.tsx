import { h, Component, Prop } from '@stencil/core';
import '@stencil/router';
import { RouterHistory } from '@stencil/router';
import '@blaze/atoms';

@Component({
  tag: 'app-root',
})
export class AppRoot {
  @Prop()
  history: RouterHistory;

  render() {
    return (
      <div class="u-text">
        <stencil-router scrollTopOffset={0}>
          <stencil-route-switch>
            <stencil-route url="/" component="home-page" exact={true} />
            <stencil-route url="/login" component="account-login" />
            <stencil-route url="/join" component="account-join" />
            <stencil-route url="/documents" component="account-documents" />
            <stencil-route url="/account" component="account-management" />
            <stencil-route url="/action" component="account-oob-action" />
            <stencil-route url="/verify" component="account-verify" />
            <stencil-route url="/complete" component="account-complete" />
            <stencil-route url="/reset-password" component="account-reset-password" />
            <stencil-route url="/update-password" component="account-update-password" />
            <stencil-route url="/recover-email" component="account-recover-email" />
            <stencil-route url="/contact-us" component="contact-us" />
            <stencil-route url="/contact-help" component="contact-help" />
            <stencil-route url="/edit/:docId?" component="edit-page" />
            <stencil-route url="/500" component="app-broken" />
            <stencil-route url="/logout" component="account-logout" />
            <stencil-route url="/-/:docId" component="document-viewer" />
            <stencil-route url="/privacy" component="privacy-policy" />
            <stencil-route url="/terms" component="service-terms" />
            <stencil-route component="page-not-found" />
          </stencil-route-switch>
        </stencil-router>
      </div>
    );
  }
}
