import { Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase, { store } from '@/firebase/firebase';
import moment from 'moment';
import _debounce from 'lodash.debounce';

const DEBOUNCE_TIMEOUT = 1000;

@Component({
  tag: 'doc-editor',
  styleUrl: 'editor.scss',
  shadow: true,
})
export class Editor {
  textareaRef: any;

  @Prop()
  history: RouterHistory;

  @Prop()
  docId: string;

  @State()
  loading: boolean = true;

  @State()
  saveMessage: string = '';

  @State()
  doc: any;

  @State()
  body: any;

  docSnapshot: any;
  bodySnapshot: any;

  firebaseUnsubscribe: any;
  onDocSnapshot: any;
  onBodySnapshot: any;
  statusChecker: any = (this.statusChecker = setInterval(() => {
    this.updateStatus();
  }, 30000));

  componentDidUnload() {
    if (this.onDocSnapshot) this.onDocSnapshot();
    if (this.onBodySnapshot) this.onBodySnapshot();
    this.firebaseUnsubscribe();
    clearInterval(this.statusChecker);
  }

  componentWillLoad() {
    this.firebaseUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) return this.history.push('/login');

      if (!this.docId) return (this.loading = false);

      const docRef = await store.collection('documents').doc(this.docId);
      const bodyRef = await store.collection('bodies').doc(this.docId);

      this.onDocSnapshot = docRef.onSnapshot((snapshot) => {
        if (snapshot.exists) {
          this.docSnapshot = snapshot;
          if (!this.doc) this.doc = this.docSnapshot.data();
          this.updateStatus();
        }
        this.loading = false;
      });

      this.onBodySnapshot = bodyRef.onSnapshot((snapshot) => {
        if (snapshot.exists) {
          this.bodySnapshot = snapshot;
          if (!this.body) {
            this.body = this.bodySnapshot.data();
          }
        }
        this.loading = false;
      });

      await docRef.get();
      await bodyRef.get();
    });
  }

  componentDidLoad() {
    console.log(this.textareaRef);
  }

  updateStatus() {
    const updated = this.docSnapshot.data().updated;
    if (updated) {
      return (this.saveMessage = `Saved ${moment(updated.toDate()).fromNow()}.`);
    }
  }

  handleTitleInput(e) {
    this.doc.title = e.target.value;
    this.saveMessage = 'Saving...';
    this.saveDoc();
  }

  handleBodyInput(e) {
    this.body.text = e.target.value;
    this.saveMessage = 'Saving...';
    this.saveDoc();
  }

  saveDoc = _debounce(this._saveDoc, DEBOUNCE_TIMEOUT);
  private async _saveDoc() {
    const preview = this.body.text && this.body.text.substring(0, 500);
    await this.docSnapshot.ref.set(
      {
        title: this.doc.title,
        preview: preview || '',
        updated: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    await this.bodySnapshot.ref.set(
      {
        text: this.body.text,
        updated: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    this.updateStatus();
  }

  render() {
    return (
      <div>
        {this.loading && <loading-status status="loading" />}
        {!this.loading && this.doc && this.body && (
          <div>
            <div class="status">{this.saveMessage}</div>
            <div class="c-editor">
              <input
                type="text"
                value={this.doc.title}
                class="title"
                placeholder="Title..."
                onInput={(e) => this.handleTitleInput(e)}
              />
              <textarea
                ref={(textarea) => (this.textareaRef = textarea)}
                class="body"
                onInput={(e) => this.handleBodyInput(e)}
                value={this.body.text}
                placeholder="Write something amazing..."
              />
            </div>
            <div class="toolbar">
              <span>https://www.first-edition.org/e/{this.docId}</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}
