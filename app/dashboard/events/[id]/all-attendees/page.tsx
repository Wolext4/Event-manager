"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Mail, MoreHorizontal, Search, UserCheck, X } from "lucide-react"
import { motion } from "framer-motion"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample attendees data
const attendeesData = [
  {
    id: "ATT-001",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+234 812 345 6789",
    ticketType: "VIP",
    ticketPrice: "₦675,000",
    purchaseDate: "2025-02-15",
    checkedIn: true,
    paymentMethod: "Paystack",
    notes: "Vegetarian meal requested",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "ATT-002",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+234 803 456 7890",
    ticketType: "Regular",
    ticketPrice: "₦375,000",
    purchaseDate: "2025-02-20",
    checkedIn: true,
    paymentMethod: "Flutterwave",
    notes: "",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "ATT-003",
    name: "Michael Chen",
    email: "m.chen@example.com",
    phone: "+234 705 567 8901",
    ticketType: "Early Bird",
    ticketPrice: "₦225,000",
    purchaseDate: "2025-01-10",
    checkedIn: false,
    paymentMethod: "Bank Transfer",
    notes: "Requires accessibility accommodation",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "ATT-004",
    name: "Emma Davis",
    email: "emma.d@example.com",
    phone: "+234 908 678 9012",
    ticketType: "Regular",
    ticketPrice: "₦375,000",
    purchaseDate: "2025-02-25",
    checkedIn: false,
    paymentMethod: "Paystack",
    notes: "",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "ATT-005",
    name: "David Wilson",
    email: "d.wilson@example.com",
    phone: "+234 814 789 0123",
    ticketType: "VIP",
    ticketPrice: "₦675,000",
    purchaseDate: "2025-03-01",
    checkedIn: false,
    paymentMethod: "Flutterwave",
    notes: "Allergic to nuts",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "ATT-006",
    name: "Olivia Brown",
    email: "o.brown@example.com",
    phone: "+234 706 890 1234",
    ticketType: "Early Bird",
    ticketPrice: "₦225,000",
    purchaseDate: "2025-01-15",
    checkedIn: true,
    paymentMethod: "Bank Transfer",
    notes: "",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "ATT-007",
    name: "James Taylor",
    email: "j.taylor@example.com",
    phone: "+234 809 901 2345",
    ticketType: "Regular",
    ticketPrice: "₦375,000",
    purchaseDate: "2025-02-28",
    checkedIn: false,
    paymentMethod: "Paystack",
    notes: "",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "ATT-008",
    name: "Sophia Martinez",
    email: "s.martinez@example.com",
    phone: "+234 815 012 3456",
    ticketType: "VIP",
    ticketPrice: "₦675,000",
    purchaseDate: "2025-03-05",
    checkedIn: false,
    paymentMethod: "Flutterwave",
    notes: "Media representative",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function AllAttendeesPage({ params }: { params: { id: string } }) {
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterTicketType, setFilterTicketType] = useState("all")
  const [filterCheckedIn, setFilterCheckedIn] = useState("all")

  // Filter attendees based on search query and filters
  const filteredAttendees = attendeesData.filter((attendee) => {
    const matchesSearch =
      attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTicketType = filterTicketType === "all" || attendee.ticketType === filterTicketType
    const matchesCheckedIn =
      filterCheckedIn === "all" ||
      (filterCheckedIn === "checked-in" && attendee.checkedIn) ||
      (filterCheckedIn === "not-checked-in" && !attendee.checkedIn)

    return matchesSearch && matchesTicketType && matchesCheckedIn
  })

  const toggleSelectAll = () => {
    if (selectedAttendees.length === filteredAttendees.length) {
      setSelectedAttendees([])
    } else {
      setSelectedAttendees(filteredAttendees.map((attendee) => attendee.id))
    }
  }

  const toggleSelectAttendee = (id: string) => {
    if (selectedAttendees.includes(id)) {
      setSelectedAttendees(selectedAttendees.filter((attendeeId) => attendeeId !== id))
    } else {
      setSelectedAttendees([...selectedAttendees, id])
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/dashboard/events/${params.id}`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">All Attendees</h1>
          <p className="text-muted-foreground">Manage attendees for this event</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card>
          <CardHeader className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Attendees</CardTitle>
                <CardDescription>
                  {attendeesData.length} total attendees, {attendeesData.filter((a) => a.checkedIn).length} checked in
                </CardDescription>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/events/${params.id}/attendees/import`}>Import Attendees</Link>
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col gap-4 p-4">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search attendees..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={filterTicketType} onValueChange={setFilterTicketType}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by ticket" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tickets</SelectItem>
                      <SelectItem value="Early Bird">Early Bird</SelectItem>
                      <SelectItem value="Regular">Regular</SelectItem>
                      <SelectItem value="VIP">VIP</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterCheckedIn} onValueChange={setFilterCheckedIn}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="checked-in">Checked In</SelectItem>
                      <SelectItem value="not-checked-in">Not Checked In</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedAttendees.length > 0 && (
                <div className="flex items-center justify-between rounded-lg border p-2">
                  <div className="text-sm">
                    <span className="font-medium">{selectedAttendees.length}</span> attendees selected
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Mail className="mr-2 h-4 w-4" />
                      Email Selected
                    </Button>
                    <Button size="sm" variant="outline">
                      <UserCheck className="mr-2 h-4 w-4" />
                      Check In Selected
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setSelectedAttendees([])}>
                      <X className="mr-2 h-4 w-4" />
                      Clear Selection
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t">
              <div className="grid grid-cols-12 border-b py-3 px-4 text-sm font-medium text-muted-foreground">
                <div className="col-span-1">
                  <Checkbox
                    checked={filteredAttendees.length > 0 && selectedAttendees.length === filteredAttendees.length}
                    onCheckedChange={toggleSelectAll}
                  />
                </div>
                <div className="col-span-3">Attendee</div>
                <div className="col-span-2">Ticket</div>
                <div className="col-span-2">Purchase Date</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>

              {filteredAttendees.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">No attendees found matching your filters.</p>
                </div>
              ) : (
                filteredAttendees.map((attendee) => (
                  <div
                    key={attendee.id}
                    className="grid grid-cols-12 items-center border-b py-3 px-4 hover:bg-muted/50"
                  >
                    <div className="col-span-1">
                      <Checkbox
                        checked={selectedAttendees.includes(attendee.id)}
                        onCheckedChange={() => toggleSelectAttendee(attendee.id)}
                      />
                    </div>
                    <div className="col-span-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={attendee.avatar || "/placeholder.svg"} alt={attendee.name} />
                          <AvatarFallback>
                            {attendee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{attendee.name}</p>
                          <p className="text-xs text-muted-foreground">{attendee.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <p>{attendee.ticketType}</p>
                      <p className="text-xs text-muted-foreground">{attendee.ticketPrice}</p>
                    </div>
                    <div className="col-span-2">
                      <p>{new Date(attendee.purchaseDate).toLocaleDateString()}</p>
                      <p className="text-xs text-muted-foreground">{attendee.paymentMethod}</p>
                    </div>
                    <div className="col-span-2">
                      <Badge
                        variant={attendee.checkedIn ? "default" : "outline"}
                        className={attendee.checkedIn ? "bg-green-500 hover:bg-green-500/80" : ""}
                      >
                        {attendee.checkedIn ? "Checked In" : "Not Checked In"}
                      </Badge>
                    </div>
                    <div className="col-span-2 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/events/${params.id}/attendees/${attendee.id}`}>View Details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Send Email</DropdownMenuItem>
                          <DropdownMenuItem>Resend Ticket</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>{attendee.checkedIn ? "Undo Check In" : "Check In"}</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Cancel Ticket</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
