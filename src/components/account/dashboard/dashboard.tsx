import { Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase, { store } from '@/firebase/firebase';

@Component({
  tag: 'account-dashboard',
})
export class Dashboard {
  @Prop()
  history: RouterHistory;

  @State()
  loading: boolean = true;

  @State()
  user: any = {};

  @State()
  docs: Array<any> = [];

  firebaseUnsubscribe: any;
  onDocsSnapshot: any;
  componentDidUnload() {
    this.onDocsSnapshot();
    this.firebaseUnsubscribe();
  }

  componentDidLoad() {
    this.firebaseUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) return this.history.push('/login');
      this.user = user;

      const ref = store
        .collection('documents')
        .where('owner', '==', this.user.uid)
        .orderBy('created', 'desc');

      this.onDocsSnapshot = ref.onSnapshot((snapshots) => {
        this.docs = snapshots.docs;
      });

      await ref.get();
      this.loading = false;
    });
  }

  render() {
    return (
      <app-page>
        <stencil-route-title pageTitle="Dashboard" />
        <div>
          {this.loading && (
            <div class="u-centered u-super o-page-loading">
              <loading-status status="loading" />
            </div>
          )}
          {!this.loading && this.docs.length > 0 && <document-list docs={this.docs} />}
          {!this.loading && this.docs.length == 0 && (
            <div class="u-centered u-letter-box-super">
              <h3 class="c-heading">You don't have any documents</h3>
              <stencil-route-link url="/edit" anchorClass="c-button c-button--ghost-success">
                <span class="c-button__icon-left" aria-hidden={true}>
                  <i aria-hidden={true} class="fa-fw fas fa-star-of-life" />
                </span>
                Create New
              </stencil-route-link>
            </div>
          )}
        </div>
      </app-page>
    );
  }
}
