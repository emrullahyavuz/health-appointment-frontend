import { useState, useEffect } from "react";
import {
  User,
  Calendar,
  Heart,
  Activity,
  FileText,
  Phone,
  Mail,
  Edit3,
  Save,
  Plus,
  Trash2,
  Clock,
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
import { Badge } from "../../components/ui/Badge";
import { Separator } from "../../components/ui/Seperator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/Select";
// import { useAuth } from "../../lib/Auth"
import { userAPI } from "../../lib/api";


interface PatientProfile {
  _id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  emergencyContact?: string;
  avatar?: string;
  bloodType?: string;
  allergies?: string[];
  medications?: string[];
  medicalConditions?: string[];
  insuranceInfo?: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
  };
  age?: number;
}

interface Appointment {
  _id: string;
  doctor: {
    user: {
      name: string;
      avatar?: string;
    };
    specialty: string;
  };
  appointmentDate: string;
  timeSlot: string;
  status: string;
  consultationFee: number;
  notes?: string;
}

interface HealthMetric {
  type: string;
  value: string;
  unit: string;
  date: string;
  status: "normal" | "high" | "low";
}

export function PatientProfilePage() {
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "appointments" | "health" | "settings"
  >("overview");

 

  useEffect(() => {
    fetchPatientData();
  }, []);

  

  const fetchPatientData = async () => {
    try {

      // Fetch profile
      const profileResponse = await userAPI.getUserProfile();
      
      if (profileResponse) {
        setProfile(profileResponse.user);
      }

      // Fetch appointments
      const appointmentsResponse =
        await appointmentAPI.getPatientAppointments();
      if (appointmentsResponse.ok) {
        const appointmentsData = await appointmentsResponse.json();
        setAppointments(appointmentsData.appointments || []);
      }

      // Mock health metrics data
      setHealthMetrics([
        {
          type: "Blood Pressure",
          value: "120/80",
          unit: "mmHg",
          date: "2024-01-15",
          status: "normal",
        },
        {
          type: "Heart Rate",
          value: "72",
          unit: "bpm",
          date: "2024-01-15",
          status: "normal",
        },
        {
          type: "Weight",
          value: "70",
          unit: "kg",
          date: "2024-01-10",
          status: "normal",
        },
        {
          type: "Blood Sugar",
          value: "95",
          unit: "mg/dL",
          date: "2024-01-12",
          status: "normal",
        },
      ]);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };



  const handleSaveProfile = async () => {
      if (!profile) return
      
      try {
        setSaving(true)
        const response = await userAPI.updateUserProfile(profile)

        if (response.ok) {
          setIsEditing(false)
          // Show success message
        }
      } catch (error) {
        console.error("Error updating profile:", error)
      } finally {
        setSaving(false)
      }
  }

  const addAllergy = () => {
    if (profile) {
      setProfile({
        ...profile,
        allergies: [...(profile.allergies || []), ""],
      });
    }
  };

  const removeAllergy = (index: number) => {
    if (profile) {
      const newAllergies =
        profile.allergies?.filter((_, i) => i !== index) || [];
      setProfile({ ...profile, allergies: newAllergies });
    }
  };

  const updateAllergy = (index: number, value: string) => {
    if (profile) {
      const newAllergies = [...(profile.allergies || [])];
      newAllergies[index] = value;
      setProfile({ ...profile, allergies: newAllergies });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-green-600";
      case "high":
        return "text-red-600";
      case "low":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  //   if (loading) {
  //     return (
  //       <div className="flex h-screen bg-gray-50">
  //         <Sidebar />
  //         <div className="flex-1 flex items-center justify-center">
  //           <div className="text-center">
  //             <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
  //             <p className="mt-4 text-gray-600">Loading profile...</p>
  //           </div>
  //         </div>
  //       </div>
  //     )
  //   }

  //   if (!profile) {
  //     return (
  //       <div className="flex h-screen bg-gray-50">
  //         <Sidebar />
  //         <div className="flex-1 flex items-center justify-center">
  //           <Card className="w-full max-w-md">
  //             <CardContent className="text-center py-12">
  //               <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
  //               <h3 className="text-lg font-medium text-gray-900 mb-2">Profile not found</h3>
  //               <p className="text-gray-500">Unable to load your profile information.</p>
  //             </CardContent>
  //           </Card>
  //         </div>
  //       </div>
  //     )
  //   }

  return (
    <div className="flex h-screen bg-gray-50">


      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6">
              <img
                src={profile?.avatar || "/placeholder.svg?height=80&width=80"}
                alt={profile?.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {profile?.name}
                </h1>
                <p className="text-gray-600">Patient Profile</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Mail className="w-4 h-4" />
                    <span>{profile?.email}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Phone className="w-4 h-4" />
                    <span>{profile?.phone}</span>
                  </div>
                </div>
              </div>
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

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: "overview", label: "Overview", icon: User },
                  { id: "appointments", label: "Appointments", icon: Calendar },
                  { id: "health", label: "Health Records", icon: Heart },
                  { id: "settings", label: "Settings", icon: Activity },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as "overview" | "appointments" | "health" | "settings")}
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
              {/* Personal Information */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="w-5 h-5 text-orange-600" />
                      <span>Personal Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profile?.name}
                          onChange={(e) =>
                            setProfile(profile ? { ...profile, name: e.target.value } : null)
                          }
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile?.email}
                          onChange={(e) =>
                            setProfile(profile ? { ...profile, email: e.target.value } : null)
                          }
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={profile?.phone}
                          onChange={(e) =>
                            setProfile(profile ? { ...profile, phone: e.target.value } : null)
                          }
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="dateOfBirth"
                            type="date"
                            value={profile?.dateOfBirth || ""}
                            onChange={(e) =>
                              setProfile(profile ? { ...profile, dateOfBirth: e.target.value } : null)
                            }
                            disabled={!isEditing}
                          />
                          {/* Yaş gösterimi */}
                          {profile?.dateOfBirth && (
                            <span className="text-gray-500 text-sm">
                              {profile?.age}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select
                          value={profile?.gender || ""}
                          onValueChange={(value) =>
                            setProfile(profile ? { ...profile, gender: value } : null)
                          }
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bloodType">Blood Type</Label>
                        <Select
                          value={profile?.bloodType || ""}
                          onValueChange={(value) =>
                            setProfile(profile ? { ...profile, bloodType: value } : null)
                          }
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select blood type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A-">A-</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B-">B-</SelectItem>
                            <SelectItem value="AB+">AB+</SelectItem>
                            <SelectItem value="AB-">AB-</SelectItem>
                            <SelectItem value="O+">O+</SelectItem>
                            <SelectItem value="O-">O-</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        value={profile?.address || ""}
                        onChange={(e) =>
                          setProfile(profile ? { ...profile, address: e.target.value } : null)
                        }
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">
                        Emergency Contact
                      </Label>
                      <Input
                        id="emergencyContact"
                        value={profile?.emergencyContact || ""}
                        onChange={(e) =>
                          setProfile(profile ? { ...profile, emergencyContact: e.target.value } : null)
                        }
                        disabled={!isEditing}
                        placeholder="Emergency contact phone number"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Medical Information */}
              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-red-600" />
                      <span>Medical Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Allergies */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Allergies</Label>
                        {isEditing && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={addAllergy}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div className="space-y-2">
                        {profile?.allergies?.map((allergy, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <Input
                              value={allergy}
                              onChange={(e) =>
                                updateAllergy(index, e.target.value)
                              }
                              disabled={!isEditing}
                              placeholder="Enter allergy"
                            />
                            {isEditing && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => removeAllergy(index)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        )) || (
                          <p className="text-gray-500 text-sm">
                            No allergies recorded
                          </p>
                        )}
                      </div>
                    </div>

                    <Separator />

                    {/* Insurance Information */}
                    <div>
                      <Label className="text-base font-medium">
                        Insurance Information
                      </Label>
                      <div className="mt-2 space-y-2">
                        <Input
                          placeholder="Insurance Provider"
                          value={profile?.insuranceInfo?.provider || ""}
                          onChange={(e) =>
                            setProfile(profile ? {
                              ...profile,
                              insuranceInfo: {
                                provider: e.target.value,
                                policyNumber: profile.insuranceInfo?.policyNumber || "",
                                groupNumber: profile.insuranceInfo?.groupNumber || "",
                              },
                            } : null)
                          }
                          disabled={!isEditing}
                        />
                        <Input
                          placeholder="Policy Number"
                          value={profile?.insuranceInfo?.policyNumber || ""}
                          onChange={(e) =>
                            setProfile(profile ? {
                              ...profile,
                              insuranceInfo: {
                                provider: profile.insuranceInfo?.provider || "",
                                policyNumber: e.target.value,
                                groupNumber: profile.insuranceInfo?.groupNumber || "",
                              },
                            } : null)
                          }
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="w-5 h-5 text-blue-600" />
                      <span>Quick Stats</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Total Appointments
                      </span>
                      <span className="font-semibold">
                        {appointments.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Completed</span>
                      <span className="font-semibold text-green-600">
                        {
                          appointments.filter(
                            (apt) => apt.status === "completed"
                          ).length
                        }
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Upcoming</span>
                      <span className="font-semibold text-blue-600">
                        {
                          appointments.filter(
                            (apt) => apt.status === "scheduled"
                          ).length
                        }
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "appointments" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  My Appointments
                </h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Book New Appointment
                </Button>
              </div>

              <div className="grid gap-6">
                {appointments.map((appointment) => (
                  <Card key={appointment._id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img
                            src={
                              appointment.doctor.user.avatar ||
                              "/placeholder.svg?height=50&width=50"
                            }
                            alt={appointment.doctor.user.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              Dr. {appointment.doctor.user.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {appointment.doctor.specialty}
                            </p>
                            <div className="flex items-center space-x-4 mt-1">
                              <div className="flex items-center space-x-1 text-sm text-gray-500">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {new Date(
                                    appointment.appointmentDate
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1 text-sm text-gray-500">
                                <Clock className="w-4 h-4" />
                                <span>{appointment.timeSlot}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status.charAt(0).toUpperCase() +
                              appointment.status.slice(1)}
                          </Badge>
                          <p className="text-lg font-semibold text-gray-900 mt-2">
                            ${appointment.consultationFee}
                          </p>
                        </div>
                      </div>

                      {appointment.notes && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            {appointment.notes}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}

                {appointments.length === 0 && (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No appointments yet
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Book your first appointment with our doctors
                      </p>
                      <Button>Find Doctors</Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}

          {activeTab === "health" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Health Records
              </h2>

              {/* Health Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Health Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {healthMetrics.map((metric, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">
                            {metric.type}
                          </h4>
                          <span
                            className={`text-sm font-medium ${getHealthStatusColor(
                              metric.status
                            )}`}
                          >
                            {metric.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-baseline space-x-1">
                          <span className="text-2xl font-bold text-gray-900">
                            {metric.value}
                          </span>
                          <span className="text-sm text-gray-500">
                            {metric.unit}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(metric.date).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Medical History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Medical History</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">
                          Annual Checkup
                        </h4>
                        <span className="text-sm text-gray-500">
                          Jan 15, 2024
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Regular health screening completed. All vitals normal.
                      </p>
                    </div>

                    <div className="p-4 border-l-4 border-green-500 bg-green-50">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">
                          Vaccination
                        </h4>
                        <span className="text-sm text-gray-500">
                          Dec 10, 2023
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Annual flu vaccination administered.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Account Settings
              </h2>

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
                  <Separator />
                  <Button variant="destructive" className="w-full">
                    Delete Account
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
