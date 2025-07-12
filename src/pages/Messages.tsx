import { useState } from "react"
import {
  Search,
  Send,
  Paperclip,
  Phone,
  Video,
  MoreHorizontal,
  Circle,
  MessageSquare,
  Users,
  Clock,
} from "lucide-react"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Badge } from "../components/ui/badge"
import { Sidebar } from "../components/sidebar/Sidebar"
// import { useAuth } from "../lib/auth"

interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
  isOwn: boolean
}

interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  isOnline: boolean
  role: string
}

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Your test results look good. Let's schedule a follow-up.",
    timestamp: "2 min ago",
    unreadCount: 2,
    isOnline: true,
    role: "Cardiologist",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Please take the prescribed medication twice daily.",
    timestamp: "1 hour ago",
    unreadCount: 0,
    isOnline: false,
    role: "Neurologist",
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "How are you feeling after the treatment?",
    timestamp: "3 hours ago",
    unreadCount: 1,
    isOnline: true,
    role: "Pediatrician",
  },
  {
    id: "4",
    name: "Health Support",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Your appointment has been confirmed for tomorrow.",
    timestamp: "1 day ago",
    unreadCount: 0,
    isOnline: true,
    role: "Support Team",
  },
]

const messages: Message[] = [
  {
    id: "1",
    sender: "Dr. Sarah Johnson",
    content: "Hello! I've reviewed your recent test results.",
    timestamp: "10:30 AM",
    isOwn: false,
  },
  {
    id: "2",
    sender: "You",
    content: "Hi Dr. Johnson, thank you for getting back to me so quickly.",
    timestamp: "10:32 AM",
    isOwn: true,
  },
  {
    id: "3",
    sender: "Dr. Sarah Johnson",
    content:
      "Your blood pressure readings have improved significantly since our last visit. The medication seems to be working well.",
    timestamp: "10:33 AM",
    isOwn: false,
  },
  {
    id: "4",
    sender: "You",
    content: "That's great news! I've been following the diet plan you recommended too.",
    timestamp: "10:35 AM",
    isOwn: true,
  },
  {
    id: "5",
    sender: "Dr. Sarah Johnson",
    content: "Excellent! Let's schedule a follow-up appointment in 3 months to monitor your progress.",
    timestamp: "10:36 AM",
    isOwn: false,
  },
]

export function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(conversations[0])
  const [messageText, setMessageText] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

//   const { user } = useAuth()

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", messageText)
      setMessageText("")
    }
  }

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Conversations List */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
              <Badge className="bg-orange-100 text-orange-800">{totalUnread} unread</Badge>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="p-4 border-b border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-lg mx-auto mb-1">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <p className="text-xs text-gray-600">Total</p>
                <p className="text-sm font-semibold">{conversations.length}</p>
              </div>
              <div>
                <div className="flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-lg mx-auto mb-1">
                  <Users className="w-4 h-4" />
                </div>
                <p className="text-xs text-gray-600">Online</p>
                <p className="text-sm font-semibold">{conversations.filter((c) => c.isOnline).length}</p>
              </div>
              <div>
                <div className="flex items-center justify-center w-8 h-8 bg-orange-100 text-orange-600 rounded-lg mx-auto mb-1">
                  <Clock className="w-4 h-4" />
                </div>
                <p className="text-xs text-gray-600">Unread</p>
                <p className="text-sm font-semibold">{totalUnread}</p>
              </div>
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation.id === conversation.id ? "bg-orange-50 border-orange-200" : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={conversation.avatar || "/placeholder.svg"}
                      alt={conversation.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{conversation.role}</p>
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <Badge className="bg-orange-500 text-white text-xs">{conversation.unreadCount}</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-6 border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={selectedConversation.avatar || "/placeholder.svg"}
                    alt={selectedConversation.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {selectedConversation.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">{selectedConversation.name}</h2>
                  <p className="text-sm text-gray-600">{selectedConversation.role}</p>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Circle
                      className={`w-2 h-2 ${selectedConversation.isOnline ? "text-green-500 fill-current" : "text-gray-400"}`}
                    />
                    <span>{selectedConversation.isOnline ? "Online" : "Offline"}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Phone className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isOwn ? "bg-orange-500 text-white" : "bg-white border border-gray-200 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.isOwn ? "text-orange-100" : "text-gray-500"}`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-6 border-t border-gray-200 bg-white">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Paperclip className="w-5 h-5" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  placeholder="Type your message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="pr-12"
                />
              </div>
              <Button onClick={handleSendMessage} className="bg-orange-500 hover:bg-orange-600">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
