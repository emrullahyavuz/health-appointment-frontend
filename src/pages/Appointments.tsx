import { useState, useEffect } from "react"
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  Plus,
  Filter,
  Search,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Badge } from "../components/ui/Badge"
import { Input } from "../components/ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select"
import { Sidebar } from "../components/sidebar/Sidebar"
// import { useAuth } from "../lib/auth"
// import { api } from "../lib/api"

interface Appointment {
  _id: string
  patient: {
    name: string
    email: string
    phone: string
    avatar?: string
  }
  doctor: {
    user: {
      name: string
      avatar?: string
    }
    specialty: string
    location: string
  }
  date: string
  time: string
  type: string
  status: string
  symptoms: string
  totalAmount: number
}

const statusColors = {
  scheduled: "bg-blue-100 text-blue-800",
  confirmed: "bg-green-100 text-green-800",
  "in-progress": "bg-yellow-100 text-yellow-800",
  completed: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
  "no-show": "bg-orange-100 text-orange-800",
}

const statusIcons = {
  scheduled: Clock,
  confirmed: CheckCircle,
  "in-progress": AlertCircle,
  completed: CheckCircle,
  cancelled: XCircle,
  "no-show": XCircle,
}

export function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

//   const { user, token } = useAuth()

//   useEffect(() => {
//     fetchAppointments()
//   }, [])

  useEffect(() => {
    filterAppointments()
  }, [appointments, searchTerm, statusFilter, dateFilter])

//   const fetchAppointments = async () => {
//     if (!token) return

//     try {
//       setLoading(true)
//       const response = await api.appointments.getAll(token)

//       if (response.ok) {
//         const data = await response.json()
//         setAppointments(data.appointments || [])
//       }
//     } catch (error) {
//       console.error("Error fetching appointments:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

  const filterAppointments = () => {
    let filtered = appointments

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (appointment) =>
          appointment.doctor.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appointment.doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appointment.type.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((appointment) => appointment.status === statusFilter)
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date()
      const appointmentDate = new Date(filtered[0]?.date)

      switch (dateFilter) {
        case "today":
          filtered = filtered.filter((appointment) => {
            const date = new Date(appointment.date)
            return date.toDateString() === now.toDateString()
          })
          break
        case "week":
          const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
          filtered = filtered.filter((appointment) => {
            const date = new Date(appointment.date)
            return date >= now && date <= weekFromNow
          })
          break
        case "month":
          filtered = filtered.filter((appointment) => {
            const date = new Date(appointment.date)
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
          })
          break
      }
    }

    setFilteredAppointments(filtered)
  }

  const getUpcomingAppointments = () => {
    const now = new Date()
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date)
      return appointmentDate >= now && (appointment.status === "scheduled" || appointment.status === "confirmed")
    }).length
  }

  const getCompletedAppointments = () => {
    return appointments.filter((appointment) => appointment.status === "completed").length
  }

  const getCancelledAppointments = () => {
    return appointments.filter((appointment) => appointment.status === "cancelled").length
  }

//   if (loading) {
//     return (
//       <div className="flex h-screen bg-gray-50">
//         <Sidebar />
//         <div className="flex-1 flex items-center justify-center">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
//             <p className="mt-4 text-gray-600">Loading appointments...</p>
//           </div>
//         </div>
//       </div>
//     )
//   }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Appointments</h1>
            <p className="text-gray-500">Manage your medical appointments</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="w-4 h-4 mr-2" />
            Book Appointment
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card className="p-6 chart-animate">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">{getUpcomingAppointments()}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 chart-animate">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{getCompletedAppointments()}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 chart-animate">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-gray-900">{getCancelledAppointments()}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 chart-animate">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => {
            const StatusIcon = statusIcons[appointment.status as keyof typeof statusIcons]
            return (
              <Card key={appointment._id} className="health-metric-card hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={appointment.doctor.user.avatar || "/placeholder.svg?height=60&width=60"}
                        alt={appointment.doctor.user.name}
                        className="w-15 h-15 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{appointment.doctor.user.name}</h3>
                        <p className="text-sm text-gray-600">{appointment.doctor.specialty}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(appointment.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{appointment.doctor.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <Badge className={statusColors[appointment.status as keyof typeof statusColors]}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </Badge>
                        <p className="text-sm text-gray-500 mt-1">{appointment.type}</p>
                        <p className="text-lg font-bold text-gray-900">${appointment.totalAmount}</p>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <Button size="sm" variant="outline">
                          <Video className="w-4 h-4 mr-2" />
                          Join Call
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {appointment.symptoms && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <strong>Reason:</strong> {appointment.symptoms}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredAppointments.length === 0 && !loading && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or book a new appointment</p>
          </div>
        )}
      </div>
    </div>
  )
}
