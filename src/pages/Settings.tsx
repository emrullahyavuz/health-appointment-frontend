import { useState } from "react"
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  CreditCard,
  Download,
  Trash2,
  Moon,
  Sun,
  Monitor,
  Smartphone,
  Mail,
  MessageSquare,
} from "lucide-react"
import { Card } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Switch } from "../components/ui/Switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select"
import { Label } from "../components/ui/Label"
import { Separator } from "../components/ui/Seperator"
import { Sidebar } from "../components/sidebar/Sidebar"
// import { useAuth } from "../lib/auth"

interface SettingsSection {
  id: string
  title: string
  icon: any
  description: string
}

const settingsSections: SettingsSection[] = [
  {
    id: "account",
    title: "Account Settings",
    icon: User,
    description: "Manage your account information and preferences",
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: Bell,
    description: "Configure how you receive notifications",
  },
  {
    id: "privacy",
    title: "Privacy & Security",
    icon: Shield,
    description: "Control your privacy and security settings",
  },
  {
    id: "appearance",
    title: "Appearance",
    icon: Palette,
    description: "Customize the look and feel of your dashboard",
  },
  {
    id: "language",
    title: "Language & Region",
    icon: Globe,
    description: "Set your language and regional preferences",
  },
  {
    id: "billing",
    title: "Billing & Payments",
    icon: CreditCard,
    description: "Manage your subscription and payment methods",
  },
]

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState("account")
  const [settings, setSettings] = useState({
    // Notification settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    appointmentReminders: true,
    healthTips: true,
    marketingEmails: false,

    // Privacy settings
    profileVisibility: "private",
    shareHealthData: false,
    allowDataAnalytics: true,
    twoFactorAuth: false,

    // Appearance settings
    theme: "system",
    fontSize: "medium",
    compactMode: false,

    // Language settings
    language: "en",
    timezone: "UTC-5",
    dateFormat: "MM/DD/YYYY",

    // Communication preferences
    preferredContact: "email",
    appointmentConfirmation: "both",
  })

