import { Component, Prop, State } from '@stencil/core';
import { MatchResults, RouterHistory } from '@stencil/router';
import firebase, { store } from '@/firebase/firebase';

@Component({
  tag: 'edit-page',
})
export class EditPage {
  @Prop()
  history: RouterHistory;

  @Prop()
  match: MatchResults;

  @State()
  loading: boolean = true;

  @State()
  doc: any = {};
  docSnapshot: any;

  firebaseUnsubscribe: any;
  onDocSnapshot: any;
  componentDidUnload() {
    this.onDocSnapshot();
    this.firebaseUnsubscribe();
  }

  componentWillLoad() {
    this.firebaseUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) return this.history.push('/login');

      const docId = this.match.params.docId;

      if (!docId) return (this.loading = false);

      const ref = await store.collection('documents').doc(docId);
      this.onDocSnapshot = ref.onSnapshot((snapshot) => {
        if (snapshot.exists) {
          this.docSnapshot = snapshot;
          this.doc = snapshot.data();
        }
        this.loading = false;
      });
      await ref.get();
    });
  }

  saveDoc({ detail: doc }: any) {
    this.docSnapshot.ref.set(
      {
        title: doc.title,
      },
      { merge: true }
    );
  }

  render() {
    return (
      <app-page>
        <stencil-route-title pageTitle="Editor" />
        <div>
          {this.loading && (
            <div class="u-centered u-super o-page-loading">
              <loading-status status="loading" />
            </div>
          )}
          <document-editor
            class={this.loading ? 'u-display-none' : ''}
            doc={this.doc}
            onDocChanged={(doc) => this.saveDoc(doc)}
          />
        </div>
      </app-page>
    );
  }
}
