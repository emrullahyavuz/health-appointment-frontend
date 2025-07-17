import { useState, useEffect } from "react";
import {
  User,
  Calendar,
  Star,
  Clock,
  DollarSign,
  MapPin,
  Phone,
  Mail,
  Stethoscope,
  Edit3,
  Save,
  BarChart3,
  Users,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Label } from "../../components/ui/Label";
import { Textarea } from "../../components/ui/TextArea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/Select";
import { Switch } from "../../components/ui/Switch";
import { doctorAPI } from "../../lib/api";
import { Sidebar } from "../../components/sidebar/Sidebar";

interface DoctorProfile {
  _id: string;
  user: {
    name: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  specialty: string;
  experience: number;
  education: string;
  languages: string[];
  consultationFee: number;
  location: string;
  about: string;
  workingHours: {
    day: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }[];
  rating: number;
  reviewCount: number;
  totalPatients: number;
  isAvailable: boolean;
}

interface DoctorStats {
  totalAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  totalEarnings: number;
  averageRating: number;
  monthlyStats: {
    _id: { year: number; month: number };
    appointments: number;
    earnings: number;
  }[];
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
];

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
];

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function DoctorProfilePage() {
  const [profile, setProfile] = useState<DoctorProfile | null>(null);
  const [stats, setStats] = useState<DoctorStats | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "schedule" | "stats" | "settings"
  >("overview");

  //   const { user, token } = useAuth()

  useEffect(() => {
    fetchDoctorData();
  }, []);

  const fetchDoctorData = async () => {
    try {
      setLoading(true);
     
      // Fetch doctor profile
      const profileResponse = await doctorAPI.getMyProfile();
      
      if (profileResponse) {
        setProfile(profileResponse.doctor);
      }

      // Fetch doctor stats
    //   const statsResponse = await doctorAPI.getStats();
    //   if (statsResponse.ok) {
    //     const statsData = await statsResponse.json();
    //     setStats(statsData.data);
    //   }
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!profile || !token) return;

    try {
      setSaving(true);
      const response = await api.doctors.updateMyProfile(token, profile);

      if (response.ok) {
        setIsEditing(false);
        // Show success message
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleWorkingHoursChange = (
    dayIndex: number,
    field: string,
    value: string | boolean
  ) => {
    if (!profile) return;

    const updatedWorkingHours = [...profile.workingHours];
    updatedWorkingHours[dayIndex] = {
      ...updatedWorkingHours[dayIndex],
      [field]: value,
    };

    setProfile({ ...profile, workingHours: updatedWorkingHours });
  };

  const toggleLanguage = (language: string) => {
    if (!profile) return;

    const updatedLanguages = profile.languages.includes(language)
      ? profile.languages.filter((lang) => lang !== language)
      : [...profile.languages, language];

    setProfile({ ...profile, languages: updatedLanguages });
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Profile not found
              </h3>
              <p className="text-gray-500">
                Unable to load your doctor profile.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6">
              <img
                src={
                  profile.user?.avatar || "/placeholder.svg?height=80&width=80"
                }
                alt={profile.user?.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Dr. {profile.user?.name}
                </h1>
                <p className="text-gray-600">{profile.specialty}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">
                      {profile.rating?.toFixed(1)}
                    </span>
                    <span className="text-gray-500">
                      ({profile.reviewCount?.toString()} reviews)
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>{profile.totalPatients?.toString()} patients</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{profile.experience?.toString()} years experience</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={profile.isAvailable}
                  onCheckedChange={(checked) =>
                    setProfile({ ...profile, isAvailable: checked })
                  }
                />
                <span className="text-sm text-gray-600">Available</span>
              </div>

              <Button
                onClick={() =>
                  isEditing ? handleSaveProfile() : setIsEditing(true)
                }
                disabled={saving}
                className="flex items-center space-x-2"
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{saving ? "Saving..." : "Save Changes"}</span>
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        Total Appointments
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.totalAppointments}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Completed</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.completedAppointments}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Earnings</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ${stats.totalEarnings}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                      <Star className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Average Rating</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.averageRating.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: "overview", label: "Overview", icon: User },
                  { id: "schedule", label: "Schedule", icon: Clock },
                  { id: "stats", label: "Statistics", icon: BarChart3 },
                  { id: "settings", label: "Settings", icon: Stethoscope },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? "border-orange-500 text-orange-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Professional Information */}
              <div className="lg:col-span-2">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Stethoscope className="w-5 h-5 text-orange-600" />
                      <span>Professional Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="specialty">Specialty</Label>
                        <Select
                          value={profile.specialty}
                          onValueChange={(value) =>
                            setProfile({ ...profile, specialty: value })
                          }
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
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
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Input
                          id="experience"
                          type="number"
                          value={profile.experience}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              experience: Number.parseInt(e.target.value),
                            })
                          }
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="consultationFee">
                          Consultation Fee ($)
                        </Label>
                        <Input
                          id="consultationFee"
                          type="number"
                          value={profile.consultationFee}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              consultationFee: Number.parseInt(e.target.value),
                            })
                          }
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profile.location}
                          onChange={(e) =>
                            setProfile({ ...profile, location: e.target.value })
                          }
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="education">
                        Education & Qualifications
                      </Label>
                      <Textarea
                        id="education"
                        value={profile.education}
                        onChange={(e) =>
                          setProfile({ ...profile, education: e.target.value })
                        }
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="about">About</Label>
                      <Textarea
                        id="about"
                        value={profile.about}
                        onChange={(e) =>
                          setProfile({ ...profile, about: e.target.value })
                        }
                        disabled={!isEditing}
                        rows={4}
                      />
                    </div>

                    {/* Languages */}
                    <div className="space-y-2">
                      <Label>Languages Spoken</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {languageOptions.map((language) => (
                          <label
                            key={language}
                            className="flex items-center space-x-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={profile.languages?.includes(language)}
                              onChange={() => toggleLanguage(language)}
                              disabled={!isEditing}
                              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                            />
                            <span className="text-sm">{language}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="w-5 h-5 text-blue-600" />
                      <span>Contact Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-sm">{profile.user?.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span className="text-sm">{profile.user?.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-sm">{profile.location?.toString()}</span>
                    </div>
                  </CardContent>    
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      View Appointments
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                    >
                      <Star className="w-4 h-4 mr-2" />
                      View Reviews
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "schedule" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Working Hours
                </h2>
                <p className="text-sm text-gray-600">
                  Set your availability for each day of the week
                </p>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {weekDays.map((day, index) => {
                      const daySchedule = profile.workingHours.find(
                        (wh) => wh.day === day
                      ) || {
                        day,
                        startTime: "09:00",
                        endTime: "17:00",
                        isAvailable: false,
                      };

                      return (
                        <div
                          key={day}
                          className="flex items-center space-x-4 p-4 border rounded-lg"
                        >
                          <div className="w-24">
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={daySchedule.isAvailable}
                                onCheckedChange={(checked) =>
                                  handleWorkingHoursChange(
                                    index,
                                    "isAvailable",
                                    checked
                                  )
                                }
                                disabled={!isEditing}
                              />
                              <span className="text-sm font-medium">{day}</span>
                            </div>
                          </div>

                          {daySchedule.isAvailable && (
                            <div className="flex items-center space-x-2 flex-1">
                              <Input
                                type="time"
                                value={daySchedule.startTime}
                                onChange={(e) =>
                                  handleWorkingHoursChange(
                                    index,
                                    "startTime",
                                    e.target.value
                                  )
                                }
                                disabled={!isEditing}
                                className="w-32"
                              />
                              <span className="text-gray-500">to</span>
                              <Input
                                type="time"
                                value={daySchedule.endTime}
                                onChange={(e) =>
                                  handleWorkingHoursChange(
                                    index,
                                    "endTime",
                                    e.target.value
                                  )
                                }
                                disabled={!isEditing}
                                className="w-32"
                              />
                            </div>
                          )}

                          {!daySchedule.isAvailable && (
                            <div className="flex-1">
                              <span className="text-sm text-gray-500">
                                Not available
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "stats" && stats && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Statistics & Analytics
              </h2>

              {/* Monthly Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {stats.monthlyStats.map((stat, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center space-y-2 flex-1"
                      >
                        <div className="flex flex-col items-center space-y-1 h-48 justify-end">
                          <div
                            className="w-8 bg-blue-400 rounded-t"
                            style={{
                              height: `${(stat.appointments / 50) * 120}px`,
                            }}
                          ></div>
                          <div
                            className="w-8 bg-green-400 rounded-t"
                            style={{
                              height: `${(stat.earnings / 1000) * 120}px`,
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {stat._id.month}/{stat._id.year}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center space-x-6 mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">
                        Appointments
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">
                        Earnings ($)
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Appointment Success Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">
                        {(
                          (stats.completedAppointments /
                            stats.totalAppointments) *
                          100
                        ).toFixed(1)}
                        %
                      </div>
                      <p className="text-sm text-gray-600">
                        {stats.completedAppointments} of{" "}
                        {stats.totalAppointments} appointments completed
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Patient Satisfaction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-yellow-600 mb-2">
                        {stats.averageRating.toFixed(1)}
                      </div>
                      <div className="flex items-center justify-center space-x-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${
                              star <= stats.averageRating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">
                        Based on {profile.reviewCount} reviews
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Account Settings
              </h2>

              <Card>
                <CardHeader>
                  <CardTitle>Profile Visibility</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">
                        Available for Appointments
                      </h4>
                      <p className="text-sm text-gray-600">
                        Allow patients to book appointments with you
                      </p>
                    </div>
                    <Switch
                      checked={profile.isAvailable}
                      onCheckedChange={(checked) =>
                        setProfile({ ...profile, isAvailable: checked })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-gray-600">
                        Receive email alerts for new appointments
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">SMS Notifications</h4>
                      <p className="text-sm text-gray-600">
                        Receive SMS alerts for urgent matters
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                  >
                    Change Password
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                  >
                    Two-Factor Authentication
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                  >
                    Download My Data
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
