import { Star, MapPin, Clock, Calendar } from "lucide-react"
import { Card, CardContent } from "./ui/Card"
import { Button } from "./ui/Button"
import { Badge } from "./ui/Badge"

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

interface DoctorCardProps {
  doctor: Doctor
  onBookAppointment: () => void
}

export function DoctorCard({ doctor, onBookAppointment }: DoctorCardProps) {
  const getAvailabilityStatus = () => {
    if (!doctor.isAvailable) return { text: "Not Available", isToday: false }

    const today = new Date().getDay()
    const todayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][today]

    const todaySchedule = doctor.workingHours.find(
      (schedule) => schedule.day.toLowerCase() === todayName.toLowerCase() && schedule.isAvailable,
    )

    if (todaySchedule) {
      return { text: "Available Today", isToday: true }
    }

    const nextAvailable = doctor.workingHours.find((schedule) => schedule.isAvailable)
    if (nextAvailable) {
      return { text: `Available ${nextAvailable.day}`, isToday: false }
    }

    return { text: "Not Available", isToday: false }
  }

  const availability = getAvailabilityStatus()

  return (
    <Card className="health-metric-card hover:shadow-lg transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <img
            src={doctor.user?.avatar || "/placeholder.svg?height=64&width=64"}
            alt={doctor.user?.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{doctor.user?.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{doctor.specialty}</p>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{doctor.rating.toFixed(1)}</span>
              </div>
              <span className="text-sm text-gray-500">({doctor.reviewCount} reviews)</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{doctor.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{doctor.experience} years experience</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <Badge
            variant={availability.isToday ? "default" : "secondary"}
            className={availability.isToday ? "bg-green-100 text-green-800" : ""}
          >
            {availability.text}
          </Badge>
          <span className="text-lg font-bold text-gray-900">${doctor.consultationFee}</span>
        </div>

        {doctor.nextAvailableSlot && (
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Next: {doctor.nextAvailableSlot}</span>
            </div>
          </div>
        )}

        <Button
          onClick={onBookAppointment}
          className="w-full"
          variant={availability.isToday ? "default" : "outline"}
          disabled={!doctor.isAvailable}
        >
          {doctor.isAvailable ? "Book Appointment" : "Not Available"}
        </Button>
      </CardContent>
    </Card>
  )
}
