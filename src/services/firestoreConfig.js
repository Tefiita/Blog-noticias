import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDMGSSzd6MCINKfazW66FSH0nLFmmnIqAI',
  authDomain: 'blog-noticias-ad18d.firebaseapp.com',
  projectId: 'blog-noticias-ad18d',
  storageBucket: 'blog-noticias-ad18d.firebasestorage.app',
  messagingSenderId: '915826806509',
  appId: '1:915826806509:web:a31fd91bcec123006586e4',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
