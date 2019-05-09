import { Component, Prop, State } from '@stencil/core';
import { RouterHistory, MatchResults } from '@stencil/router';
import { store } from '@/firebase/firebase';
import moment from 'moment';
import _debounce from 'lodash.debounce';
import commonmark from 'commonmark';

@Component({
  tag: 'document-viewer',
  styleUrl: 'viewer.scss',
  shadow: true,
})
export class Viewer {
  @Prop()
  history: RouterHistory;

  @Prop()
  match: MatchResults;

  @State()
  loading: boolean = true;

  @State()
  saveMessage: string = '';

  @State()
  doc: any;

  @State()
  noDoc: boolean = false;

  docSnapshot: any;

  onDocSnapshot: any;
  statusChecker: any = (this.statusChecker = setInterval(() => {
    this.updateStatus();
  }, 30000));

  componentDidUnload() {
    if (this.onDocSnapshot) this.onDocSnapshot();
    clearInterval(this.statusChecker);
  }

  async componentWillLoad() {
    const docRef = await store.collection('documents').doc(this.match.params.docId);

    this.onDocSnapshot = docRef.onSnapshot(
      (snapshot) => {
        if (!snapshot) {
          this.noDoc = true;
        }

        this.doc = snapshot.data();
        const reader = new commonmark.Parser({ smart: true });
        const writer = new commonmark.HtmlRenderer({ safe: true });

        this.doc.body = writer.render(reader.parse(this.doc.body));
        this.updateStatus();

        this.loading = false;
      },
      () => {
        this.noDoc = true;
        this.loading = false;
      }
    );

    await docRef.get();
  }

  updateStatus() {
    const updated = this.doc.updated;
    if (updated) {
      return (this.saveMessage = `Saved ${moment(updated.toDate()).fromNow()}.`);
    }
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
