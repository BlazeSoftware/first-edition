import { Component, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'document-list',
})
export class DocumentList {
  @Prop({ mutable: true })
  docs: Array<any> = [];

  @Watch('docs')
  updateDocsList(docs) {
    this.docs = docs;
  }

  render() {
    return (
      <ul>
        {this.docs.map((snapshot) => {
          const doc = snapshot.data();

          return (
            <li>
              <stencil-route-link url={`/edit/${snapshot.ref.id}`} anchorClass="document" key={snapshot.ref.id}>
                {doc.title}
              </stencil-route-link>
            </li>
          );
        })}
      </ul>
    );
  }
}
