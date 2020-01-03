import { h, Component, Prop } from '@stencil/core';

@Component({
  tag: 'typd-logo',
  styleUrl: 'typd-logo.scss',
  shadow: true,
})
export class Logo {
  @Prop()
  animated: boolean;

  render() {
    const animatedClass = this.animated ? 'animated' : '';
    return (
      <h1 class={animatedClass}>
        <span>t</span>
        <span>y</span>
        <span>p</span>
        <span>d</span>
        <span>.</span>
        <div class="cursor" />
      </h1>
    );
  }
}
