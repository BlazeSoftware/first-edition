import { Component, Prop } from '@stencil/core';
import { RouterHistory, MatchResults } from '@stencil/router';
import firebase, { store } from '@/firebase/firebase';

@Component({
  tag: 'account-login-social',
})
export class Social {
  alert: any;

  @Prop()
  history: RouterHistory;

  @Prop()
  match: MatchResults;

  firebaseUnsubscribe: any;
  componentDidUnload() {
    if (this.firebaseUnsubscribe) this.firebaseUnsubscribe();
  }

  componentDidLoad() {
    this.firebaseUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      try {
        const result: any = await firebase.auth().getRedirectResult();
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

        if (!user) {
          if (this.match.params.provider === 'twitter')
            firebase.auth().signInWithRedirect(new firebase.auth.TwitterAuthProvider());
          if (this.match.params.provider === 'facebook')
            firebase.auth().signInWithRedirect(new firebase.auth.FacebookAuthProvider());
        }
      } catch (error) {
        console.error(error);
        return this.history.push(`/login?e=${error.code}`);
      }
    });
  }

  render() {
    return (
      <div class="o-container o-container--xsmall u-window-box-medium">
        <stencil-route-title pageTitle="Login" />
        <loading-status status="loading" />
      </div>
    );
  }
}
