import { Component, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase from '@/firebase/firebase';

@Component({
  tag: 'contact-us',
})
export class ContactUs {
  @Prop()
  history: RouterHistory;

  firebaseUnsubscribe: any;
  componentDidUnload() {
    if (this.firebaseUnsubscribe) this.firebaseUnsubscribe();
  }

  componentDidLoad() {
    this.firebaseUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) return this.history.push('/login');
    });
  }

  render() {
    return (
      <main class="o-container o-container--medium u-window-box-medium">
        <stencil-route-title pageTitle="Contact" />
        <contact-us-form />
      </main>
    );
  }
}
