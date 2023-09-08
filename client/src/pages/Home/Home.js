import React from 'react'
import { Helmet } from 'react-helmet'
import food from "./food.jpg"

const Home = () => {
  return (
    <div>
    <Helmet>
    <meta charSet="utf-8" />
    <title>Home page</title>
    <link rel="canonical" />
    <meta
    name="description"
    content="Ventre produit"
  />
</Helmet>
        <img src={food} alt="food" style={{width :"100%"}}/>
    </div>
  )
}

export default Home
