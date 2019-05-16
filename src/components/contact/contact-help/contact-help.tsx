import { Component, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase from '@/firebase/firebase';

@Component({
  tag: 'contact-help',
})
export class ContactHelp {
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
      <app-page>
        <stencil-route-title pageTitle="Contact" />
        <contact-us-form />
      </app-page>
    );
  }
}
