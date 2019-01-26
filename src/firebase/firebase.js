import * as firebase from 'firebase';  

// Initialize Firebase
const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain:  process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL:  process.env.FIREBASE_DATABASE_URL,
    projectId:  process.env.FIREBASE_PROJECT_ID,
    storageBucket:  process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId:  process.env.FIREBASE_MESSAGING_SENDER_ID
  };

  firebase.initializeApp(config);
  const database = firebase.database();

  export { firebase, database as default };

  // //child_removed
  // database.ref('expenses').on('child_removed', (snapshot) => {
  //   console.log(snapshot.key, snapshot.val());
  // });

  // //child_changed
  // database.ref('expenses').on('child_changed', (snapshot) => {
  //   console.log(snapshot.key, snapshot.val());
  // });
  
  // //child_added
  // database.ref('expenses').on('child_added', (snapshot) => {
  //   console.log(snapshot.key, snapshot.val());
  // });

  // database.ref('expenses')
  // .once('value')
  // .then((snapshot) => {
  //   const expenses = [];
    
  //   snapshot.forEach((childSnapshot) => {
  //     expenses.push({
  //       id: childSnapshot.key,
  //       ...childSnapshot.val()
  //     });
  //   });
  //   console.log(expenses);
  // });

  // database.ref('expenses').push({
  //   description: 'Light',
  //   note: 'Bill needs to be paid urgently',
  //   amount: '$1200.00',
  //   createdAt: 'september 1st, 2018'
  // });

  // database.ref('location/city')
  //   .once('value')
  //   .then((snapshot) => {
  //     const val = snapshot.val();
  //     console.log(val);
  //   })
  //   .catch((e) => {
  //     console.log('Error fech data', e);
  //   });

  // database.ref().set({
  //   name: 'Daniel Dawson',
  //   age: 24,
  //   stressLevel: 6,
  //   job: {
  //       title: 'Software Developer',
  //       company: 'Facebook'
  //   },
  //   location: {
  //       city: 'Brown"s Town',
  //       country: 'Jamaica'
  //   }
  // }).then(() => {
  //   console.log('Data is saved');
  // }).catch((error) => {
  //     console.log('This failed', error);
  // });

  // database.ref().update({
  //   stressLevel: 9,
  //   'job/company': 'Amazon',
  //   'location/city': 'Seattle'
  // });