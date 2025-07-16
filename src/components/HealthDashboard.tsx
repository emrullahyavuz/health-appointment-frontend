import { useState } from "react"
import { TrendingUp, TrendingDown, Heart, Droplets, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select"
import { Separator } from "../components/ui/Seperator"
import { Sidebar } from "./sidebar/Sidebar"

export function HealthDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("Last Week")

  const healthMetrics = [
    {
      title: "Blood Sugar",
      value: "80",
      unit: "mg/dL",
      status: "Normal",
      icon: Activity,
      color: "bg-orange-100 text-orange-600",
      chartColor: "stroke-orange-400",
    },
    {
      title: "Heart Rate",
      value: "98",
      unit: "bpm",
      status: "Normal",
      icon: Heart,
      color: "bg-red-100 text-red-600",
      chartColor: "stroke-red-400",
    },
    {
      title: "Blood Pressure",
      value: "102",
      unit: "/ 72 mmhg",
      status: "Normal",
      icon: Droplets,
      color: "bg-blue-100 text-blue-600",
      chartColor: "stroke-blue-400",
    },
  ]

  const activityData = [
    { month: "Jan 1", aerobics: 60, yoga: 40, meditation: 30 },
    { month: "Jan 7", aerobics: 70, yoga: 50, meditation: 25 },
    { month: "Jan 14", aerobics: 45, yoga: 60, meditation: 40 },
    { month: "Jan 21", aerobics: 80, yoga: 35, meditation: 50 },
    { month: "Jan 28", aerobics: 55, yoga: 70, meditation: 35 },
  ]

  const bodyMeasurements = [
    { label: "Chest (in)", value: "44.5", trend: "up" },
    { label: "Waist (in)", value: "34", trend: "down" },
    { label: "Hip (in)", value: "42.5", trend: "down" },
  ]

  return (
    <div className="flex h-screen bg-gray-50 health-dashboard">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex">
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Health Overview</h1>
              <p className="text-gray-500">August 12, 2021</p>
            </div>
          </div>

          {/* Health Metrics */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {healthMetrics.map((metric, index) => (
              <Card key={index} className="p-6 health-metric-card chart-animate">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${metric.color}`}>
                    <metric.icon className="w-5 h-5" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {metric.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                    <span className="text-sm text-gray-500">{metric.unit}</span>
                  </div>
                </div>
                <div className="mt-4 h-16">
                  <svg className="w-full h-full" viewBox="0 0 200 60">
                    <path d="M10,40 Q50,20 100,35 T190,30" fill="none" className={metric.chartColor} strokeWidth="2" />
                    <path
                      d="M10,40 Q50,20 100,35 T190,30 L190,60 L10,60 Z"
                      className={`${metric.chartColor.replace("stroke", "fill")} opacity-10`}
                    />
                  </svg>
                </div>
              </Card>
            ))}
          </div>

          {/* Activity Growth Chart */}
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Activity Growth</CardTitle>
              <Select defaultValue="jan-2021">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jan-2021">Jan 2021</SelectItem>
                  <SelectItem value="feb-2021">Feb 2021</SelectItem>
                  <SelectItem value="mar-2021">Mar 2021</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="custom-scrollbar">
              <div className="h-64 flex items-end justify-between space-x-2">
                {activityData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                    <div className="flex flex-col items-center space-y-1 h-48 justify-end">
                      <div
                        className="w-4 bg-red-400 rounded-t"
                        style={{ height: `${(data.aerobics / 100) * 120}px` }}
                      ></div>
                      <div
                        className="w-4 bg-teal-400 rounded-t"
                        style={{ height: `${(data.yoga / 100) * 120}px` }}
                      ></div>
                      <div
                        className="w-4 bg-orange-400 rounded-t"
                        style={{ height: `${(data.meditation / 100) * 120}px` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{data.month}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">Aerobics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">Yoga</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">Meditation</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Appointment */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Badge className="bg-green-100 text-green-800">August 14, 2021</Badge>
                  <span className="text-gray-900">Consultation with Dr. James</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar - BMI Calculator */}
        <div className="w-80 bg-gray-900 text-white p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">BMI Calculator</h2>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Last Week">Last Week</SelectItem>
                <SelectItem value="Last Month">Last Month</SelectItem>
                <SelectItem value="Last Year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* BMI Input Fields */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-orange-200 text-gray-900 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Height</div>
              <div className="font-semibold">170 cm</div>
            </div>
            <div className="bg-blue-200 text-gray-900 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Weight</div>
              <div className="font-semibold">72 kg</div>
            </div>
          </div>

          {/* BMI Result */}
          <div className="text-center mb-6">
            <div className="text-sm text-gray-400 mb-2">Body Mass Index (BMI)</div>
            <div className="text-3xl font-bold mb-2">24.9</div>
            <Badge className="bg-green-600 hover:bg-green-600">{"You're Healthy"}</Badge>

            {/* BMI Scale */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>15</span>
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
                <span>40</span>
              </div>
              <div className="h-2 bmi-scale rounded-full relative">
                <div
                  className="absolute top-0 w-2 h-2 bg-white rounded-full"
                  style={{ left: "60%", transform: "translateX(-50%)" }}
                ></div>
              </div>
            </div>
          </div>

          <Separator className="bg-gray-700 my-6" />

          {/* Body Measurements */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Body Measurements</h3>
            </div>
            <div className="text-sm text-gray-400 mb-4">Last checked 2 Days Ago</div>

            <div className="bg-gray-800 p-3 rounded-lg mb-4 text-center">
              <span className="text-sm">Inverted Triangle Body Shape</span>
            </div>

            {/* Body Measurements Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {bodyMeasurements.map((measurement, index) => (
                <div key={index} className="bg-white text-gray-900 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">{measurement.label}</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold">{measurement.value}</span>
                    {measurement.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Body Illustration */}
            <div className="flex justify-center">
              <div className="relative">
                <svg width="120" height="200" viewBox="0 0 120 200" className="text-orange-300">
                  {/* Body outline */}
                  <path
                    d="M60 20 C50 20 45 25 45 35 L45 60 C40 65 35 70 35 80 L35 120 C35 125 40 130 45 130 L45 180 C45 185 50 190 60 190 C70 190 75 185 75 180 L75 130 C80 130 85 125 85 120 L85 80 C85 70 80 65 75 60 L75 35 C75 25 70 20 60 20 Z"
                    fill="currentColor"
                    fillOpacity="0.3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  {/* Measurement lines */}
                  <line x1="30" y1="45" x2="90" y2="45" stroke="#ef4444" strokeWidth="2" />
                  <line x1="35" y1="85" x2="85" y2="85" stroke="#ef4444" strokeWidth="2" />
                  <line x1="40" y1="125" x2="80" y2="125" stroke="#ef4444" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
