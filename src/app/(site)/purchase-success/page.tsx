"use client"

import { useState, useEffect } from 'react'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function PurchaseSuccessPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className={`max-w-md w-full p-8 bg-white rounded-lg shadow-2xl transform transition-all duration-500 ${mounted ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Purchase Successful!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your purchase! We will reach out to you within 24 hours with the link to join the private fund.
          </p>
          <Link 
            href="/" 
            className="inline-block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}