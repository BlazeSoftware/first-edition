import { Component } from '@stencil/core';

@Component({
  tag: 'typd-logo',
  styleUrl: 'typd-logo.scss',
  shadow: true,
})
export class Logo {
  render() {
    return <h1>typd.</h1>;
  }
}
