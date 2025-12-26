// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Firebase config - SAME as in HTML
const firebaseConfig = {
  apiKey: "AIzaSyDoBtFtFEs6Cd-uU6dNvwXNAuXOd1R1r10",
  authDomain: "post-58eb6.firebaseapp.com",
  projectId: "post-58eb6",
  storageBucket: "post-58eb6.firebasestorage.app",
  messagingSenderId: "448356917822",
  appId: "1:448356917822:web:8251dc0ecff7fcd0efe76f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);
  
  const notificationTitle = payload.notification?.title || 'New Update from Trulune';
  const notificationOptions = {
    body: payload.notification?.body || 'Check out our latest content!',
    icon: './images/Logo.png',
    badge: './images/Logo.png',
    data: payload.data || {}
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', function(event) {
  console.log('Notification click received.');
  event.notification.close();
  
  // Open your website when notification is clicked
  event.waitUntil(
    clients.matchAll({type: 'window', includeUncontrolled: true}).then(function(clientList) {
      for (let i = 0; i < clientList.length; i++) {
        let client = clientList[i];
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});