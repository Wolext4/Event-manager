"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, ChevronDown, Download, Filter, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Chart } from "@/components/ui/chart"

// Sample sales data
const monthlySalesData = [
  { month: "Jan", revenue: 24500000 },
  { month: "Feb", revenue: 28700000 },
  { month: "Mar", revenue: 32100000 },
  { month: "Apr", revenue: 37170000 },
  { month: "May", revenue: 41500000 },
  { month: "Jun", revenue: 39800000 },
  { month: "Jul", revenue: 42300000 },
  { month: "Aug", revenue: 45600000 },
  { month: "Sep", revenue: 43200000 },
  { month: "Oct", revenue: 47800000 },
  { month: "Nov", revenue: 51200000 },
  { month: "Dec", revenue: 54500000 },
]

const ticketTypeData = [
  { name: "VIP", value: 45 },
  { name: "Standard", value: 30 },
  { name: "Early Bird", value: 15 },
  { name: "Group", value: 10 },
]

const recentSales = [
  {
    id: "INV-001",
    customer: "Sarah Johnson",
    email: "sarah.j@example.com",
    amount: 675000,
    status: "Completed",
    date: "Apr 15, 2025",
    event: "Tech Conference 2025",
    ticketType: "VIP",
  },
  {
    id: "INV-002",
    customer: "Michael Chen",
    email: "m.chen@example.com",
    amount: 225000,
    status: "Completed",
    date: "Apr 14, 2025",
    event: "Tech Conference 2025",
    ticketType: "Standard",
  },
  {
    id: "INV-003",
    customer: "Olivia Williams",
    email: "o.williams@example.com",
    amount: 1350000,
    status: "Completed",
    date: "Apr 14, 2025",
    event: "Annual Charity Gala",
    ticketType: "VIP (2 tickets)",
  },
  {
    id: "INV-004",
    customer: "James Rodriguez",
    email: "j.rodriguez@example.com",
    amount: 900000,
    status: "Completed",
    date: "Apr 13, 2025",
    event: "Product Launch",
    ticketType: "VIP (Group)",
  },
  {
    id: "INV-005",
    customer: "Emma Thompson",
    email: "e.thompson@example.com",
    amount: 225000,
    status: "Completed",
    date: "Apr 12, 2025",
    event: "Tech Conference 2025",
    ticketType: "Standard",
  },
]

export default function SalesReportPage() {
  const [dateRange, setDateRange] = useState("This Month")
  const totalRevenue = monthlySalesData.reduce((sum, item) => sum + item.revenue, 0)
  const currentMonthRevenue = monthlySalesData[3].revenue // April
  const previousMonthRevenue = monthlySalesData[2].revenue // March
  const percentageChange = ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Ticket Sales Report</h1>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                {dateRange}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setDateRange("Today")}>Today</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("This Week")}>This Week</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("This Month")}>This Month</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("This Year")}>This Year</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("All Time")}>All Time</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="icon">
            <Printer className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Revenue Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{(totalRevenue / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{(currentMonthRevenue / 1000000).toFixed(1)}M</div>
            <p className={`text-xs ${percentageChange >= 0 ? "text-green-500" : "text-red-500"}`}>
              {percentageChange >= 0 ? "+" : ""}
              {percentageChange.toFixed(1)}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Ticket Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦375,000</div>
            <p className="text-xs text-green-500">+5.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tickets Sold</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-green-500">+12.3% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Charts */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="events">By Event</TabsTrigger>
          <TabsTrigger value="ticketTypes">By Ticket Type</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
              <CardDescription>Revenue trend over the past 12 months</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <Chart
                type="bar"
                data={{
                  labels: monthlySalesData.map((d) => d.month),
                  datasets: [
                    {
                      label: "Revenue (₦)",
                      data: monthlySalesData.map((d) => d.revenue / 1000000),
                      backgroundColor: "rgba(99, 102, 241, 0.8)",
                      borderColor: "rgb(99, 102, 241)",
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: "Revenue (Millions ₦)",
                      },
                    },
                  },
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ticket Type Distribution</CardTitle>
              <CardDescription>Percentage of sales by ticket type</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <Chart
                type="doughnut"
                data={{
                  labels: ticketTypeData.map((d) => d.name),
                  datasets: [
                    {
                      data: ticketTypeData.map((d) => d.value),
                      backgroundColor: [
                        "rgba(99, 102, 241, 0.8)",
                        "rgba(59, 130, 246, 0.8)",
                        "rgba(16, 185, 129, 0.8)",
                        "rgba(245, 158, 11, 0.8)",
                      ],
                      borderColor: ["rgb(99, 102, 241)", "rgb(59, 130, 246)", "rgb(16, 185, 129)", "rgb(245, 158, 11)"],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "right",
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Event</CardTitle>
              <CardDescription>Breakdown of revenue by event</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <Chart
                type="bar"
                data={{
                  labels: ["Tech Conference", "Charity Gala", "Product Launch", "Music Festival", "Business Summit"],
                  datasets: [
                    {
                      label: "Revenue (₦)",
                      data: [18.5, 9.2, 7.8, 5.4, 3.9],
                      backgroundColor: "rgba(99, 102, 241, 0.8)",
                      borderColor: "rgb(99, 102, 241)",
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  indexAxis: "y",
                  scales: {
                    x: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: "Revenue (Millions ₦)",
                      },
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ticketTypes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Ticket Type</CardTitle>
              <CardDescription>Number of tickets sold by type</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <Chart
                type="bar"
                data={{
                  labels: ["VIP", "Standard", "Early Bird", "Group"],
                  datasets: [
                    {
                      label: "Tickets Sold",
                      data: [320, 560, 180, 185],
                      backgroundColor: "rgba(99, 102, 241, 0.8)",
                      borderColor: "rgb(99, 102, 241)",
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: "Number of Tickets",
                      },
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Sales */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
          <CardDescription>Latest ticket purchases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <Input placeholder="Search transactions..." className="max-w-sm" />
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b text-left text-sm font-medium text-muted-foreground">
                  <th className="whitespace-nowrap px-4 py-3">Invoice</th>
                  <th className="whitespace-nowrap px-4 py-3">Customer</th>
                  <th className="whitespace-nowrap px-4 py-3">Event</th>
                  <th className="whitespace-nowrap px-4 py-3">Ticket Type</th>
                  <th className="whitespace-nowrap px-4 py-3">Amount</th>
                  <th className="whitespace-nowrap px-4 py-3">Status</th>
                  <th className="whitespace-nowrap px-4 py-3">Date</th>
                  <th className="whitespace-nowrap px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentSales.map((sale) => (
                  <tr key={sale.id} className="border-b text-sm transition-colors hover:bg-muted/50">
                    <td className="whitespace-nowrap px-4 py-3 font-medium">{sale.id}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <div>{sale.customer}</div>
                      <div className="text-xs text-muted-foreground">{sale.email}</div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">{sale.event}</td>
                    <td className="whitespace-nowrap px-4 py-3">{sale.ticketType}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-medium">₦{sale.amount.toLocaleString()}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <div className="inline-flex items-center rounded-full border border-green-500/20 bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-500">
                        {sale.status}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">{sale.date}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
