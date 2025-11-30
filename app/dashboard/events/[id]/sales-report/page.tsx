"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Download, Filter, Printer } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Chart } from "@/components/ui/chart"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

// Sample sales data
const salesData = {
  summary: {
    totalRevenue: "₦191,250,000",
    ticketsSold: 850,
    averageTicketPrice: "₦225,000",
    refunds: 12,
    refundAmount: "₦4,500,000",
  },
  byTicketType: [
    { name: "Early Bird", value: 500, revenue: "₦112,500,000", color: "#4f46e5" },
    { name: "Regular", value: 300, revenue: "₦112,500,000", color: "#0ea5e9" },
    { name: "VIP", value: 50, revenue: "₦33,750,000", color: "#f59e0b" },
  ],
  byDate: [
    { date: "2025-01-01", tickets: 50, revenue: 11250000 },
    { date: "2025-01-15", tickets: 75, revenue: 16875000 },
    { date: "2025-02-01", tickets: 120, revenue: 27000000 },
    { date: "2025-02-15", tickets: 200, revenue: 45000000 },
    { date: "2025-03-01", tickets: 180, revenue: 40500000 },
    { date: "2025-03-15", tickets: 150, revenue: 33750000 },
    { date: "2025-04-01", tickets: 75, revenue: 16875000 },
  ],
  byPaymentMethod: [
    { name: "Paystack", value: 450, revenue: "₦101,250,000", color: "#10b981" },
    { name: "Flutterwave", value: 300, revenue: "₦67,500,000", color: "#6366f1" },
    { name: "Bank Transfer", value: 100, revenue: "₦22,500,000", color: "#f43f5e" },
  ],
  recentTransactions: [
    {
      id: "TRX-001",
      date: "2025-04-01",
      customer: "John Smith",
      ticketType: "VIP",
      amount: "₦675,000",
      status: "Completed",
      paymentMethod: "Paystack",
    },
    {
      id: "TRX-002",
      date: "2025-04-01",
      customer: "Sarah Johnson",
      ticketType: "Regular",
      amount: "₦375,000",
      status: "Completed",
      paymentMethod: "Flutterwave",
    },
    {
      id: "TRX-003",
      date: "2025-03-31",
      customer: "Michael Chen",
      ticketType: "Regular",
      amount: "₦375,000",
      status: "Completed",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "TRX-004",
      date: "2025-03-30",
      customer: "Emma Davis",
      ticketType: "Early Bird",
      amount: "₦225,000",
      status: "Refunded",
      paymentMethod: "Paystack",
    },
    {
      id: "TRX-005",
      date: "2025-03-30",
      customer: "David Wilson",
      ticketType: "VIP",
      amount: "₦675,000",
      status: "Completed",
      paymentMethod: "Flutterwave",
    },
  ],
}

