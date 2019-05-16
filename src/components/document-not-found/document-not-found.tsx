import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'document-not-found',
  styleUrl: 'document-not-found.scss',
  shadow: true,
})
export class DocumentNotFound {
  @Prop()
  url: string = '/';

  @Prop()
  actionText: string;

  render() {
    return (
      <div class="not-found">
        <div class="msg">Document not found</div>
        <stencil-route-link url={this.url}>{this.actionText || <typd-logo />}</stencil-route-link>
      </div>
    );
  }
}
