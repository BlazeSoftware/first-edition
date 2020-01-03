import { h, Component } from '@stencil/core';

@Component({
  tag: 'privacy-policy',
})
export class PrivacyPolicy {
  render() {
    return (
      <div class="o-container o-container--medium u-window-box-xlarge">
        <stencil-route-title pageTitle="Privacy" />
        <h2 class="c-heading">Privacy Policy</h2>
        <p class="c-paragraph">
          Your privacy is important to us. It is Blaze Software Engineering's policy to respect your privacy regarding
          any information we may collect from you across our website,{' '}
          <span class="https://typd.org">https://typd.org</span>, and other sites we own and operate.
        </p>
        <p class="c-paragraph">
          We only ask for personal information when we truly need it to provide a service to you. We collect it by fair
          and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it
          will be used.
        </p>
        <p class="c-paragraph">
          We only retain collected information for as long as necessary to provide you with your requested service. What
          data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as
          unauthorised access, disclosure, copying, use or modification.
        </p>
        <p class="c-paragraph">
          We don’t share any personally identifying information publicly or with third-parties, except when required to
          by law.
        </p>
        <p class="c-paragraph">
          Our website may link to external sites that are not operated by us. Please be aware that we have no control
          over the content and practices of these sites, and cannot accept responsibility or liability for their
          respective privacy policies.
        </p>
        <p class="c-paragraph">
          You are free to refuse our request for your personal information, with the understanding that we may be unable
          to provide you with some of your desired services.
        </p>
        <p class="c-paragraph">
          Your continued use of our website will be regarded as acceptance of our practices around privacy and personal
          information. If you have any questions about how we handle user data and personal information, feel free to
          contact us.
        </p>
        <p class="c-paragraph">This policy is effective as of 1 May 2019.</p>
      </div>
    );
  }
}
