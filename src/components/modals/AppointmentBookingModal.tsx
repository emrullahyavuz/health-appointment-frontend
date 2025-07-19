import { useState } from "react"
import { Calendar, Clock, User, CreditCard, MapPin, Video } from "lucide-react"
import { BaseModal } from "./BaseModal"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"
import { Textarea } from "../ui/TextArea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/Select"
import { Badge } from "../ui/Badge"
import { useDispatch, useSelector } from "react-redux"
// import { createAppointment } from "../../redux/appointment/AppointmentSlice"
import { closeModal } from "../../redux/modal/ModalSlice"
import type { AppDispatch } from "../../redux/store"

interface AppointmentBookingModalProps {
  data?: {
    doctor: any
    selectedDate?: string
    selectedTime?: string
  }
}

export function AppointmentBookingModal({ data }: AppointmentBookingModalProps) {
  const dispatch = useDispatch<AppDispatch>()
//   const { loading } = useSelector((state) => state.appointment)
//   const { user } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    date: data?.selectedDate || "",
    time: data?.selectedTime || "",
    type: "consultation",
    symptoms: "",
    notes: "",
    paymentMethod: "card",
  })

  const [step, setStep] = useState(1)

  const doctor = data?.doctor

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    if (!doctor || !formData.date || !formData.time) return

    const appointmentData = {
      doctorId: doctor._id,
      date: formData.date,
      time: formData.time,
      type: formData.type,
      symptoms: formData.symptoms,
      notes: formData.notes,
      paymentMethod: formData.paymentMethod,
    }

    try {
    //   await dispatch(createAppointment(appointmentData)).unwrap()
      dispatch(closeModal())
    } catch (error) {
      console.error("Appointment booking failed:", error)
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      {/* Doctor Info */}
      <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
        <img
          src={doctor?.user?.avatar || "/placeholder.svg?height=60&width=60"}
          alt={doctor?.user?.name}
          className="w-15 h-15 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-gray-900">{doctor?.user?.name}</h3>
          <p className="text-sm text-gray-600">{doctor?.specialty}</p>
          <div className="flex items-center space-x-2 mt-1">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">{doctor?.location}</span>
          </div>
        </div>
        <div className="ml-auto text-right">
          <p className="text-2xl font-bold text-indigo-600">${doctor?.consultationFee}</p>
          <p className="text-sm text-gray-500">Consultation</p>
        </div>
      </div>

      {/* Date & Time Selection */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="flex items-center space-x-2 mb-2">
            <Calendar className="w-4 h-4" />
            <span>Select Date</span>
          </Label>
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div>
          <Label className="flex items-center space-x-2 mb-2">
            <Clock className="w-4 h-4" />
            <span>Select Time</span>
          </Label>
          <Select value={formData.time} onValueChange={(value) => handleInputChange("time", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Choose time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="09:00">09:00 AM</SelectItem>
              <SelectItem value="10:00">10:00 AM</SelectItem>
              <SelectItem value="11:00">11:00 AM</SelectItem>
              <SelectItem value="14:00">02:00 PM</SelectItem>
              <SelectItem value="15:00">03:00 PM</SelectItem>
              <SelectItem value="16:00">04:00 PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Appointment Type */}
      <div>
        <Label className="mb-2 block">Appointment Type</Label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleInputChange("type", "consultation")}
            className={`p-4 border rounded-xl text-left transition-all ${
              formData.type === "consultation"
                ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <User className="w-5 h-5 mb-2" />
            <p className="font-medium">In-Person</p>
            <p className="text-sm text-gray-500">Visit clinic</p>
          </button>
          <button
            onClick={() => handleInputChange("type", "video-call")}
            className={`p-4 border rounded-xl text-left transition-all ${
              formData.type === "video-call"
                ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Video className="w-5 h-5 mb-2" />
            <p className="font-medium">Video Call</p>
            <p className="text-sm text-gray-500">Online consultation</p>
          </button>
        </div>
      </div>

      {/* Symptoms */}
      <div>
        <Label htmlFor="symptoms">Symptoms / Reason for Visit</Label>
        <Textarea
          id="symptoms"
          placeholder="Describe your symptoms or reason for the appointment..."
          value={formData.symptoms}
          onChange={(e) => handleInputChange("symptoms", e.target.value)}
          className="mt-2"
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button variant="outline" onClick={() => dispatch(closeModal())}>
          Cancel
        </Button>
        <Button
          onClick={() => setStep(2)}
          disabled={!formData.date || !formData.time}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      {/* Appointment Summary */}
      <div className="p-4 bg-gray-50 rounded-xl">
        <h3 className="font-medium text-gray-900 mb-3">Appointment Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Doctor:</span>
            <span className="font-medium">{doctor?.user?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date & Time:</span>
            <span className="font-medium">
              {formData.date} at {formData.time}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Type:</span>
            <Badge variant="secondary">{formData.type}</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Consultation Fee:</span>
            <span className="font-bold text-lg">${doctor?.consultationFee}</span>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <Label className="flex items-center space-x-2 mb-3">
          <CreditCard className="w-4 h-4" />
          <span>Payment Method</span>
        </Label>
        <div className="space-y-3">
          <button
            onClick={() => handleInputChange("paymentMethod", "card")}
            className={`w-full p-4 border rounded-xl text-left transition-all ${
              formData.paymentMethod === "card"
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-3">
              <CreditCard className="w-5 h-5" />
              <div>
                <p className="font-medium">Credit/Debit Card</p>
                <p className="text-sm text-gray-500">Pay securely with your card</p>
              </div>
            </div>
          </button>
          <button
            onClick={() => handleInputChange("paymentMethod", "cash")}
            className={`w-full p-4 border rounded-xl text-left transition-all ${
              formData.paymentMethod === "cash"
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-green-500 rounded-full"></div>
              <div>
                <p className="font-medium">Pay at Clinic</p>
                <p className="text-sm text-gray-500">Pay when you arrive</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Additional Notes */}
      <div>
        <Label htmlFor="notes">Additional Notes (Optional)</Label>
        <Textarea
          id="notes"
          placeholder="Any additional information for the doctor..."
          value={formData.notes}
          onChange={(e) => handleInputChange("notes", e.target.value)}
          className="mt-2"
          rows={2}
        />
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(1)}>
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={loading} className="bg-green-600 hover:bg-green-700">
          {loading ? "Booking..." : "Confirm Booking"}
        </Button>
      </div>
    </div>
  )

  return (
    <BaseModal title={step === 1 ? "Book Appointment" : "Payment & Confirmation"} size="lg">
      {step === 1 ? renderStep1() : renderStep2()}
    </BaseModal>
  )
}
