import { Component, Prop, State, Element } from '@stencil/core';
import { RouterHistory, MatchResults } from '@stencil/router';
import { store } from '@/firebase/firebase';
import _debounce from 'lodash.debounce';

@Component({
  tag: 'document-viewer',
  styleUrl: 'viewer.scss',
  shadow: true,
})
export class Viewer {
  @Element()
  el: HTMLElement;

  @Prop()
  history: RouterHistory;

  @Prop()
  match: MatchResults;

  @State()
  loading: boolean = true;

  @State()
  doc: any;

  @State()
  noDoc: boolean = false;

  docSnapshot: any;
  onDocSnapshot: any;

  componentDidUnload() {
    if (this.onDocSnapshot) this.onDocSnapshot();
  }

  async componentDidLoad() {
    const docRef = await store.collection('documents').doc(this.match.params.docId);

    this.onDocSnapshot = docRef.onSnapshot(
      (snapshot) => {
        if (!snapshot) {
          this.noDoc = true;
        }

        this.doc = snapshot.data();
        this.loading = false;
      },
      () => {
        this.noDoc = true;
        this.loading = false;
      }
    );

    const snapshot = await docRef.get();

    if (snapshot.exists) {
      fetch(`/analytics/read/${this.match.params.docId}`);
    }
  }

  content() {
    if (this.noDoc) return <document-not-found />;
    if (this.loading) return <loading-status status="loading" />;
    if (this.doc) {
      return (
        <div class="editor">
          <stencil-route-title pageTitle={this.doc.title} />

          <h2 class="title">{this.doc.title}</h2>
          <div class="body">
            <render-markdown content={this.doc.body} />
          </div>
          <div class="toolbar">
            <a href="https://typd.org" class="link" target="_blank">
              <typd-logo animated />
            </a>
          </div>
        </div>
      );
    }
  }

  render() {
    return <div>{this.content()}</div>;
  }
}
