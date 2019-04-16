import { Component, Prop, Watch, Event, EventEmitter } from '@stencil/core';
import _debounce from 'lodash.debounce';

const DEBOUNCE_TIMEOUT = 1000;

@Component({
  tag: 'document-editor',
})
export class DocumentEditor {
  @Prop({ mutable: true })
  doc: any;

  // @State()
  // _doc: any = {};

  @Event()
  docChanged: EventEmitter;

  @Watch('doc')
  updateDoc(doc: any) {
    this.doc = doc;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.docChanged.emit(this.doc);
  }

  handleTitleInput(e) {
    this.doc.title = e.target.value;
    this.docChanged.emit(this.doc);
  }

  render() {
    return (
      <div class="o-editor">
        <form class="c-editor" onSubmit={(e) => this.handleSubmit(e)}>
          <input
            type="text"
            value={this.doc.title}
            class="c-field c-editor__title"
            placeholder="My Document..."
            onInput={_debounce((e) => this.handleTitleInput(e), DEBOUNCE_TIMEOUT)}
          />
        </form>
      </div>
    );
  }
}
