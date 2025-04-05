"use client"

import React from 'react'

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        GrocerGPT
      </h1>
      <p className="text-red-500">
        Welcome to GrocerGPT, your AI-powered grocery analyzer. Simplify your shopping and make smarter choices with ease!
      </p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => window.location.href = "/auth/login"}>
        Login
      </button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => window.location.href = "/auth/signup"}>
        Signup
      </button>
    </div>
  )
}

export default Home