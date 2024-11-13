'use client'

import { useState, useEffect } from "react"
import { User, Clock, Calendar, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import axios from "axios"

interface User {
  id: string
  name: string | null
  email: string | null
}

interface Subscription {
  id: string
  subscriptionId: string
  planType: string | null
  status: string
  endDate?: string
  remainingDays?: number
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState<string | null>(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get("/api/get-subscriptions")
      setUser(data.user)
      setSubscriptions(data.subscriptions)
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load profile.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = async (subscriptionId: string) => {
    setIsLoading(true)
    try {
      await axios.post("/api/cancel", { subscriptionId })
      setSubscriptions((prev) =>
        prev.map((sub) =>
          sub.subscriptionId === subscriptionId
            ? { ...sub, status: "CANCELLED" }
            : sub
        )
      )
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to cancel subscription.")
    } finally {
      setIsLoading(false)
      setShowDialog(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Loading your profile...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl mt-12">
      {user && (
        <>
          <h1 className="text-4xl font-bold mb-8 text-center">Your Profile</h1>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold">
                {user.name ? user.name.charAt(0).toUpperCase() : <User size={24} />}
              </div>
              <div>
                <p className="text-lg"><span className="font-semibold">Name:</span> {user.name}</p>
                <p className="text-lg"><span className="font-semibold">Email:</span> {user.email}</p>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <h2 className="text-2xl font-semibold mb-4">Your Subscriptions</h2>
      {subscriptions.length === 0 ? (
        <Card>
          <CardContent className="text-center py-6">
            <p className="text-muted-foreground">You have no active subscriptions.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {subscriptions.map((sub) => (
            <Card key={sub.id}>
              <CardContent className="flex justify-between items-center py-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{sub.planType}</h3>
                  <p className="flex items-center space-x-2 mb-1">
                    <span className={`inline-block w-3 h-3 rounded-full ${
                      sub.status.toUpperCase() === "ACTIVE" ? "bg-green-500" :
                      sub.status.toUpperCase() === "CANCELLED" ? "bg-red-500" : "bg-yellow-500"
                    }`}></span>
                    <span className="font-medium">{sub.status.toUpperCase()}</span>
                  </p>
                  {sub.remainingDays !== undefined && (
                    <p className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock size={16} />
                      <span>{sub.remainingDays} days remaining</span>
                    </p>
                  )}
                  {sub.endDate && (
                    <p className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar size={16} />
                      <span>Ends on {new Date(sub.endDate).toLocaleDateString()}</span>
                    </p>
                  )}
                </div>
                {sub.status.toUpperCase() !== "CANCELLED" && (
                  <Button variant="destructive" onClick={() => {
                    setSelectedSubscription(sub.subscriptionId)
                    setShowDialog(true)
                  }}>
                    Cancel
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Subscription</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your subscription? You will no longer be able to request new strategies immediately.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>Keep Subscription</Button>
            <Button variant="destructive" onClick={() => selectedSubscription && handleCancel(selectedSubscription)}>
              Yes, Cancel Subscription
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
