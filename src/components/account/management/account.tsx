import { Component, Prop, State, Listen } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase from '@/firebase/firebase';

@Component({
  tag: 'account-management',
  styleUrl: 'account.scss',
})
export class Account {
  changeNamePopup: any;
  changeEmailPopup: any;
  changePasswordPopup: any;
  deleteAccountPopup: any;

  @Prop()
  history: RouterHistory;

  @State()
  user: any = {};

  @State()
  displayName: string;

  @State()
  email: string;

  @State()
  loading: boolean = true;

  @Listen('profileChange')
  async onProfileChange({ detail }) {
    this.displayName = detail.displayName;
    this.email = detail.email;
  }

  firebaseUnsubscribe: any;
  componentDidUnload() {
    this.firebaseUnsubscribe();
  }

  componentDidLoad() {
    this.firebaseUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) return this.history.push('/login');
      this.user = user;
      this.displayName = user.displayName;
      this.email = user.email;
      this.loading = false;
    });
  }

  renderInfoRow(label: string, value: string, popup?: any) {
    return (
      <div class="o-grid o-grid--no-gutter o-grid--center o-grid--xsmall-full o-grid--small-full u-letter-box-xsmall">
        <label class="o-grid__cell o-grid__cell--width-25">{label}:</label>
        <span class="o-grid__cell">
          {!this.loading && (
            <span>
              {value || <span class="u-text--normal u-text--highlight">None set</span>}
              {popup && (
                <a
                  role="button"
                  class="c-link u-small u-display-inline-block u-pillar-box-medium"
                  onClick={() => popup.show()}>
                  edit
                </a>
              )}
            </span>
          )}
        </span>
      </div>
    );
  }

  render() {
    return (
      <app-page>
        <stencil-route-title pageTitle="Account" />
        <blaze-card>
          <blaze-card-header>
            <h3 class="c-heading">Details</h3>
          </blaze-card-header>
          <blaze-card-body>
            {this.renderInfoRow('Name', this.user.displayName, this.changeNamePopup)}
            {this.renderInfoRow('Email', this.user.email, this.changeEmailPopup)}
            {this.renderInfoRow('Verified', 'Yes')}
            {this.renderInfoRow('Password', '**************', this.changePasswordPopup)}
            {this.renderInfoRow('Joined', this.user.metadata && this.user.metadata.creationTime)}
            {this.renderInfoRow('Last logged in', this.user.metadata && this.user.metadata.lastSignInTime)}
          </blaze-card-body>
        </blaze-card>
        <div class="u-letter-box-small" />
        <blaze-card>
          <blaze-card-header>
            <h3 class="c-heading">Danger Zone</h3>
          </blaze-card-header>
          <blaze-card-body>
            <button
              type="button"
              class="c-button c-button--ghost c-button--error"
              onClick={() => this.deleteAccountPopup.show()}>
              Delete account
            </button>
            <div class="u-letter-box-small">
              <label>Once you delete an account, that's it, there is no recovery.</label>
            </div>
          </blaze-card-body>
        </blaze-card>

        <account-change-name user={this.user} ref={(popup) => (this.changeNamePopup = popup)} />
        <account-change-email
          user={this.user}
          history={this.history}
          ref={(popup) => (this.changeEmailPopup = popup)}
        />
        <account-change-password user={this.user} ref={(popup) => (this.changePasswordPopup = popup)} />
        <account-delete user={this.user} history={this.history} ref={(popup) => (this.deleteAccountPopup = popup)} />
      </app-page>
    );
  }
}
