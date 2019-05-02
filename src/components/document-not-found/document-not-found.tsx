import { Component } from '@stencil/core';

@Component({
  tag: 'document-not-found',
  styleUrl: 'document-not-found.scss',
  shadow: true,
})
export class DocumentNotFound {
  render() {
    return <div class="not-found">There are no words...</div>;
  }
}
