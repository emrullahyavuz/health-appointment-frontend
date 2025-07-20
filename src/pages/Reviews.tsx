import { useState, useEffect } from "react"
import { Star, ThumbsUp, MessageSquare, Search, Award, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select"
import { Sidebar } from "../components/sidebar/Sidebar"
// import { useAuth } from "../lib/auth"

interface Review {
  _id: string
  patient: {
    name: string
    avatar?: string
  }
  doctor: {
    user: {
      name: string
    }
    specialty: string
  }
  rating: number
  comment: string
  aspects: {
    communication: number
    professionalism: number
    punctuality: number
    cleanliness: number
    overallExperience: number
  }
  wouldRecommend: boolean
  createdAt: string
  helpfulVotes: number
  isAnonymous: boolean
}

const mockReviews: Review[] = [
  {
    _id: "1",
    patient: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    doctor: {
      user: { name: "Dr. Sarah Johnson" },
      specialty: "Cardiology",
    },
    rating: 5,
    comment:
      "Dr. Johnson is exceptional! She took the time to explain my condition thoroughly and made me feel comfortable throughout the entire process. Her expertise and caring nature made all the difference.",
    aspects: {
      communication: 5,
      professionalism: 5,
      punctuality: 4,
      cleanliness: 5,
      overallExperience: 5,
    },
    wouldRecommend: true,
    createdAt: "2024-01-15T10:30:00Z",
    helpfulVotes: 12,
    isAnonymous: false,
  },
  {
    _id: "2",
    patient: {
      name: "Anonymous",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    doctor: {
      user: { name: "Dr. Michael Chen" },
      specialty: "Neurology",
    },
    rating: 4,
    comment:
      "Very knowledgeable doctor. The appointment was on time and the staff was professional. Would definitely recommend for neurological issues.",
    aspects: {
      communication: 4,
      professionalism: 5,
      punctuality: 5,
      cleanliness: 4,
      overallExperience: 4,
    },
    wouldRecommend: true,
    createdAt: "2024-01-14T14:20:00Z",
    helpfulVotes: 8,
    isAnonymous: true,
  },
]

export function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews)
  const [filteredReviews, setFilteredReviews] = useState<Review[]>(mockReviews)
  const [searchTerm, setSearchTerm] = useState("")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [showWriteReview, setShowWriteReview] = useState(false)

//   const { user } = useAuth()

  useEffect(() => {
    filterReviews()
  }, [reviews, searchTerm, ratingFilter, sortBy])

  const filterReviews = () => {
    let filtered = reviews

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (review) =>
          review.doctor.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.comment.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Rating filter
    if (ratingFilter !== "all") {
      const rating = Number.parseInt(ratingFilter)
      filtered = filtered.filter((review) => review.rating === rating)
    }

    // Sort
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      case "highest":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "lowest":
        filtered.sort((a, b) => a.rating - b.rating)
        break
      case "helpful":
        filtered.sort((a, b) => b.helpfulVotes - a.helpfulVotes)
        break
    }

    setFilteredReviews(filtered)
  }

  const renderStars = (rating: number, size = "w-4 h-4") => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className={`${size} ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
        ))}
      </div>
    )
  }

  const getAverageRating = () => {
    if (reviews.length === 0) return 0
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    return (sum / reviews.length).toFixed(1)
  }

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    reviews.forEach((review) => {
      distribution[review.rating as keyof typeof distribution]++
    })
    return distribution
  }

  const distribution = getRatingDistribution()

  const user = {
    role: "patient",
  }

  return (
    <div className="flex h-screen bg-gray-50">


      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Reviews & Ratings</h1>
            <p className="text-gray-500">Patient feedback and experiences</p>
          </div>
          {user?.role === "patient" && (
            <Button onClick={() => setShowWriteReview(true)} className="bg-orange-500 hover:bg-orange-600">
              <Star className="w-4 h-4 mr-2" />
              Write Review
            </Button>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card className="p-6 chart-animate">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">{getAverageRating()}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 chart-animate">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Reviews</p>
                <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 chart-animate">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                <ThumbsUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Recommended</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round((reviews.filter((r) => r.wouldRecommend).length / reviews.length) * 100)}%
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-6 chart-animate">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reviews.filter((r) => new Date(r.createdAt).getMonth() === new Date().getMonth()).length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Reviews List */}
          <div className="col-span-2 space-y-6">
            {/* Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="highest">Highest Rated</SelectItem>
                  <SelectItem value="lowest">Lowest Rated</SelectItem>
                  <SelectItem value="helpful">Most Helpful</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Reviews */}
            {filteredReviews.map((review) => (
              <Card key={review._id} className="health-metric-card">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={review.isAnonymous ? "/placeholder.svg?height=40&width=40" : review.patient.avatar}
                      alt={review.patient.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {review.isAnonymous ? "Anonymous" : review.patient.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {review.doctor.user.name} • {review.doctor.specialty}
                          </p>
                        </div>
                        <div className="text-right">
                          {renderStars(review.rating)}
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{review.comment}</p>

                      {/* Aspect Ratings */}
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Communication</span>
                          {renderStars(review.aspects.communication, "w-3 h-3")}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Professionalism</span>
                          {renderStars(review.aspects.professionalism, "w-3 h-3")}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Punctuality</span>
                          {renderStars(review.aspects.punctuality, "w-3 h-3")}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Cleanliness</span>
                          {renderStars(review.aspects.cleanliness, "w-3 h-3")}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {review.wouldRecommend && (
                            <Badge className="bg-green-100 text-green-800">
                              <ThumbsUp className="w-3 h-3 mr-1" />
                              Recommends
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{review.helpfulVotes} helpful</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Rating Distribution */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-orange-600" />
                  <span>Rating Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-3">
                    <span className="text-sm font-medium w-8">{rating}</span>
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{
                          width: `${reviews.length > 0 ? (distribution[rating as keyof typeof distribution] / reviews.length) * 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">
                      {distribution[rating as keyof typeof distribution]}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Average Rating</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{getAverageRating()}</span>
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Reviews</span>
                  <span className="font-semibold">{reviews.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Would Recommend</span>
                  <span className="font-semibold">
                    {Math.round((reviews.filter((r) => r.wouldRecommend).length / reviews.length) * 100)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Anonymous Reviews</span>
                  <span className="font-semibold">{reviews.filter((r) => r.isAnonymous).length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
