import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/toPromise';

export class ProtectedPage {

  constructor(protected fireAuth: AngularFireAuth) {}

  ionViewCanEnter(): boolean {
    return this.fireAuth.auth.currentUser !== null;

    /* TODO: get sure check works also at app load
    return this.fireAuth.authState
      .map(user => user !== null)
      .toPromise();
    */
  }
}