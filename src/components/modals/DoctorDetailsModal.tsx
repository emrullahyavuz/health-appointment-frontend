import { Star, MapPin, Clock, Calendar, Heart, MessageSquare, Phone, Mail } from "lucide-react"
import { BaseModal } from "./BaseModal"
import { Button } from "../ui/Button"
import { Badge } from "../ui/Badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs"
import { useDispatch, useSelector } from "react-redux"
import { openModal } from "../../redux/modal/ModalSlice"
// import { addToFavorites, removeFromFavorites } from "../../redux/favorite/FavoriteSlice"

interface DoctorDetailsModalProps {
  data?: {
    doctor: any
  }
}

export function DoctorDetailsModal({ data }: DoctorDetailsModalProps) {
  const dispatch = useDispatch<AppDispatch>()
//   const { favorites } = useSelector((state) => state.favorite)
const favorites = [ {_id: "1"} ]

  const doctor = {
    _id: "1",
    user: {
      name: "John Doe",
      avatar: "https://via.placeholder.com/150",
      phone: "+1 (555) 123-4567",
      email: "john.doe@example.com",
    },
  }
  const isFavorite = favorites.some((fav) => fav._id === doctor?._id)

  const handleBookAppointment = () => {
    dispatch(
      openModal({
        modalType: "APPOINTMENT_BOOKING",
        modalData: { doctor },
      }),
    )
  }

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(doctor._id))
    } else {
      dispatch(addToFavorites(doctor))
    }
  }

  const handleWriteReview = () => {
    dispatch(
      openModal({
        modalType: "REVIEW",
        modalData: { doctor, type: "create" },
      }),
    )
  }

  if (!doctor) return null

  return (
    <BaseModal size="xl">
      <div className="space-y-6">
        {/* Doctor Header */}
        <div className="flex items-start space-x-6">
          <img
            src={doctor.user?.avatar || "/placeholder.svg?height=120&width=120"}
            alt={doctor.user?.name}
            className="w-30 h-30 rounded-2xl object-cover"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{doctor.user?.name}</h2>
                <p className="text-lg text-indigo-600 font-medium">{doctor.specialty}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-medium">{doctor.rating}</span>
                    <span className="text-gray-500">({doctor.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{doctor.experience} years experience</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 mt-2 text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{doctor.location}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-indigo-600">${doctor.consultationFee}</p>
                <p className="text-sm text-gray-500">Consultation Fee</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 mt-6">
              <Button onClick={handleBookAppointment} className="bg-indigo-600 hover:bg-indigo-700">
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
              <Button variant="outline" onClick={handleToggleFavorite}>
                <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-current text-red-500" : ""}`} />
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
              <Button variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Message
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About Dr. {doctor.user?.name}</h3>
              <p className="text-gray-600 leading-relaxed">
                {doctor.about ||
                  "Experienced medical professional dedicated to providing excellent patient care with a focus on preventive medicine and patient education."}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Education & Qualifications</h3>
              <div className="space-y-2">
                <p className="text-gray-600">{doctor.education || "MD from Harvard Medical School"}</p>
                <p className="text-gray-600">Board Certified in {doctor.specialty}</p>
                <p className="text-gray-600">Member of American Medical Association</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Specializations</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{doctor.specialty}</Badge>
                <Badge variant="secondary">Preventive Care</Badge>
                <Badge variant="secondary">Patient Education</Badge>
                <Badge variant="secondary">Chronic Disease Management</Badge>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {doctor.languages?.map((lang: string, index: number) => (
                  <Badge key={index} variant="outline">
                    {lang}
                  </Badge>
                )) || <Badge variant="outline">English</Badge>}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Patient Reviews</h3>
              <Button variant="outline" onClick={handleWriteReview}>
                Write a Review
              </Button>
            </div>

            <div className="space-y-4">
              {/* Sample reviews */}
              {[1, 2, 3].map((review) => (
                <div key={review} className="p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <img src={`/placeholder.svg?height=40&width=40`} alt="Patient" className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-medium text-gray-900">Patient {review}</p>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 ml-auto">2 days ago</span>
                  </div>
                  <p className="text-gray-600">
                    Excellent doctor! Very professional and took time to explain everything clearly. Highly recommend
                    for anyone looking for quality healthcare.
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Available Schedule</h3>

            <div className="grid grid-cols-7 gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day} className="text-center">
                  <p className="font-medium text-gray-900 mb-2">{day}</p>
                  <div className="space-y-1">
                    <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">9:00 AM</div>
                    <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">2:00 PM</div>
                    <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">4:00 PM</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-600">{doctor.user?.phone || "+1 (555) 123-4567"}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">{doctor.user?.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">Clinic Address</p>
                  <p className="text-gray-600">{doctor.location}</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-xl">
              <h4 className="font-medium text-blue-900 mb-2">Office Hours</h4>
              <div className="space-y-1 text-sm text-blue-800">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </BaseModal>
  )
}
