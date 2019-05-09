import { Component } from '@stencil/core';

@Component({
  tag: 'home-page',
  styleUrl: 'home-page.scss',
  shadow: true,
})
export class HomePage {
  render() {
    return (
      <div>
        <div class="logo">
          <typd-logo animated />
        </div>
        <div class="tagline">Write something. Share it.</div>
        <div class="links">
          <stencil-route-link url="/join">Create an account</stencil-route-link>
          or
          <stencil-route-link url="/login">login</stencil-route-link>
        </div>
        <div class="features">
          <p>
            <i class="tick" aria-hidden={true} />
            Live updates keep your audience engaged.
          </p>
          <p>
            <i class="tick" aria-hidden={true} />
            Consistant formatting and readability.
          </p>
          <p>
            <i class="tick" aria-hidden={true} />
            Share exactly what you want to say.
          </p>
          <p>
            <i class="tick" aria-hidden={true} />
            Control privacy with one click.
          </p>
        </div>
      </div>
    );
  }
}
