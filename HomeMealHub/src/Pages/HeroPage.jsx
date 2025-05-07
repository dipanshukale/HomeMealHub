import React from 'react'
import HomePage from '../Components/HomePage'
import MenuPage from '../Components/MenuPage'
import Instructions from '../Components/Instructions'
import FoodDetailing from '../Components/FoodDetailing'
import Vendorsection from '../Components/Vendorsection'
import Footer from '../Components/Footer'
import Location from '../Components/Location'
import NutritionChatbot from '../Components/NutritionChatbot'
const HeroPage = () => {
  return (
      <>
          <HomePage/>
          <MenuPage/>
          <Instructions/>
          <FoodDetailing/>
          <Vendorsection/>
      <Location />
      <NutritionChatbot/>
      </>
  )
}

export default HeroPage