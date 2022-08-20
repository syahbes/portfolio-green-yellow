import { useState, useEffect, useRef } from 'react'
import Loader from 'react-loaders'
import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import emailjs from '@emailjs/browser'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const form = useRef()

  // const animateHover = () => {
  //   return setTimeout(() => {
  //     setLetterClass('text-animate-hover')
  //   }, 3000)
  // }
  // useEffect(() => {
  //   animateHover()
  // }, [])

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  const sendEmail = (e) => {
    e.preventDefault()
    emailjs
      .sendForm(
        'service_evk3hqk',
        'template_wh4890s',
        form.current,
        'SM34eR24S2EWWt2HE'
      )
      .then(
        () => {
          alert('Message successfully sent!')
          window.location.reload(false)
        },
        () => {
          alert('Failed to send the message, please try again')
        }
      )
  }

  return (
    <>
      <div className="container contact-page">
        <div className="text-zone">
          <h1 className='page-title'>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={("Contact me").split("")}
              idx={15}
            />
          </h1>
          <p>
            I am interested in freelance opportunities - especially ambitious or
            large projects. However, if you have other request or question,
            don't hesitate to contact me using below form either.
          </p>
          <div className="contact-form">
          <form ref={form} onSubmit={sendEmail}>
              <ul>
                <li className="half">
                <input type="text" name="user_name" placeholder="Name" required />
                </li>
                <li className="half">
                  <input
                    type="email"
                    name="user_email"
                    placeholder="Email"
                    required
                  />
                </li>
                <li>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    required
                  />
                </li>
                <li>
                  <textarea
                    name="message"
                    placeholder="Message"
                    required
                  ></textarea>
                </li>
                <li><input type="submit" className='flat-button' value="SEND"/></li>
              </ul>
            </form>
          </div>
        </div>
        <div className="info-map">
          Shlomi Yahbes
          <br/>
          Rishon LeTsiyon
          <br/>
          Israel
          <br/>
          <span>syahbes@gmail.com</span>
        </div>
        <div className="map-wrap">
        <MapContainer center={[31.999291, 34.737509]} zoom={10}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[31.999291, 34.737509]}>
              <Popup>Shlomi lives here, come over for a cup of coffee ☕</Popup>
            </Marker>
          </MapContainer>
        </div>

      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Contact
