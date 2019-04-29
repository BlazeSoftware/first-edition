import { Component, Prop, Watch } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import services from '@/firebase/services';
import { store } from '@/firebase/firebase';

@Component({
  tag: 'document-list',
  styleUrl: 'document-list.scss',
})
export class DocumentList {
  @Prop()
  history: RouterHistory;

  @Prop()
  user: any;

  @Prop({ mutable: true })
  docs: Array<any> = [];

  @Watch('docs')
  updateDocsList(docs) {
    this.docs = docs;
  }

  async createNew() {
    if (this.user) await services.addDocument(this.user);
  }

  async deleteDoc(snapshot) {
    if (confirm('Are you sure you want to delete this document?')) {
      await store
        .collection('documents')
        .doc(snapshot.id)
        .delete();
      await store
        .collection('bodies')
        .doc(snapshot.id)
        .delete();
    }
  }

  render() {
    return (
      <div class="o-grid o-grid--wrap">
        <div class="o-grid__cell o-grid__cell--width-100 o-grid__cell--width-50@xsmall o-grid__cell--width-33@small o-grid__cell--width-25@medium">
          <stencil-route-link onClick={() => this.createNew()} anchorClass="doc create">
            <div class="title">Create New</div>
          </stencil-route-link>
        </div>
        {this.docs.map((snapshot) => {
          const doc = snapshot.data();

          return (
            <div class="o-grid__cell o-grid__cell--width-100 o-grid__cell--width-50@xsmall o-grid__cell--width-33@small o-grid__cell--width-25@medium">
              <div class="doc">
                <stencil-route-link url={`/edit/${snapshot.ref.id}`} key={snapshot.ref.id}>
                  <div class="title">{doc.title || 'Untitled'}</div>
                  <div class="body">{doc.preview}</div>
                </stencil-route-link>
                <button onClick={() => this.deleteDoc(snapshot)}>Remove</button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
