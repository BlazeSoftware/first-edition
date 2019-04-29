import { Component, State } from '@stencil/core';
import firebase from '@/firebase/firebase';

@Component({
  tag: 'account-logout',
})
export class Logout {
  @State()
  loggedOut: boolean;

  async componentDidLoad() {
    await firebase.auth().signOut();
    this.loggedOut = true;
  }

  render() {
    return (
      <div class="o-container o-container--small u-window-box-xlarge u-centered">
        <stencil-route-title pageTitle="Logged out" />

        {!this.loggedOut ? (
          <h2 class="c-heading">Logging out....</h2>
        ) : (
          <div>
            <h2 class="c-heading">Logged out.</h2>
            <p class="c-paragraph">
              <stencil-route-link url={'/'} anchorClass="c-link">
                Go back to the home page
              </stencil-route-link>
            </p>
            <p class="c-paragraph">
              <stencil-route-link url={'/login'} anchorClass="c-link">
                Log in again
              </stencil-route-link>
            </p>
          </div>
        )}
      </div>
    );
  }
}