// components/CancelSubscriptionButton.tsx
"use client"

import { useState } from "react"
import axios from "axios"
import Modal from "@/components/modal"
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"

interface CancelSubscriptionButtonProps {
  subscriptionId: string
  onCancel: (id: string) => void
}

const CancelSubscriptionButton = ({ subscriptionId, onCancel }: CancelSubscriptionButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [feedback, setFeedback] = useState<{ message?: string; error?: string }>({})
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCancel = async () => {
    setIsLoading(true)
    setFeedback({})

    try {
      const response = await axios.post("/api/cancel-subscription", { subscriptionId })
      if (response.status === 200) {
        setFeedback({ message: "Subscription cancelled successfully." })
        onCancel(subscriptionId)
      } else {
        setFeedback({ error: "Failed to cancel subscription." })
      }
    } catch (err: any) {
      setFeedback({
        error: err.response?.data?.message || "An unexpected error occurred.",
      })
    } finally {
      setIsLoading(false)
      setIsModalOpen(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
        Cancel Subscription
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Confirm Cancellation">
        <p className="mb-4">If you cancel now, you will no longer be able to request new strategies immediately</p>
        {feedback.error && <p className="text-red-600 mb-4">{feedback.error}</p>}
        {feedback.message && <p className="text-green-600 mb-4">{feedback.message}</p>}
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200"
          >
            Close
          </button>
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className={`flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 ${
              isLoading && "opacity-50 cursor-not-allowed"
            }`}
          >
            {isLoading ? "Cancelling..." : "Confirm"}
          </button>
        </div>
      </Modal>
    </>
  )
}

export default CancelSubscriptionButton
