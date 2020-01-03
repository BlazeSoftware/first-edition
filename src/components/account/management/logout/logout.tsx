import { h, Component, Prop } from '@stencil/core';
import firebase from '@/firebase/firebase';
import { RouterHistory } from '@stencil/router';

@Component({
  tag: 'account-logout',
})
export class Logout {
  @Prop()
  history: RouterHistory;

  async componentDidLoad() {
    await firebase.auth().signOut();
    this.history.push('/');
  }

  render() {
    return (
      <div class="o-container o-container--xsmall u-window-box-medium">
        <stencil-route-title pageTitle="Logout" />
        <blaze-card>
          <blaze-card-header>
            <h2 class="c-heading">Logging out....</h2>
          </blaze-card-header>
        </blaze-card>
      </div>
    );
  }
}
