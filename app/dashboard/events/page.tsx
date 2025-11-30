"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarIcon, ChevronDown, Filter, Plus, Search, SlidersHorizontal } from "lucide-react"
import { motion } from "framer-motion"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data
const events = [
  {
    id: 1,
    name: "Tech Conference 2025",
    date: "May 15-17, 2025",
    location: "San Francisco Convention Center",
    attendees: 1200,
    status: "Confirmed",
    type: "Conference",
    ticketsSold: 850,
    revenue: "₦191,250,000",
  },
  {
    id: 2,
    name: "Annual Charity Gala",
    date: "June 5, 2025",
    location: "Grand Ballroom, New York",
    attendees: 500,
    status: "Planning",
    type: "Gala",
    ticketsSold: 320,
    revenue: "₦144,000,000",
  },
  {
    id: 3,
    name: "Product Launch: NextGen",
    date: "April 28, 2025",
    location: "Tech Hub, Chicago",
    attendees: 350,
    status: "Confirmed",
    type: "Launch",
    ticketsSold: 350,
    revenue: "₦78,750,000",
  },
  {
    id: 4,
    name: "Marketing Workshop",
    date: "July 10, 2025",
    location: "Business Center, Boston",
    attendees: 75,
    status: "Planning",
    type: "Workshop",
    ticketsSold: 45,
    revenue: "₦20,250,000",
  },
  {
    id: 5,
    name: "Summer Music Festival",
    date: "August 5-7, 2025",
    location: "Riverside Park, Austin",
    attendees: 5000,
    status: "Planning",
    type: "Festival",
    ticketsSold: 2800,
    revenue: "₦420,000,000",
  },
  {
    id: 6,
    name: "Leadership Summit",
    date: "September 15, 2025",
    location: "Executive Center, Seattle",
    attendees: 200,
    status: "Draft",
    type: "Summit",
    ticketsSold: 0,
    revenue: "₦0",
  },
  {
    id: 7,
    name: "AI & Machine Learning Expo",
    date: "October 3-5, 2025",
    location: "Innovation Center, San Jose",
    attendees: 1500,
    status: "Draft",
    type: "Expo",
    ticketsSold: 0,
    revenue: "₦0",
  },
]

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [sortBy, setSortBy] = useState("date-desc")
  const [filterType, setFilterType] = useState("all")

  // Sort events based on the selected sort option
  const sortEvents = (events) => {
    switch (sortBy) {
      case "name-asc":
        return [...events].sort((a, b) => a.name.localeCompare(b.name))
      case "name-desc":
        return [...events].sort((a, b) => b.name.localeCompare(a.name))
      case "date-asc":
        return [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      case "date-desc":
        return [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      case "attendees-high":
        return [...events].sort((a, b) => b.attendees - a.attendees)
      case "attendees-low":
        return [...events].sort((a, b) => a.attendees - b.attendees)
      case "revenue-high":
        return [...events].sort((a, b) => {
          const aRevenue = Number.parseFloat(a.revenue.replace(/[^0-9.-]+/g, ""))
          const bRevenue = Number.parseFloat(b.revenue.replace(/[^0-9.-]+/g, ""))
          return bRevenue - aRevenue
        })
      case "revenue-low":
        return [...events].sort((a, b) => {
          const aRevenue = Number.parseFloat(a.revenue.replace(/[^0-9.-]+/g, ""))
          const bRevenue = Number.parseFloat(b.revenue.replace(/[^0-9.-]+/g, ""))
          return aRevenue - bRevenue
        })
      default:
        return events
    }
  }

  // Filter events based on search term and active tab
  const filteredEvents = sortEvents(
    events.filter((event) => {
      const matchesSearch =
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "confirmed" && event.status === "Confirmed") ||
        (activeTab === "planning" && event.status === "Planning") ||
        (activeTab === "draft" && event.status === "Draft")

      const matchesFilter = filterType === "all" || event.type === filterType

      return matchesSearch && matchesTab && matchesFilter
    }),
  )

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground">Create and manage your events</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/events/create">
            <Plus className="mr-2 h-4 w-4" />
            New Event
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="search"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9"
          />
          <Button variant="outline" size="sm" className="h-9 px-3 lg:px-4">
            <Search className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:ml-2">Search</span>
          </Button>
        </div>
        <div className="flex items-center gap-2">
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
                All Events
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterType === "Conference"}
                onCheckedChange={() => setFilterType("Conference")}
              >
                Conference
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterType === "Workshop"}
                onCheckedChange={() => setFilterType("Workshop")}
              >
                Workshop
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={filterType === "Gala"} onCheckedChange={() => setFilterType("Gala")}>
                Gala
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterType === "Festival"}
                onCheckedChange={() => setFilterType("Festival")}
              >
                Festival
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuItem onClick={() => setSortBy("date-desc")}>Date (Newest first)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("date-asc")}>Date (Oldest first)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("name-asc")}>Name (A-Z)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("name-desc")}>Name (Z-A)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("attendees-high")}>Attendees (High-Low)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("revenue-high")}>Revenue (High-Low)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="line-clamp-1 text-lg">
                          <Link href={`/dashboard/events/${event.id}`} className="hover:underline">
                            {event.name}
                          </Link>
                        </CardTitle>
                        <CardDescription className="line-clamp-1">{event.location}</CardDescription>
                      </div>
                      <Badge
                        variant={
                          event.status === "Confirmed"
                            ? "default"
                            : event.status === "Planning"
                              ? "outline"
                              : "secondary"
                        }
                      >
                        {event.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Attendees</p>
                        <p className="font-medium">{event.attendees.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Type</p>
                        <p className="font-medium">{event.type}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Tickets Sold</p>
                        <p className="font-medium">{event.ticketsSold.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Revenue</p>
                        <p className="font-medium">{event.revenue}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/events/${event.id}`}>View Details</Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/events/${event.id}/edit`}>Edit Event</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/events/${event.id}/attendees`}>View Attendees</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/events/${event.id}/tickets`}>Manage Tickets</Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/events/${event.id}/duplicate`}>Duplicate</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild className="text-destructive">
                            <Link href={`/dashboard/events/${event.id}/cancel`}>Cancel Event</Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="confirmed" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="overflow-hidden transition-all hover:shadow-md">
                  {/* Same card content as above */}
                  <CardHeader className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="line-clamp-1 text-lg">
                          <Link href={`/dashboard/events/${event.id}`} className="hover:underline">
                            {event.name}
                          </Link>
                        </CardTitle>
                        <CardDescription className="line-clamp-1">{event.location}</CardDescription>
                      </div>
                      <Badge variant="default">{event.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    {/* Same card content as above */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Attendees</p>
                        <p className="font-medium">{event.attendees.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Type</p>
                        <p className="font-medium">{event.type}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Tickets Sold</p>
                        <p className="font-medium">{event.ticketsSold.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Revenue</p>
                        <p className="font-medium">{event.revenue}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/events/${event.id}`}>View Details</Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/events/${event.id}/edit`}>Edit Event</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/events/${event.id}/attendees`}>View Attendees</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/events/${event.id}/tickets`}>Manage Tickets</Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/events/${event.id}/duplicate`}>Duplicate</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild className="text-destructive">
                            <Link href={`/dashboard/events/${event.id}/cancel`}>Cancel Event</Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="planning" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="overflow-hidden transition-all hover:shadow-md">
                  {/* Same card content structure */}
                  <CardHeader className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="line-clamp-1 text-lg">
                          <Link href={`/dashboard/events/${event.id}`} className="hover:underline">
                            {event.name}
                          </Link>
                        </CardTitle>
                        <CardDescription className="line-clamp-1">{event.location}</CardDescription>
                      </div>
                      <Badge variant="outline">{event.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    {/* Same card content as above */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Attendees</p>
                        <p className="font-medium">{event.attendees.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Type</p>
                        <p className="font-medium">{event.type}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Tickets Sold</p>
                        <p className="font-medium">{event.ticketsSold.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Revenue</p>
                        <p className="font-medium">{event.revenue}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/events/${event.id}`}>View Details</Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/events/${event.id}/edit`}>Edit Event</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/events/${event.id}/attendees`}>View Attendees</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/events/${event.id}/tickets`}>Manage Tickets</Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/events/${event.id}/duplicate`}>Duplicate</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild className="text-destructive">
                            <Link href={`/dashboard/events/${event.id}/cancel`}>Cancel Event</Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="draft" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="overflow-hidden transition-all hover:shadow-md">
                  {/* Same card content structure */}
                  <CardHeader className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="line-clamp-1 text-lg">
                          <Link href={`/dashboard/events/${event.id}`} className="hover:underline">
                            {event.name}
                          </Link>
                        </CardTitle>
                        <CardDescription className="line-clamp-1">{event.location}</CardDescription>
                      </div>
                      <Badge variant="secondary">{event.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    {/* Same card content as above */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Attendees</p>
                        <p className="font-medium">{event.attendees.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Type</p>
                        <p className="font-medium">{event.type}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Tickets Sold</p>
                        <p className="font-medium">{event.ticketsSold.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Revenue</p>
                        <p className="font-medium">{event.revenue}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/events/${event.id}`}>View Details</Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/events/${event.id}/edit`}>Edit Event</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/events/${event.id}/publish`}>Publish</Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/events/${event.id}/duplicate`}>Duplicate</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild className="text-destructive">
                            <Link href={`/dashboard/events/${event.id}/delete`}>Delete</Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
