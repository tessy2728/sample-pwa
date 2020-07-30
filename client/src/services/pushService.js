
import fetchApi from './fetchService';
//To change status
function changePushStatus(status) {
    fabPushElement.dataset.checked = status;
    fabPushElement.checked = status;
    if (status) {
      fabPushElement.classList.add('active');
      fabPushImgElement.src = '../images/push-on.png';
    }
    else {
     fabPushElement.classList.remove('active');
     fabPushImgElement.src = '../images/push-off.png';
    }
  }
  //To check `push notification` is supported or not
  function isPushSupported() {
    //To check `push notification` permission is denied by user
    if (Notification.permission === 'denied') {
      alert('User has blocked push notification.');
      return;
    }

    //Check `push notification` is supported or not
    if (!('PushManager' in window)) {
      alert('Sorry, Push notification isn\'t supported in your browser.');
      return;
    }

    //Get `push notification` subscription
    //If `serviceWorker` is registered and ready
    navigator.serviceWorker.ready
      .then(function (registration) {
        registration.pushManager.getSubscription()
        .then(function (subscription) {
          //If already access granted, enable push button status
          if (subscription) {
            changePushStatus(true);
          }
          else {
            changePushStatus(false);
          }
        })
        .catch(function (error) {
          console.error('Error occurred while enabling push ', error);
        });
      });
  }
  function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
export const subscribePush = () => {
  if (Notification.permission === 'denied') {
    alert('User has blocked push notification.');
    return;
  }

  //Check `push notification` is supported or not
  if (!('PushManager' in window)) {
    alert('Sorry, Push notification isn\'t supported in your browser.');
    return;
  }
    navigator.serviceWorker.ready.then(function(registration) {
        console.log('checking for push')
      if (!registration.pushManager) {
        alert('Your browser doesn\'t support push notification.');
        return false;
      }
  
      //To subscribe `push notification` from push manager
      registration.pushManager.subscribe({
        userVisibleOnly: true, //Always show notification when received
        applicationServerKey: urlBase64ToUint8Array("BCNfUJ3TejsRT0e3tHXHDlqhs5DALH0fiUTwonprjmLXnIcD7X-GY_40FfTwUseE2tC7sP_wwQ81A4t3y-F0H1c")
      })
      .then(function (subscription) {
        alert('Subscribed successfully.');
        console.info('Push notification subscribed.');
        console.log(subscription);
        saveSubscriptionID(subscription);
        navigator.serviceWorker.addEventListener('push', function(event) {

          console.info('Event: Push');
        
          var title = 'New commit on Github Repo: RIL';
        
          var body = {
            'body': 'Click to see the latest commit',
            'tag': 'pwa',
            'icon': './images/48x48.png'
          };
        
          event.waitUntil(
            navigator.serviceWorker.registration.showNotification(title, body)
          );
        });
        // changePushStatus(true);
      })
      .catch(function (error) {
        // changePushStatus(false);
        console.error('Push notification subscription error: ', error);
      });
    })
  }

  export const  saveSubscriptionID = (subscription) => {
    var subscription_id = subscription.endpoint.split('fcm/send/')[1];

    console.log("Subscription ID", subscription_id);

    fetchApi.post('http://localhost:3000/api/users', { user_id : subscription_id })
  }

  
  
  