//   const { user } = useAuth()
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    role: "patient",
  }

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label>Full Name</Label>
            <p className="text-sm text-gray-600 mt-1">{user?.name}</p>
          </div>
          <div>
            <Label>Email Address</Label>
            <p className="text-sm text-gray-600 mt-1">{user?.email}</p>
          </div>
          <div>
            <Label>Phone Number</Label>
            <p className="text-sm text-gray-600 mt-1">{user?.phone}</p>
          </div>
          <div>
            <Label>Account Type</Label>
            <p className="text-sm text-gray-600 mt-1 capitalize">{user?.role}</p>
          </div>
        </div>
        <Button className="mt-4 bg-transparent" variant="outline">
          Edit Profile
        </Button>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Account Actions</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Download Your Data</Label>
              <p className="text-sm text-gray-600">Get a copy of all your health data</p>
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-red-600">Delete Account</Label>
              <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-600">Receive notifications via email</p>
              </div>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-5 h-5 text-gray-400" />
              <div>
                <Label>SMS Notifications</Label>
                <p className="text-sm text-gray-600">Receive notifications via text message</p>
              </div>
            </div>
            <Switch
              checked={settings.smsNotifications}
              onCheckedChange={(checked) => updateSetting("smsNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-gray-400" />
              <div>
                <Label>Push Notifications</Label>
                <p className="text-sm text-gray-600">Receive push notifications on your device</p>
              </div>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => updateSetting("pushNotifications", checked)}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Types</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Appointment Reminders</Label>
              <p className="text-sm text-gray-600">Get reminded about upcoming appointments</p>
            </div>
            <Switch
              checked={settings.appointmentReminders}
              onCheckedChange={(checked) => updateSetting("appointmentReminders", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Health Tips</Label>
              <p className="text-sm text-gray-600">Receive personalized health tips and advice</p>
            </div>
            <Switch checked={settings.healthTips} onCheckedChange={(checked) => updateSetting("healthTips", checked)} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Marketing Emails</Label>
              <p className="text-sm text-gray-600">Receive promotional emails and updates</p>
            </div>
            <Switch
              checked={settings.marketingEmails}
              onCheckedChange={(checked) => updateSetting("marketingEmails", checked)}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Communication Preferences</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label>Preferred Contact Method</Label>
            <Select
              value={settings.preferredContact}
              onValueChange={(value) => updateSetting("preferredContact", value)}
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="phone">Phone Call</SelectItem>
                <SelectItem value="app">In-App Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Appointment Confirmations</Label>
            <Select
              value={settings.appointmentConfirmation}
              onValueChange={(value) => updateSetting("appointmentConfirmation", value)}
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email Only</SelectItem>
                <SelectItem value="sms">SMS Only</SelectItem>
                <SelectItem value="both">Email & SMS</SelectItem>
                <SelectItem value="none">No Confirmation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy Controls</h3>
        <div className="space-y-4">
          <div>
            <Label>Profile Visibility</Label>
            <Select
              value={settings.profileVisibility}
              onValueChange={(value) => updateSetting("profileVisibility", value)}
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="doctors-only">Doctors Only</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-600 mt-1">Control who can see your profile information</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Share Health Data for Research</Label>
              <p className="text-sm text-gray-600">Allow anonymized health data to be used for medical research</p>
            </div>
            <Switch
              checked={settings.shareHealthData}
              onCheckedChange={(checked) => updateSetting("shareHealthData", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Allow Data Analytics</Label>
              <p className="text-sm text-gray-600">Help improve our services by sharing usage analytics</p>
            </div>
            <Switch
              checked={settings.allowDataAnalytics}
              onCheckedChange={(checked) => updateSetting("allowDataAnalytics", checked)}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => updateSetting("twoFactorAuth", checked)}
              />
              {!settings.twoFactorAuth && (
                <Button variant="outline" size="sm">
                  Setup
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Change Password</Label>
              <p className="text-sm text-gray-600">Update your account password</p>
            </div>
            <Button variant="outline">Change Password</Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Active Sessions</Label>
              <p className="text-sm text-gray-600">Manage devices logged into your account</p>
            </div>
            <Button variant="outline">View Sessions</Button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Theme</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: "light", label: "Light", icon: Sun },
            { value: "dark", label: "Dark", icon: Moon },
            { value: "system", label: "System", icon: Monitor },
          ].map((theme) => (
            <div
              key={theme.value}
              onClick={() => updateSetting("theme", theme.value)}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                settings.theme === theme.value
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <theme.icon className="w-6 h-6" />
                <span className="text-sm font-medium">{theme.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Display Options</h3>
        <div className="space-y-4">
          <div>
            <Label>Font Size</Label>
            <Select value={settings.fontSize} onValueChange={(value) => updateSetting("fontSize", value)}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
                <SelectItem value="extra-large">Extra Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Compact Mode</Label>
              <p className="text-sm text-gray-600">Show more content in less space</p>
            </div>
            <Switch
              checked={settings.compactMode}
              onCheckedChange={(checked) => updateSetting("compactMode", checked)}
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderLanguageSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Language & Region</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label>Language</Label>
            <Select value={settings.language} onValueChange={(value) => updateSetting("language", value)}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="it">Italiano</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Timezone</Label>
            <Select value={settings.timezone} onValueChange={(value) => updateSetting("timezone", value)}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                <SelectItem value="UTC+0">GMT (UTC+0)</SelectItem>
                <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Date Format</Label>
            <Select value={settings.dateFormat} onValueChange={(value) => updateSetting("dateFormat", value)}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                <SelectItem value="DD MMM YYYY">DD MMM YYYY</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Time Format</Label>
            <Select defaultValue="12h">
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12h">12 Hour</SelectItem>
                <SelectItem value="24h">24 Hour</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderBillingSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Current Plan</h3>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Premium Plan</h4>
              <p className="text-sm text-gray-600">Unlimited appointments and health tracking</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">$29.99/month</p>
            </div>
            <Button variant="outline">Change Plan</Button>
          </div>
        </Card>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h3>
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-8 h-8 text-gray-400" />
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-gray-600">Expires 12/25</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
                <Button variant="ghost" size="sm">
                  Remove
                </Button>
              </div>
            </div>
          </Card>
          <Button variant="outline" className="w-full bg-transparent">
            Add Payment Method
          </Button>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Billing History</h3>
        <div className="space-y-3">
          {[
            { date: "Jan 15, 2024", amount: "$29.99", status: "Paid" },
            { date: "Dec 15, 2023", amount: "$29.99", status: "Paid" },
            { date: "Nov 15, 2023", amount: "$29.99", status: "Paid" },
          ].map((invoice, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">{invoice.date}</p>
                <p className="text-sm text-gray-600">Monthly subscription</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{invoice.amount}</p>
                <p className="text-sm text-green-600">{invoice.status}</p>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4 bg-transparent">
          View All Invoices
        </Button>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "account":
        return renderAccountSettings()
      case "notifications":
        return renderNotificationSettings()
      case "privacy":
        return renderPrivacySettings()
      case "appearance":
        return renderAppearanceSettings()
      case "language":
        return renderLanguageSettings()
      case "billing":
        return renderBillingSettings()
      default:
        return renderAccountSettings()
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">


      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Settings Navigation */}
        <div className="w-80 bg-white border-r border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
            <p className="text-sm text-gray-600">Manage your account and preferences</p>
          </div>

          <nav className="p-4 space-y-2">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  activeSection === section.id
                    ? "bg-orange-50 text-orange-700 border border-orange-200"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <section.icon className="w-5 h-5" />
                  <div>
                    <p className="font-medium">{section.title}</p>
                    <p className="text-xs text-gray-500">{section.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          <div className="max-w-4xl">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900">
                {settingsSections.find((s) => s.id === activeSection)?.title}
              </h2>
              <p className="text-gray-600">{settingsSections.find((s) => s.id === activeSection)?.description}</p>
            </div>

            {renderContent()}

            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-orange-500 hover:bg-orange-600">Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
