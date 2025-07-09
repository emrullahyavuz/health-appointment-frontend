import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"
import { Textarea } from "../ui/TextArea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/Select"
// import { useAuth } from "@/lib/auth"
// import { api } from "@/lib/api"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Stethoscope,
  GraduationCap,
  Languages,
  Clock,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Camera,
} from "lucide-react"

interface ProfileData {
  name: string
  email: string
  phone: string
  dateOfBirth?: string
  gender?: string
  address?: string
  emergencyContact?: string
  // Doctor specific fields
  specialty?: string
  experience?: number
  education?: string
  languages?: string[]
  consultationFee?: number
  location?: string
  about?: string
  workingHours?: {
    day: string
    startTime: string
    endTime: string
    isAvailable: boolean
  }[]
}

const specialties = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "Gastroenterology",
  "Psychiatry",
  "Ophthalmology",
  "General Medicine",
  "Surgery",
]

const languageOptions = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Mandarin",
  "Arabic",
  "Hindi",
  "Turkish",
]

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export function ProfileForm() {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "",
    phone: "",
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])

//   const { user, token } = useAuth()
const user = {
    avatar: "https://via.placeholder.com/150",
    role: "doctor"
}
const token = "1234567890"

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user, token])

  const fetchProfile = async () => {
    if (!token) return

    try {
      setLoading(true)
      const response = await api.users.getProfile(token)

      if (response.ok) {
        const data = await response.json()
        setProfileData(data.profile || data)
        setSelectedLanguages(data.profile?.languages || data.languages || [])
      }
    } catch (err) {
      setError("Failed to load profile data")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | number) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
    setError("")
    setSuccess(false)
  }

  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages((prev) => {
      if (prev.includes(language)) {
        return prev.filter((lang) => lang !== language)
      } else {
        return [...prev, language]
      }
    })
  }

  const handleWorkingHoursChange = (dayIndex: number, field: string, value: string | boolean) => {
    setProfileData((prev) => {
      const workingHours =
        prev.workingHours ||
        weekDays.map((day) => ({
          day,
          startTime: "09:00",
          endTime: "17:00",
          isAvailable: false,
        }))

      const updated = [...workingHours]
      updated[dayIndex] = { ...updated[dayIndex], [field]: value }

      return { ...prev, workingHours: updated }
    })
  }

  const validateForm = () => {
    if (!profileData.name.trim()) {
      setError("Name is required")
      return false
    }

    if (!profileData.email.trim()) {
      setError("Email is required")
      return false
    }

    if (!profileData.phone.trim()) {
      setError("Phone number is required")
      return false
    }

    if (user?.role === "doctor") {
      if (!profileData.specialty) {
        setError("Specialty is required for doctors")
        return false
      }

      if (!profileData.experience || profileData.experience < 0) {
        setError("Valid experience is required")
        return false
      }

      if (!profileData.consultationFee || profileData.consultationFee < 0) {
        setError("Valid consultation fee is required")
        return false
      }
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return
    if (!token) {
      setError("Authentication required")
      return
    }

    setSaving(true)
    setError("")

    try {
      const updateData = {
        ...profileData,
        languages: selectedLanguages,
      }

      const response = await api.users.updateProfile(token, updateData)

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 5000)
      } else {
        const errorData = await response.json()
        setError(errorData.message || "Failed to update profile")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="w-5 h-5 text-orange-600" />
          <span>Profile Information</span>
        </CardTitle>
        <p className="text-sm text-gray-600">Update your personal information and preferences</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Profile updated successfully!</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md flex items-center space-x-2">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {/* Profile Picture */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={user?.avatar || "/placeholder.svg?height=100&width=100"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Profile Picture</h3>
              <p className="text-sm text-gray-600">Click the camera icon to update your photo</p>
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Basic Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter your phone number"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={profileData.dateOfBirth || ""}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={profileData.gender || ""} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="emergencyContact"
                    value={profileData.emergencyContact || ""}
                    onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                    placeholder="Emergency contact number"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <Textarea
                  id="address"
                  value={profileData.address || ""}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter your full address"
                  className="pl-10"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Doctor-specific fields */}
          {user?.role === "doctor" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Professional Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Select
                    value={profileData.specialty || ""}
                    onValueChange={(value) => handleInputChange("specialty", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="experience"
                      type="number"
                      min="0"
                      value={profileData.experience || ""}
                      onChange={(e) => handleInputChange("experience", Number.parseInt(e.target.value))}
                      placeholder="Years of experience"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="consultationFee">Consultation Fee ($)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="consultationFee"
                      type="number"
                      min="0"
                      value={profileData.consultationFee || ""}
                      onChange={(e) => handleInputChange("consultationFee", Number.parseInt(e.target.value))}
                      placeholder="Consultation fee"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Clinic/Hospital Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="location"
                      value={profileData.location || ""}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="Your practice location"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="education">Education & Qualifications</Label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <Textarea
                    id="education"
                    value={profileData.education || ""}
                    onChange={(e) => handleInputChange("education", e.target.value)}
                    placeholder="Your educational background and qualifications"
                    className="pl-10"
                    rows={3}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="about">About / Bio</Label>
                <div className="relative">
                  <Stethoscope className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <Textarea
                    id="about"
                    value={profileData.about || ""}
                    onChange={(e) => handleInputChange("about", e.target.value)}
                    placeholder="Tell patients about yourself and your approach to healthcare"
                    className="pl-10"
                    rows={4}
                  />
                </div>
              </div>

              {/* Languages */}
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Languages className="w-4 h-4" />
                  <span>Languages Spoken</span>
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {languageOptions.map((language) => (
                    <label key={language} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedLanguages.includes(language)}
                        onChange={() => handleLanguageToggle(language)}
                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm">{language}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Working Hours */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Working Hours</Label>
                <div className="space-y-3">
                  {weekDays.map((day, index) => {
                    const daySchedule = profileData.workingHours?.[index] || {
                      day,
                      startTime: "09:00",
                      endTime: "17:00",
                      isAvailable: false,
                    }

                    return (
                      <div key={day} className="flex items-center space-x-4 p-3 border rounded-lg">
                        <div className="w-20">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={daySchedule.isAvailable}
                              onChange={(e) => handleWorkingHoursChange(index, "isAvailable", e.target.checked)}
                              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                            />
                            <span className="text-sm font-medium">{day}</span>
                          </label>
                        </div>

                        {daySchedule.isAvailable && (
                          <>
                            <div className="flex items-center space-x-2">
                              <Input
                                type="time"
                                value={daySchedule.startTime}
                                onChange={(e) => handleWorkingHoursChange(index, "startTime", e.target.value)}
                                className="w-32"
                              />
                              <span className="text-gray-500">to</span>
                              <Input
                                type="time"
                                value={daySchedule.endTime}
                                onChange={(e) => handleWorkingHoursChange(index, "endTime", e.target.value)}
                                className="w-32"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={() => window.history.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving Changes..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
