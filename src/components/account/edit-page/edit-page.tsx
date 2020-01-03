import { h, Component, Prop } from '@stencil/core';
import { MatchResults, RouterHistory } from '@stencil/router';
import firebase from '@/firebase/firebase';
import _debounce from 'lodash.debounce';

@Component({
  tag: 'edit-page',
})
export class EditPage {
  @Prop()
  history: RouterHistory;

  @Prop()
  match: MatchResults;

  firebaseUnsubscribe: any;
  componentDidUnload() {
    if (this.firebaseUnsubscribe) this.firebaseUnsubscribe();
  }

  componentWillLoad() {
    this.firebaseUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) return this.history.push('/login');
    });
  }

  render() {
    return (
      <app-page>
        <stencil-route-title pageTitle="Editor" />
        <document-editor doc-id={this.match.params.docId} />
      </app-page>
    );
  }
}
