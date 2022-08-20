import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: 'AIzaSyC52TMVowehP8KY4HuANkWP3ANy9Q6p41I',
  authDomain: 'react-portfolio-dashboar-8c3bd.firebaseapp.com',
  projectId: 'react-portfolio-dashboar-8c3bd',
  storageBucket: 'react-portfolio-dashboar-8c3bd.appspot.com',
  messagingSenderId: '766562816977',
  appId: '1:766562816977:web:e9234aae5435cdaef186f0',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth()
const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)

export const signInWithGoogle = () => signInWithPopup(auth, provider)