export default function SalesReportPage({ params }: { params: { id: string } }) {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [ticketTypeFilter, setTicketTypeFilter] = useState("all")
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("all")

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
          <h1 className="text-2xl font-bold tracking-tight">Sales Report</h1>
          <p className="text-muted-foreground">View and analyze ticket sales for this event</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Total Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salesData.summary.totalRevenue}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Tickets Sold</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salesData.summary.ticketsSold}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Average Price</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salesData.summary.averageTicketPrice}</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Refunds</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salesData.summary.refunds}</div>
            <p className="text-xs text-muted-foreground">{salesData.summary.refundAmount}</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-semibold">Sales Analysis</h2>
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <DatePicker date={dateRange} setDate={setDateRange} />
            </div>
            <Select value={ticketTypeFilter} onValueChange={setTicketTypeFilter}>
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
            <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="Paystack">Paystack</SelectItem>
                <SelectItem value="Flutterwave">Flutterwave</SelectItem>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="by-ticket">By Ticket Type</TabsTrigger>
            <TabsTrigger value="by-date">By Date</TabsTrigger>
            <TabsTrigger value="by-payment">By Payment Method</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="md:col-span-4">
                <CardHeader>
                  <CardTitle>Revenue Over Time</CardTitle>
                </CardHeader>
                <CardContent className="px-2">
                  <Chart>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart
                        data={salesData.byDate}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="date"
                          tickFormatter={(value) =>
                            new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric" })
                          }
                        />
                        <YAxis
                          tickFormatter={(value) =>
                            new Intl.NumberFormat("en-NG", {
                              style: "currency",
                              currency: "NGN",
                              notation: "compact",
                              maximumFractionDigits: 1,
                            }).format(value)
                          }
                        />
                        <Tooltip
                          formatter={(value: number) =>
                            new Intl.NumberFormat("en-NG", {
                              style: "currency",
                              currency: "NGN",
                            }).format(value)
                          }
                          labelFormatter={(value) => new Date(value).toLocaleDateString()}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Chart>
                </CardContent>
              </Card>
              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle>Sales by Ticket Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <Chart>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={salesData.byTicketType}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {salesData.byTicketType.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => [value, "Tickets Sold"]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Chart>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Recent ticket purchases and refunds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {salesData.recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{transaction.customer}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()} via {transaction.paymentMethod}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">{transaction.amount}</div>
                      <Badge variant={transaction.status === "Completed" ? "outline" : "destructive"} className="ml-4">
                        {transaction.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="by-ticket" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales by Ticket Type</CardTitle>
                <CardDescription>Breakdown of ticket sales by type</CardDescription>
              </CardHeader>
              <CardContent>
                <Chart>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={salesData.byTicketType}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Tickets Sold" fill="#8884d8">
                        {salesData.byTicketType.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Chart>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              {salesData.byTicketType.map((ticket, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{ticket.name}</CardTitle>
                    <CardDescription>Ticket Type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{ticket.value}</div>
                    <p className="text-xs text-muted-foreground">Tickets Sold</p>
                    <Separator className="my-2" />
                    <div className="text-lg font-semibold">{ticket.revenue}</div>
                    <p className="text-xs text-muted-foreground">Revenue</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="by-date" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales by Date</CardTitle>
                <CardDescription>Daily ticket sales and revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <Chart>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={salesData.byDate}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(value) =>
                          new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric" })
                        }
                      />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke="#82ca9d"
                        tickFormatter={(value) =>
                          new Intl.NumberFormat("en-NG", {
                            style: "currency",
                            currency: "NGN",
                            notation: "compact",
                            maximumFractionDigits: 1,
                          }).format(value)
                        }
                      />
                      <Tooltip
                        formatter={(value, name) => {
                          if (name === "revenue") {
                            return [
                              new Intl.NumberFormat("en-NG", {
                                style: "currency",
                                currency: "NGN",
                              }).format(value as number),
                              "Revenue",
                            ]
                          }
                          return [value, "Tickets"]
                        }}
                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                      />
                      <Legend />
                      <Bar dataKey="tickets" name="Tickets Sold" fill="#8884d8" yAxisId="left" />
                      <Bar dataKey="revenue" name="Revenue" fill="#82ca9d" yAxisId="right" />
                    </BarChart>
                  </ResponsiveContainer>
                </Chart>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="by-payment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales by Payment Method</CardTitle>
                <CardDescription>Breakdown of sales by payment provider</CardDescription>
              </CardHeader>
              <CardContent>
                <Chart>
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={salesData.byPaymentMethod}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {salesData.byPaymentMethod.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [value, "Tickets Sold"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Chart>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              {salesData.byPaymentMethod.map((method, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{method.name}</CardTitle>
                    <CardDescription>Payment Method</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{method.value}</div>
                    <p className="text-xs text-muted-foreground">Transactions</p>
                    <Separator className="my-2" />
                    <div className="text-lg font-semibold">{method.revenue}</div>
                    <p className="text-xs text-muted-foreground">Revenue</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
