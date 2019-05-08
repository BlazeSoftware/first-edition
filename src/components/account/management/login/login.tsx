import { Component, State, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase, { store } from '@/firebase/firebase';
import { getAlertMessage } from '@/firebase/alert-messages';
import { AlertMessage } from '@/firebase/AlertMessage';

@Component({
  tag: 'account-login',
})
export class Login {
  alert: any;

  @Prop()
  history: RouterHistory;

  @State()
  loading: boolean = true;

  @State()
  alertMsg: AlertMessage = {};

  @State()
  email: string;

  @State()
  password: string;

  @State()
  passwordVisible: boolean = false;

  handleEmailChange(e) {
    this.email = e.target.value;
  }

  handlePasswordChange(e) {
    this.password = e.target.value;
  }

  firebaseUnsubscribe: any;
  componentDidUnload() {
    if (this.firebaseUnsubscribe) this.firebaseUnsubscribe();
  }

  componentDidLoad() {
    this.firebaseUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      try {
        const result: any = await firebase.auth().getRedirectResult();
        console.log(user, result);
        if (user && result.credential) {
          const credentials: any = {
            token: result.credential.accessToken,
          };

          if (result.credential.secret) credentials.secret = result.credential.secret;

          await store
            .collection('credentials')
            .doc(user.uid)
            .set(credentials);
        }

        if (user) return this.history.push('/documents');
      } catch (error) {
        console.log(error);
        this.alertMsg = getAlertMessage(error.code, this.email);
        this.alert.show();
      } finally {
        this.loading = false;
      }
    });
  }

  async login(e) {
    e.preventDefault();
    this.loading = true;
    try {
      const { user } = await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
      if (user.emailVerified) {
        const url = this.history.location.query.url || '/documents';
        return this.history.push(url);
      }
      const oobCode = this.history.location.query.oobCode;
      if (oobCode) {
        return this.history.push(`/complete?oobCode=${oobCode}`);
      }
      return this.history.push(`/verify?email=${user.email}`);
    } catch (error) {
      this.loading = false;
      console.log(error);
      this.alertMsg = getAlertMessage(error.code, this.email);
      this.alert.show();
    }
  }

  render() {
    return (
      <div class="o-container o-container--xsmall u-window-box-medium">
        <stencil-route-title pageTitle="Login" />
        <blaze-card>
          <form onSubmit={(e) => this.login(e)}>
            <blaze-card-header>
              <h2 class="c-heading">Log In</h2>
            </blaze-card-header>
            <blaze-card-body>
              <blaze-alert ref={(alert) => (this.alert = alert)} type={this.alertMsg.type}>
                <div>{this.alertMsg.message}</div>
                <div>
                  {this.alertMsg.action && (
                    <stencil-route-link
                      url={this.alertMsg.action.url}
                      anchorClass="c-link"
                      anchorRole="link"
                      anchorTitle={this.alertMsg.action.text}>
                      {this.alertMsg.action.text}
                    </stencil-route-link>
                  )}
                </div>
              </blaze-alert>
              <label class="c-label o-form-element">
                Email address:
                <div class="o-field o-field--icon-left">
                  <i aria-hidden={true} class="fa-fw fas fa-at c-icon" />
                  <input
                    type="email"
                    value={this.email}
                    class="c-field c-field--label"
                    disabled={this.loading}
                    required
                    onInput={(e) => this.handleEmailChange(e)}
                  />
                </div>
              </label>

              <label class="o-form-element c-label">
                Password:
                <div class="c-input-group c-input-group--label">
                  <div class="o-field o-field--icon-left">
                    <i aria-hidden={true} class="fa-fw fas fa-lock c-icon" />
                    <input
                      type={this.passwordVisible ? 'text' : 'password'}
                      value={this.password}
                      class="c-field"
                      disabled={this.loading}
                      required
                      minLength={6}
                      onInput={(e) => this.handlePasswordChange(e)}
                    />
                  </div>
                  <button
                    type="button"
                    class="c-button"
                    disabled={this.loading}
                    onClick={() => (this.passwordVisible = !this.passwordVisible)}>
                    {this.passwordVisible ? 'Hide' : 'Show'}
                  </button>
                </div>
              </label>
            </blaze-card-body>
            <blaze-card-footer>
              <button class="c-button c-button--block c-button--brand" disabled={this.loading}>
                <span class="c-button__icon-left" aria-hidden={true}>
                  <i aria-hidden={true} class="fa-fw fas fa-sign-in-alt" />
                </span>
                Log In
              </button>
              <div class="u-xsmall u-letter-box-large">
                <blaze-divider>Or</blaze-divider>
              </div>
              <div class="c-input-group">
                <button
                  type="button"
                  class="c-button c-button--block c-button--twitter"
                  disabled={this.loading}
                  onClick={() => firebase.auth().signInWithRedirect(new firebase.auth.TwitterAuthProvider())}>
                  <span class="c-button__icon-left" aria-hidden={true}>
                    <i aria-hidden={true} class="fa-fw fab fa-twitter" />
                  </span>
                </button>
                <button
                  type="button"
                  class="c-button c-button--block c-button--facebook"
                  disabled={this.loading}
                  onClick={() => firebase.auth().signInWithRedirect(new firebase.auth.FacebookAuthProvider())}>
                  <span class="c-button__icon-left" aria-hidden={true}>
                    <i aria-hidden={true} class="fa-fw fab fa-facebook" />
                  </span>
                </button>
              </div>
            </blaze-card-footer>
          </form>
        </blaze-card>
      </div>
    );
  }
}
