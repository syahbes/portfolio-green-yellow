import React, { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
// import portfolioData from '../../../src/data/portfolio.json'
import { getDocs, collection } from 'firebase/firestore/lite'
import { db } from '../../firebase'

const Portfolio = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const [portfolio, setPortfolio] = useState([])
  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    getPortfolio()
  }, [])

  const getPortfolio = async () => {
    try {
      const querySnapshop = await getDocs(collection(db, 'portfolio'))
      // console.log(querySnapshop)
      setPortfolio(querySnapshop.docs.map((doc) => doc.data()))
    } catch (error) {
      console.log(error)
    }
  }
  // console.log(portfolio)

  const renderPortfolio = (portfolio) => {
    return (
      <div className="images-container">
        {portfolio.map((port,i) => {
          return (
            <div className="image-box" key={i}>
              <img
                src={port.cover}
                className="portfolio-image"
                alt="portfolio"
              />
              <div className="content">
                <p className="title">{port.title}</p>
                <h4 className="description">{port.desc}</h4>
                <button className="btn" onClick={() => window.open(port.url)}>
                  View
                </button>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <>
      <div className="container portfolio-page">
        <h1 className="page-title">
          <AnimatedLetters
            letterClass={letterClass}
            strArray={'Portfolio'.split('')}
            idx={15}
          />
        </h1>
        <div>{renderPortfolio(portfolio)}</div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Portfolio
