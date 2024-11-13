'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, CheckCircle2, XCircle } from "lucide-react"

export default function TradingViewInput() {
  const [tradingViewId, setTradingViewId] = useState('')
  const [storedTradingViewId, setStoredTradingViewId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { data: session, status } = useSession()

  useEffect(() => {
    const fetchTradingViewId = async () => {
      if (status === 'authenticated') {
        try {
          const response = await fetch('/api/tradingview/get')
          if (response.ok) {
            const data = await response.json()
            setStoredTradingViewId(data.tradingViewId)
          }
        } catch (error) {
          console.error('Error fetching TradingView ID:', error)
          setErrorMessage('Failed to fetch TradingView ID.')
        }
      }
    }

    fetchTradingViewId()
  }, [status])

  const handleSubmit = async () => {
    // Reset messages
    setSuccessMessage('')
    setErrorMessage('')

    if (status !== 'authenticated') {
      setErrorMessage("Authentication required. You must be logged in to submit your TradingView ID.")
      return
    }

    if (!tradingViewId.trim()) {
      setErrorMessage("TradingView ID cannot be empty.")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/tradingview/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tradingViewId, strategyName: 'N-Bar-Reversal-Detector' }),
      });

      if (response.ok) {
        setSuccessMessage("TradingView ID submitted successfully! You will receive the strategy within 24 hours.")
        setStoredTradingViewId(tradingViewId)
        setTradingViewId('')
      } else if (response.status === 409) {
        setErrorMessage("You have already submitted a TradingView ID.")
      } else if (response.status === 401) {
        setErrorMessage("Please join membership first.")
      } else {
        setErrorMessage("need to subscribe first.")
      }
    } catch (error) {
      console.error('Error submitting TradingView ID:', error)
      setErrorMessage("Failed to submit TradingView ID. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    // Reset messages
    setSuccessMessage('')
    setErrorMessage('')

    if (status !== 'authenticated') {
      setErrorMessage("Authentication required. You must be logged in to delete your TradingView ID.")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/tradingview/delete', {
        method: 'DELETE',
      })

      if (response.ok) {
        setSuccessMessage("TradingView ID deleted successfully!")
        setStoredTradingViewId('')
      } else if (response.status === 401) {
        setErrorMessage("Please join membership first.")
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.")
      }
    } catch (error) {
      console.error('Error deleting TradingView ID:', error)
      setErrorMessage("Failed to delete TradingView ID. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>TradingView ID</CardTitle>
        <CardDescription>Enter your TradingView ID to receive our strategy within 24 hours.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {successMessage && (
            <Alert variant="default">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}
          {errorMessage && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4 mr-2" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <Input
            type="text"
            id="tradingview-id"
            placeholder="Enter your TradingView ID"
            value={tradingViewId}
            onChange={(e) => setTradingViewId(e.target.value)}
            disabled={isLoading}
          />
          {storedTradingViewId && (
            <Alert variant="default">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              <AlertTitle>Stored TradingView ID</AlertTitle>
              <AlertDescription>{storedTradingViewId}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            'Submit'
          )}
        </Button>
        <Button onClick={handleDelete} variant="destructive" disabled={isLoading || !storedTradingViewId}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            'Delete'
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
