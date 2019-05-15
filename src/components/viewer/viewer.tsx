import { Component, Prop, State, Element } from '@stencil/core';
import { RouterHistory, MatchResults } from '@stencil/router';
import { store } from '@/firebase/firebase';
import _debounce from 'lodash.debounce';
import commonmark from 'commonmark';
import hljs from 'highlight.js';

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

  async componentWillLoad() {
    const docRef = await store.collection('documents').doc(this.match.params.docId);

    this.onDocSnapshot = docRef.onSnapshot(
      (snapshot) => {
        if (!snapshot) {
          this.noDoc = true;
        }

        this.doc = snapshot.data();
        if (this.doc) {
          const reader = new commonmark.Parser({ smart: true });
          const writer = new commonmark.HtmlRenderer();

          this.doc.body = writer.render(reader.parse(this.doc.body));
          this.loading = false;
        }
      },
      () => {
        this.noDoc = true;
        this.loading = false;
      }
    );

    await docRef.get();
  }

  componentDidLoad() {
    this.highlightCode();
  }

  componentDidUpdate() {
    this.highlightCode();
  }

  highlightCode() {
    this.el.shadowRoot.querySelectorAll('code').forEach((block) => {
      console.log(block);
      hljs.highlightBlock(block);
    });
  }

  render() {
    return (
      <div>
        <stencil-route-title pageTitle={this.doc.title} />
        {this.noDoc && <document-not-found />}
        {this.loading && <loading-status status="loading" />}
        {!this.loading && this.doc && (
          <div class="editor">
            <h2 class="title">{this.doc.title}</h2>
            <div class="body" innerHTML={this.doc.body} />
            <div class="toolbar">
              <a href="https://typd.org" class="link" target="_blank">
                <typd-logo animated />
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }
}
