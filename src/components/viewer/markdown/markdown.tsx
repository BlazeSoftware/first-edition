import { h, Component, Prop, State, Element } from '@stencil/core';
import _debounce from 'lodash.debounce';
import commonmark from 'commonmark';
import hljs from 'highlight.js';

@Component({
  tag: 'render-markdown',
  styleUrl: 'markdown.scss',
  shadow: true,
})
export class Markdown {
  @Element()
  el: HTMLElement;

  @Prop()
  content: string;

  @State()
  html: any;

  async componentDidLoad() {
    const reader = new commonmark.Parser({ smart: true });
    const writer = new commonmark.HtmlRenderer();

    this.html = writer.render(reader.parse(this.content));

    this.highlightCode();
  }

  componentDidUpdate() {
    this.highlightCode();
  }

  highlightCode() {
    this.el.shadowRoot.querySelectorAll('code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }

  render() {
    return <div innerHTML={this.html} />;
  }
}
