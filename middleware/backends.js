const workFirebase = 'https://nuxt-blog-85ef4.firebaseio.com/';
const homeFirebase = 'https://nuxt-blog-e14fc.firebaseio.com/';

const firebase = homeFirebase;

const firebaseWebAppConfig = `
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/6.2.4/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#config-web-app -->

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCtVZJ0-kdd7NBJHrDlTki9PpI894wEP1M",
    authDomain: "nuxt-blog-e14fc.firebaseapp.com",
    databaseURL: "https://nuxt-blog-e14fc.firebaseio.com",
    projectId: "nuxt-blog-e14fc",
    storageBucket: "nuxt-blog-e14fc.appspot.com",
    messagingSenderId: "1075111484842",
    appId: "1:1075111484842:web:e2f966089596fac1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>
`;


export default {
    firebase,
    workFirebase,
    homeFirebase
};