import { useState, useEffect } from "react"
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
import { doctorAPI } from "../lib/api"

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

export function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties")
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalDoctors: 0,
    patientsServed: 0,
    averageRating: 0,
    availableToday: 0,
  })


  useEffect(() => {
    fetchDoctors()
  }, [])

  useEffect(() => {
    filterDoctors()
  }, [doctors, searchTerm, selectedSpecialty])

  const fetchDoctors = async () => {
    try {
      setLoading(true)
      const response = await doctorAPI.getDoctors()
      console.log(response)
      setDoctors(response.doctors)
      // setStats({
      //   totalDoctors: response.data.length,
      //   patientsServed: 0,
      //   averageRating: 0,
      //   availableToday: 0,
      // })
    } catch (error) {
      console.error("Error fetching doctors:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterDoctors = () => {
    let filtered = doctors

    if (searchTerm) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedSpecialty !== "All Specialties") {
      filtered = filtered.filter((doctor) => doctor.specialty === selectedSpecialty)
    }

    setFilteredDoctors(filtered)
  }

  const handleBookAppointment = (doctor: Doctor) => {
    if (!user) {
      // Redirect to login if not authenticated
      window.location.href = "/login"
      return
    }

    if (user.role !== "patient") {
      alert("Only patients can book appointments")
      return
    }

    setSelectedDoctor(doctor)
    setIsAppointmentDialogOpen(true)
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading doctors...</p>
          </div>
        </div>
      </div>
    )
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
                <p className="text-2xl font-bold text-gray-900">{stats.totalDoctors}+</p>
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
                <p className="text-2xl font-bold text-gray-900">{stats.patientsServed}+</p>
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
                <p className="text-2xl font-bold text-gray-900">{stats.averageRating.toFixed(1)}</p>
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
                <p className="text-2xl font-bold text-gray-900">{stats.availableToday}</p>
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
            <DoctorCard key={doctor._id} doctor={doctor} onBookAppointment={() => handleBookAppointment(doctor)} />
          ))}
        </div>

        {filteredDoctors.length === 0 && !loading && (
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
