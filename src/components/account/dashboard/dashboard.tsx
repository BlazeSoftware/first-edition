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
        .orderBy('created', 'asc');

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
          {this.loading ? (
            <div class="u-centered u-super o-page-loading">
              <loading-status status="loading" />
            </div>
          ) : (
            <document-list user={this.user} docs={this.docs} history={this.history} />
          )}
        </div>
      </app-page>
    );
  }
}
