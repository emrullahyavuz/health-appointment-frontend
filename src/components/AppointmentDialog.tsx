import type React from "react"
import { useState } from "react"
import { User, CreditCard } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/Dialog"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Label } from "./ui/Label"
import { Textarea } from "./ui/TextArea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/Select"
import { Badge } from "./ui/Badge"
import { Separator } from "./ui/Seperator"
// import { useAuth } from "../lib/auth"
// import { api } from "../lib/api"

interface Doctor {
  _id: string
  user: {
    name: string
    email: string
    phone: string
    avatar?: string
  }
  specialty: string
  experience: number
  education: string
  languages: string[]
  workingHours: {
    day: string
    startTime: string
    endTime: string
    isAvailable: boolean
  }[]
  consultationFee: number
  location: string
  about: string
  rating: number
  reviewCount: number
  isAvailable: boolean
  nextAvailableSlot?: string
}

interface AppointmentDialogProps {
  doctor: Doctor | null
  isOpen: boolean
  onClose: () => void
}

const appointmentTypes = [
  "General Consultation",
  "Follow-up Visit",
  "Emergency Consultation",
  "Routine Check-up",
  "Second Opinion",
]

export function AppointmentDialog({ doctor, isOpen, onClose }: AppointmentDialogProps) {
  const [appointmentData, setAppointmentData] = useState({
    date: "",
    time: "",
    type: "",
    symptoms: "",
    notes: "",
  })
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  // const { user, token } = useAuth()

  if (!doctor) return null

  const generateTimeSlots = (startTime: string, endTime: string) => {
    const slots = []
    const start = new Date(`2000-01-01 ${startTime}`)
    const end = new Date(`2000-01-01 ${endTime}`)

    while (start < end) {
      slots.push(
        start.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      )
      start.setMinutes(start.getMinutes() + 30) // 30-minute slots
    }

    return slots
  }

  const handleDateChange = (date: string) => {
    setAppointmentData((prev) => ({ ...prev, date, time: "" }))

    if (date) {
      const selectedDate = new Date(date)
      const dayName = selectedDate.toLocaleDateString("en-US", { weekday: "long" })

      const daySchedule = doctor.workingHours.find(
        (schedule) => schedule.day.toLowerCase() === dayName.toLowerCase() && schedule.isAvailable,
      )

      if (daySchedule) {
        const slots = generateTimeSlots(daySchedule.startTime, daySchedule.endTime)
        setAvailableSlots(slots)
      } else {
        setAvailableSlots([])
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // if (!token) {
    //   setError("Please login to book an appointment")
    //   setIsSubmitting(false)
    //   return
    // }

    // try {
    //   const response = await api.appointments.create(token, {
    //     doctorId: doctor._id,
    //     date: appointmentData.date,
    //     time: appointmentData.time,
    //     type: appointmentData.type,
    //     symptoms: appointmentData.symptoms,
    //     notes: appointmentData.notes,
    //   })

    //   if (response.ok) {
    //     const result = await response.json()
    //     alert("Appointment booked successfully!")

    //     // Reset form and close dialog
    //     setAppointmentData({
    //       date: "",
    //       time: "",
    //       type: "",
    //       symptoms: "",
    //       notes: "",
    //     })
    //     setAvailableSlots([])
    //     onClose()
    //   } else {
    //     const errorData = await response.json()
    //     setError(errorData.message || "Failed to book appointment")
    //   }
    // } catch (err) {
    //   setError("Network error. Please try again.")
    // } finally {
    //   setIsSubmitting(false)
    // }
  }

  const handleInputChange = (field: string, value: string) => {
    setAppointmentData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Book Appointment</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Doctor Info */}
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <img
              src={doctor.user.avatar || "/placeholder.svg?height=64&width=64"}
              alt={doctor.user.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{doctor.user.name}</h3>
              <p className="text-sm text-gray-600">{doctor.specialty}</p>
              <p className="text-sm text-gray-500">{doctor.location}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className="bg-green-100 text-green-800">
                  {doctor.isAvailable ? "Available" : "Not Available"}
                </Badge>
                <span className="text-lg font-bold text-gray-900">${doctor.consultationFee}</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date and Time Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Select Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={appointmentData.date}
                  onChange={(e) => handleDateChange(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Select Time</Label>
                <Select
                  value={appointmentData.time}
                  onValueChange={(value) => handleInputChange("time", value)}
                  required
                  disabled={!appointmentData.date || availableSlots.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        !appointmentData.date
                          ? "Select date first"
                          : availableSlots.length === 0
                            ? "No slots available"
                            : "Choose time slot"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Appointment Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Appointment Type</Label>
              <Select value={appointmentData.type} onValueChange={(value) => handleInputChange("type", value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select appointment type" />
                </SelectTrigger>
                <SelectContent>
                  {appointmentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Patient Information */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Patient Information</span>
              </h4>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label>Patient Name</Label>
                  <Input value={user?.name || ""} disabled />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input value={user?.phone || ""} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input value={user?.email || ""} disabled />
                  </div>
                </div>
              </div>
            </div>

            {/* Symptoms/Reason */}
            <div className="space-y-2">
              <Label htmlFor="symptoms">Symptoms / Reason for Visit</Label>
              <Textarea
                id="symptoms"
                value={appointmentData.symptoms}
                onChange={(e) => handleInputChange("symptoms", e.target.value)}
                placeholder="Please describe your symptoms or reason for the appointment..."
                rows={4}
                required
              />
            </div>

            {/* Additional Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={appointmentData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Any additional information you'd like to share..."
                rows={3}
              />
            </div>

            <Separator />

            {/* Payment Summary */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                <CreditCard className="w-4 h-4" />
                <span>Payment Summary</span>
              </h4>

              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>Consultation Fee</span>
                  <span>${doctor.consultationFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee</span>
                  <span>$10</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total Amount</span>
                  <span>${doctor.consultationFee + 10}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 bg-transparent"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? "Booking..." : "Confirm Appointment"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
