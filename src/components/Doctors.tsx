import { useState } from "react"
import {
  Calendar,
  MessageSquare,
  BarChart3,
  Settings,
  Search,
  Bell,
  Filter,
  Star,
  Clock,
  Users,
  Stethoscope,
} from "lucide-react"
import { Card } from "./ui/Card"
import { Button } from "./ui/Button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/Select"
import { Input } from "./ui/Input"
import { DoctorCard } from "./DoctorCard"
import { AppointmentDialog } from "./AppointmentDialog"

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    experience: 12,
    rating: 4.9,
    reviews: 324,
    location: "Heart Center, Floor 3",
    image: "/placeholder.svg?height=80&width=80",
    availability: "Available Today",
    nextSlot: "2:30 PM",
    price: 150,
    about: "Specialized in interventional cardiology with expertise in complex cardiac procedures.",
    education: "MD from Harvard Medical School",
    languages: ["English", "Spanish"],
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    experience: 15,
    rating: 4.8,
    reviews: 289,
    location: "Neurology Wing, Floor 2",
    image: "/placeholder.svg?height=80&width=80",
    availability: "Available Tomorrow",
    nextSlot: "10:00 AM",
    price: 180,
    about: "Expert in treating neurological disorders including epilepsy and movement disorders.",
    education: "MD from Johns Hopkins University",
    languages: ["English", "Mandarin"],
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    experience: 8,
    rating: 4.9,
    reviews: 456,
    location: "Children's Wing, Floor 1",
    image: "/placeholder.svg?height=80&width=80",
    availability: "Available Today",
    nextSlot: "4:15 PM",
    price: 120,
    about: "Dedicated pediatrician with special interest in child development and immunizations.",
    education: "MD from Stanford University",
    languages: ["English", "Spanish", "Portuguese"],
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Orthopedics",
    experience: 20,
    rating: 4.7,
    reviews: 198,
    location: "Orthopedic Center, Floor 4",
    image: "/placeholder.svg?height=80&width=80",
    availability: "Available Today",
    nextSlot: "1:45 PM",
    price: 200,
    about: "Orthopedic surgeon specializing in sports medicine and joint replacement.",
    education: "MD from Mayo Clinic",
    languages: ["English"],
  },
  {
    id: 5,
    name: "Dr. Lisa Thompson",
    specialty: "Dermatology",
    experience: 10,
    rating: 4.8,
    reviews: 367,
    location: "Dermatology Clinic, Floor 2",
    image: "/placeholder.svg?height=80&width=80",
    availability: "Available Tomorrow",
    nextSlot: "11:30 AM",
    price: 140,
    about: "Dermatologist with expertise in cosmetic and medical dermatology procedures.",
    education: "MD from UCLA Medical School",
    languages: ["English", "French"],
  },
  {
    id: 6,
    name: "Dr. Robert Kim",
    specialty: "Gastroenterology",
    experience: 14,
    rating: 4.6,
    reviews: 234,
    location: "GI Center, Floor 3",
    image: "/placeholder.svg?height=80&width=80",
    availability: "Available Today",
    nextSlot: "3:00 PM",
    price: 170,
    about: "Gastroenterologist specializing in inflammatory bowel disease and endoscopy.",
    education: "MD from University of Pennsylvania",
    languages: ["English", "Korean"],
  },
  {
    id: 7,
    name: "Dr. Amanda Davis",
    specialty: "Psychiatry",
    experience: 11,
    rating: 4.9,
    reviews: 412,
    location: "Mental Health Center, Floor 5",
    image: "/placeholder.svg?height=80&width=80",
    availability: "Available Tomorrow",
    nextSlot: "9:00 AM",
    price: 160,
    about: "Psychiatrist with focus on anxiety disorders, depression, and cognitive behavioral therapy.",
    education: "MD from Columbia University",
    languages: ["English", "German"],
  },
  {
    id: 8,
    name: "Dr. David Martinez",
    specialty: "Ophthalmology",
    experience: 16,
    rating: 4.7,
    reviews: 298,
    location: "Eye Center, Floor 1",
    image: "/placeholder.svg?height=80&width=80",
    availability: "Available Today",
    nextSlot: "5:30 PM",
    price: 130,
    about: "Ophthalmologist specializing in cataract surgery and retinal diseases.",
    education: "MD from Duke University",
    languages: ["English", "Spanish"],
  },
]

const specialties = [
  "All Specialties",
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "Gastroenterology",
  "Psychiatry",
  "Ophthalmology",
]

export default function Doctors() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties")
  const [selectedDoctor, setSelectedDoctor] = useState<(typeof doctors)[0] | null>(null)
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false)

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = selectedSpecialty === "All Specialties" || doctor.specialty === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

  const handleBookAppointment = (doctor: (typeof doctors)[0]) => {
    setSelectedDoctor(doctor)
    setIsAppointmentDialogOpen(true)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 space-y-8">
        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-white rounded-sm opacity-80"></div>
        </div>

        <nav className="flex flex-col space-y-6">
          <Button variant="ghost" size="icon" className="w-12 h-12 text-gray-400 hover:text-gray-600 sidebar-nav-item">
            <BarChart3 className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="w-12 h-12 text-gray-400 hover:text-gray-600 sidebar-nav-item">
            <Calendar className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="w-12 h-12 text-gray-400 hover:text-gray-600 sidebar-nav-item">
            <MessageSquare className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 bg-gray-900 text-white hover:bg-gray-800 sidebar-nav-item"
          >
            <Stethoscope className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="w-12 h-12 text-gray-400 hover:text-gray-600 sidebar-nav-item">
            <Settings className="w-6 h-6" />
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Find Doctors</h1>
            <p className="text-gray-500">Book appointments with our specialist doctors</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card className="p-6 chart-animate">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Doctors</p>
                <p className="text-2xl font-bold text-gray-900">150+</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 chart-animate">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Patients Served</p>
                <p className="text-2xl font-bold text-gray-900">25K+</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 chart-animate">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">4.8</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 chart-animate">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Available Today</p>
                <p className="text-2xl font-bold text-gray-900">45</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search doctors by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {specialties.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} onBookAppointment={() => handleBookAppointment(doctor)} />
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <Stethoscope className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Appointment Dialog */}
      <AppointmentDialog
        doctor={selectedDoctor}
        isOpen={isAppointmentDialogOpen}
        onClose={() => setIsAppointmentDialogOpen(false)}
      />
    </div>
  )
}
