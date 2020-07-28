import * as firebase from 'firebase';

export const initializeFirebase = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDS1NV93DR89XkBsmm95j3Ci9rktgKDWr0",
    authDomain: "samplepwa-af551.firebaseapp.com",
    databaseURL: "https://samplepwa-af551.firebaseio.com",
    projectId: "samplepwa-af551",
    storageBucket: "samplepwa-af551.appspot.com",
    messagingSenderId: "974631219767",
    appId: "1:974631219767:web:3f08f295826def597285b2",
    // vapidKey: 'BCNfUJ3TejsRT0e3tHXHDlqhs5DALH0fiUTwonprjmLXnIcD7X-GY_40FfTwUseE2tC7sP_wwQ81A4t3y-F0H1c'
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  registerFCM();
}

export const registerFCM = async () => {
  const messaging = firebase.messaging();
  await messaging.requestPermission();
  messaging.getToken().then((currentToken) => {
    if (currentToken) {
      localStorage.setItem('notifications-token', currentToken);
    } else {
      // Show permission request.
      console.log('No Instance ID token available. Request permission to generate one.');
      // Show permission UI.
      updateUIForPushPermissionRequired();
      setTokenSentToServer(false);
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    showToken('Error retrieving Instance ID token. ', err);
    setTokenSentToServer(false);
  });
}