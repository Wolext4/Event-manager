"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, Download, Filter, Plus, Search, Ticket } from "lucide-react"
import { motion } from "framer-motion"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample ticket data
const tickets = [
  {
    id: "TKT-001",
    eventName: "Tech Conference 2025",
    eventId: 1,
    purchaseDate: "2025-03-15",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    type: "VIP",
    price: "₦675,000.00",
    status: "Confirmed",
    checkedIn: false,
  },
  {
    id: "TKT-002",
    eventName: "Tech Conference 2025",
    eventId: 1,
    purchaseDate: "2025-03-16",
    customer: {
      name: "Michael Chen",
      email: "michael.c@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    type: "Regular",
    price: "₦375,000.00",
    status: "Confirmed",
    checkedIn: false,
  },
  {
    id: "TKT-003",
    eventName: "Tech Conference 2025",
    eventId: 1,
    purchaseDate: "2025-03-18",
    customer: {
      name: "Emily Davis",
      email: "emily.d@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    type: "Early Bird",
    price: "₦225,000.00",
    status: "Confirmed",
    checkedIn: true,
  },
  {
    id: "TKT-004",
    eventName: "Annual Charity Gala",
    eventId: 2,
    purchaseDate: "2025-04-02",
    customer: {
      name: "Robert Wilson",
      email: "robert.w@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    type: "VIP Table",
    price: "₦3,000,000.00",
    status: "Confirmed",
    checkedIn: false,
  },
  {
    id: "TKT-005",
    eventName: "Annual Charity Gala",
    eventId: 2,
    purchaseDate: "2025-04-05",
    customer: {
      name: "Jennifer Lopez",
      email: "jennifer.l@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    type: "Individual",
    price: "₦450,000.00",
    status: "Confirmed",
    checkedIn: false,
  },
  {
    id: "TKT-006",
    eventName: "Product Launch",
    eventId: 3,
    purchaseDate: "2025-03-25",
    customer: {
      name: "David Kim",
      email: "david.k@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    type: "Standard",
    price: "₦225,000.00",
    status: "Confirmed",
    checkedIn: false,
  },
  {
    id: "TKT-007",
    eventName: "Product Launch",
    eventId: 3,
    purchaseDate: "2025-03-26",
    customer: {
      name: "Lisa Brown",
      email: "lisa.b@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    type: "Standard",
    price: "₦225,000.00",
    status: "Refunded",
    checkedIn: false,
  },
  {
    id: "TKT-008",
    eventName: "Tech Conference 2025",
    eventId: 1,
    purchaseDate: "2025-03-20",
    customer: {
      name: "James Wilson",
      email: "james.w@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    type: "Regular",
    price: "₦375,000.00",
    status: "Confirmed",
    checkedIn: false,
  },
]

// Sample events for filtering
const events = [
  { id: 1, name: "Tech Conference 2025" },
  { id: 2, name: "Annual Charity Gala" },
  { id: 3, name: "Product Launch" },
  { id: 4, name: "Marketing Workshop" },
]

export default function TicketsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedEvent, setSelectedEvent] = useState("all")
  const [sortBy, setSortBy] = useState("date-desc")
  const [filterType, setFilterType] = useState("all")

  // Sort tickets based on the selected sort option
  const sortTickets = (tickets) => {
    switch (sortBy) {
      case "id-asc":
        return [...tickets].sort((a, b) => a.id.localeCompare(b.id))
      case "id-desc":
        return [...tickets].sort((a, b) => b.id.localeCompare(a.id))
      case "event-asc":
        return [...tickets].sort((a, b) => a.eventName.localeCompare(b.eventName))
      case "event-desc":
        return [...tickets].sort((a, b) => b.eventName.localeCompare(a.eventName))
      case "date-asc":
        return [...tickets].sort((a, b) => new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime())
      case "date-desc":
        return [...tickets].sort((a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime())
      case "price-high":
        return [...tickets].sort((a, b) => {
          const aPrice = Number.parseFloat(a.price.replace(/[^0-9.-]+/g, ""))
          const bPrice = Number.parseFloat(b.price.replace(/[^0-9.-]+/g, ""))
          return bPrice - aPrice
        })
      case "price-low":
        return [...tickets].sort((a, b) => {
          const aPrice = Number.parseFloat(a.price.replace(/[^0-9.-]+/g, ""))
          const bPrice = Number.parseFloat(b.price.replace(/[^0-9.-]+/g, ""))
          return aPrice - bPrice
        })
      default:
        return tickets
    }
  }

  // Filter tickets based on search term, active tab, selected event, and ticket type
  const filteredTickets = sortTickets(
    tickets.filter((ticket) => {
      const matchesSearch =
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.eventName.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "confirmed" && ticket.status === "Confirmed") ||
        (activeTab === "refunded" && ticket.status === "Refunded") ||
        (activeTab === "checked-in" && ticket.checkedIn)

      const matchesEvent = selectedEvent === "all" || ticket.eventId.toString() === selectedEvent

      const matchesType = filterType === "all" || ticket.type === filterType

      return matchesSearch && matchesTab && matchesEvent && matchesType
    }),
  )

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tickets</h1>
          <p className="text-muted-foreground">Manage tickets for all your events</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/tickets/scan">
              <Ticket className="mr-2 h-4 w-4" />
              Scan Tickets
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/tickets/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Tickets
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="search"
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9"
          />
          <Button variant="outline" size="sm" className="h-9 px-3 lg:px-4">
            <Search className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:ml-2">Search</span>
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={selectedEvent} onValueChange={setSelectedEvent}>
            <SelectTrigger className="h-9 w-[180px]">
              <SelectValue placeholder="Select Event" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              {events.map((event) => (
                <SelectItem key={event.id} value={event.id.toString()}>
                  {event.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={filterType === "all"} onCheckedChange={() => setFilterType("all")}>
                All Tickets
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={filterType === "VIP"} onCheckedChange={() => setFilterType("VIP")}>
                VIP Tickets
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterType === "Regular"}
                onCheckedChange={() => setFilterType("Regular")}
              >
                Regular Tickets
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterType === "Early Bird"}
                onCheckedChange={() => setFilterType("Early Bird")}
              >
                Early Bird Tickets
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Date Range</DropdownMenuLabel>
              <DropdownMenuCheckboxItem>Last 7 days</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Last 30 days</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>All time</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm" className="h-9">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="all">All Tickets</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="refunded">Refunded</TabsTrigger>
          <TabsTrigger value="checked-in">Checked In</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Tickets</CardTitle>
              <CardDescription>
                Showing {filteredTickets.length} of {tickets.length} tickets
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Ticket ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Event
                        <DropdownMenu>
                          <DropdownMenuTrigger className="ml-1 cursor-pointer">
                            <ArrowUpDown className="h-3 w-3" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSortBy("event-asc")}>A-Z</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSortBy("event-desc")}>Z-A</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Purchase Date
                        <DropdownMenu>
                          <DropdownMenuTrigger className="ml-1 cursor-pointer">
                            <ArrowUpDown className="h-3 w-3" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSortBy("date-desc")}>Newest first</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSortBy("date-asc")}>Oldest first</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map((ticket, index) => (
                    <motion.tr
                      key={ticket.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <TableCell className="font-medium">
                        <Link href={`/dashboard/tickets/${ticket.id}`} className="hover:underline">
                          {ticket.id}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={ticket.customer.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{ticket.customer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{ticket.customer.name}</div>
                            <div className="text-xs text-muted-foreground">{ticket.customer.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link href={`/dashboard/events/${ticket.eventId}`} className="hover:underline">
                          {ticket.eventName}
                        </Link>
                      </TableCell>
                      <TableCell>{ticket.type}</TableCell>
                      <TableCell>{new Date(ticket.purchaseDate).toLocaleDateString()}</TableCell>
                      <TableCell>{ticket.price}</TableCell>
                      <TableCell>
                        <Badge variant={ticket.status === "Confirmed" ? "default" : "destructive"}>
                          {ticket.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/tickets/${ticket.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/tickets/${ticket.id}/edit`}>Edit Ticket</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/tickets/${ticket.id}/resend`}>Resend Email</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {ticket.checkedIn ? (
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/tickets/${ticket.id}/undo-checkin`}>Undo Check-in</Link>
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/tickets/${ticket.id}/checkin`}>Check In</Link>
                              </DropdownMenuItem>
                            )}
                            {ticket.status === "Confirmed" && (
                              <DropdownMenuItem asChild className="text-destructive">
                                <Link href={`/dashboard/tickets/${ticket.id}/refund`}>Refund Ticket</Link>
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))}
                  {filteredTickets.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No tickets found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="confirmed" className="mt-4">
          {/* Same table structure as above, but filtered for confirmed tickets */}
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Confirmed Tickets</CardTitle>
              <CardDescription>All tickets with confirmed status</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Ticket ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Purchase Date</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map((ticket, index) => (
                    <motion.tr
                      key={ticket.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <TableCell className="font-medium">
                        <Link href={`/dashboard/tickets/${ticket.id}`} className="hover:underline">
                          {ticket.id}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={ticket.customer.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{ticket.customer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{ticket.customer.name}</div>
                            <div className="text-xs text-muted-foreground">{ticket.customer.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link href={`/dashboard/events/${ticket.eventId}`} className="hover:underline">
                          {ticket.eventName}
                        </Link>
                      </TableCell>
                      <TableCell>{ticket.type}</TableCell>
                      <TableCell>{new Date(ticket.purchaseDate).toLocaleDateString()}</TableCell>
                      <TableCell>{ticket.price}</TableCell>
                      <TableCell>
                        <Badge variant="default">{ticket.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/tickets/${ticket.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/tickets/${ticket.id}/edit`}>Edit Ticket</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/tickets/${ticket.id}/resend`}>Resend Email</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {ticket.checkedIn ? (
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/tickets/${ticket.id}/undo-checkin`}>Undo Check-in</Link>
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/tickets/${ticket.id}/checkin`}>Check In</Link>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem asChild className="text-destructive">
                              <Link href={`/dashboard/tickets/${ticket.id}/refund`}>Refund Ticket</Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="refunded" className="mt-4">
          {/* Similar table structure for refunded tickets */}
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Refunded Tickets</CardTitle>
              <CardDescription>All tickets that have been refunded</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Ticket ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Purchase Date</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map((ticket, index) => (
                    <motion.tr
                      key={ticket.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <TableCell className="font-medium">
                        <Link href={`/dashboard/tickets/${ticket.id}`} className="hover:underline">
                          {ticket.id}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={ticket.customer.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{ticket.customer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{ticket.customer.name}</div>
                            <div className="text-xs text-muted-foreground">{ticket.customer.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link href={`/dashboard/events/${ticket.eventId}`} className="hover:underline">
                          {ticket.eventName}
                        </Link>
                      </TableCell>
                      <TableCell>{ticket.type}</TableCell>
                      <TableCell>{new Date(ticket.purchaseDate).toLocaleDateString()}</TableCell>
                      <TableCell>{ticket.price}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">{ticket.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/tickets/${ticket.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/tickets/${ticket.id}/edit`}>Edit Ticket</Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checked-in" className="mt-4">
          {/* Similar table structure for checked-in tickets */}
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Checked In Tickets</CardTitle>
              <CardDescription>All tickets that have been checked in</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Ticket ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Purchase Date</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map((ticket, index) => (
                    <motion.tr
                      key={ticket.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <TableCell className="font-medium">
                        <Link href={`/dashboard/tickets/${ticket.id}`} className="hover:underline">
                          {ticket.id}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={ticket.customer.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{ticket.customer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{ticket.customer.name}</div>
                            <div className="text-xs text-muted-foreground">{ticket.customer.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link href={`/dashboard/events/${ticket.eventId}`} className="hover:underline">
                          {ticket.eventName}
                        </Link>
                      </TableCell>
                      <TableCell>{ticket.type}</TableCell>
                      <TableCell>{new Date(ticket.purchaseDate).toLocaleDateString()}</TableCell>
                      <TableCell>{ticket.price}</TableCell>
                      <TableCell>
                        <Badge variant={ticket.status === "Confirmed" ? "default" : "destructive"}>
                          {ticket.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/tickets/${ticket.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/tickets/${ticket.id}/edit`}>Edit Ticket</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/tickets/${ticket.id}/undo-checkin`}>Undo Check-in</Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
