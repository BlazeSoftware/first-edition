import { h, Component, Prop, Watch } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import services from '@/firebase/services';

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

  friendlyNumber(views) {
    return views || 0;
  }

  render() {
    return (
      <div class="document-list o-grid o-grid--wrap">
        <div class="o-grid__cell o-grid__cell--width-100">
          <stencil-route-link onClick={() => this.createNew()} anchorClass="doc create">
            Create New
          </stencil-route-link>
        </div>
        {this.docs.map((snapshot) => {
          const doc = snapshot.data();

          return (
            <div class="o-grid__cell o-grid__cell--width-100 o-grid__cell--width-50@xsmall o-grid__cell--width-33@small o-grid__cell--width-25@medium">
              <div class="doc">
                <stencil-route-link url={`/edit/${snapshot.ref.id}`} key={snapshot.ref.id}>
                  <div class="title">
                    {doc.shared && <span class="public" />}
                    {doc.title || 'Untitled'}
                  </div>
                  <div class="body">{doc.body && doc.body.substring(0, 500)}</div>
                </stencil-route-link>
                <div class="views">{this.friendlyNumber(doc.views)} views</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
