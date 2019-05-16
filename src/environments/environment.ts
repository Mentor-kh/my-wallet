// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // api: 'http://localhost:3000',
  api: 'https://my-wallet-c917b.firebaseio.com',
  firebaseConfig: {
    apiKey: 'AIzaSyDNCj6HqTMDao0BTvB9UjDv6hyb6Phte0A',
    authDomain: 'my-wallet-c917b.firebaseapp.com',
    databaseURL: 'https://my-wallet-c917b.firebaseio.com/',
    projectId: 'my-wallet-c917b',
    storageBucket: 'my-wallet-c917b.appspot.com',
    messagingSenderId: '300846754130',
    appId: '1:300846754130:web:38eef38f64ec4a25'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
