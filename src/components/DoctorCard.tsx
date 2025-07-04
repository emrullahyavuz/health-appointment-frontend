import { Star, MapPin, Clock, Calendar } from "lucide-react"
import { Card, CardContent } from "./ui/Card"
import { Button } from "./ui/Button"
import { Badge } from "./ui/Badge"

interface Doctor {
  id: number
  name: string
  specialty: string
  experience: number
  rating: number
  reviews: number
  location: string
  image: string
  availability: string
  nextSlot: string
  price: number
  about: string
  education: string
  languages: string[]
}

interface DoctorCardProps {
  doctor: Doctor
  onBookAppointment: () => void
}

export function DoctorCard({ doctor, onBookAppointment }: DoctorCardProps) {
  const isAvailableToday = doctor.availability.includes("Today")

  return (
    <Card className="health-metric-card hover:shadow-lg transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <img
            src={doctor.image || "/placeholder.svg"}
            alt={doctor.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{doctor.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{doctor.specialty}</p>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{doctor.rating}</span>
              </div>
              <span className="text-sm text-gray-500">({doctor.reviews} reviews)</span>
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
            variant={isAvailableToday ? "default" : "secondary"}
            className={isAvailableToday ? "bg-green-100 text-green-800" : ""}
          >
            {doctor.availability}
          </Badge>
          <span className="text-lg font-bold text-gray-900">${doctor.price}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Next: {doctor.nextSlot}</span>
          </div>
        </div>

        <Button onClick={onBookAppointment} className="w-full" variant={isAvailableToday ? "default" : "outline"}>
          Book Appointment
        </Button>
      </CardContent>
    </Card>
  )
}
