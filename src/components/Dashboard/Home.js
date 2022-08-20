// import React from 'react'
import { useRef } from 'react'
import { auth, storage, db } from '../../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { addDoc } from 'firebase/firestore/lite'
import { collection } from 'firebase/firestore/lite'
//import { async } from '@firebase/util'


const Home = () => {
  const form = useRef()
  const submitPortfolio = (e) => {
    e.preventDefault()
    const title = form.current[0]?.value
    const desc = form.current[1]?.value
    const url = form.current[2]?.value
    const src = form.current[3]?.value
    const cover = form.current[4]?.files[0]

    const storageRef = ref(storage, `portfolio/${cover.name}`)
    uploadBytes(storageRef, cover).then(
      (snapshot) => {
        getDownloadURL(snapshot.ref).then(
          (downloadURL) => {
            savePortfolio({
              title,
              desc,
              url,
              src,
              cover: downloadURL,
            })
          },
          (error) => {
            console.log(error);
            savePortfolio({
              title,
              desc,
              url,
              src,
              cover: null,
            })
          }
        )
      },
      (error) => {
        console.log(error);
        savePortfolio({
          title,
          desc,
          url,
          src,
          cover: null,
        })
      }
    )
  }
  const savePortfolio = async (portfolio) => {
    console.log(portfolio)
     try {
         await addDoc(collection(db, 'portfolio'), portfolio)
         window.location.reload(false)
     } catch (error) { 
         alert('Failed to add portfolio')
     }
  }

  return (
    <div className="dashboard">
      
      <form ref={form} onSubmit={submitPortfolio}>
        <p>
          <input type="text" placeholder="Title" />
        </p>
        <p>
          <textarea placeholder="Description" />
        </p>
        <p>
          <input type="text" placeholder="Url" />
        </p>
        <p>
          <input type="text" placeholder="Source Code" />
        </p>
        <p>
          <input type="file" placeholder="Image" />
        </p>
        <button type="submit">Submit</button>
        <button onClick={() => auth.signOut()} style={{ marginLeft: '40px' }}>
          Sign Out
        </button>
      </form>
    </div>
  )
}

export default Home
