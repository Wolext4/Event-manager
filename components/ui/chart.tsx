"use client"

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"

interface ChartProps {
  type: "bar" | "line" | "pie" | "doughnut" | "area"
  data: {
    labels: string[]
    datasets: {
      label?: string
      data: number[]
      backgroundColor?: string | string[]
      borderColor?: string | string[]
      borderWidth?: number
      fill?: string
    }[]
  }
  options?: {
    responsive?: boolean
    maintainAspectRatio?: boolean
    indexAxis?: "x" | "y"
    scales?: {
      x?: {
        beginAtZero?: boolean
        title?: {
          display?: boolean
          text?: string
        }
      }
      y?: {
        beginAtZero?: boolean
        title?: {
          display?: boolean
          text?: string
        }
      }
    }
    plugins?: {
      legend?: {
        position?: "top" | "left" | "bottom" | "right"
      }
    }
  }
}

export function Chart({ type, data, options }: ChartProps) {
  // Transform the data to the format expected by Recharts
  const transformedData = data.labels.map((label, index) => {
    const dataPoint: Record<string, any> = { name: label }

    data.datasets.forEach((dataset, datasetIndex) => {
      const key = dataset.label || `dataset${datasetIndex}`
      dataPoint[key] = dataset.data[index]
    })

    return dataPoint
  })

  // Generate colors for pie/doughnut charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]
  const getColor = (index: number) => {
    if (Array.isArray(data.datasets[0].backgroundColor)) {
      return data.datasets[0].backgroundColor[index % data.datasets[0].backgroundColor.length]
    }
    return COLORS[index % COLORS.length]
  }

  // Determine chart height
  const height = options?.maintainAspectRatio === false ? "100%" : 300

  switch (type) {
    case "bar":
      return (
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={transformedData} layout={options?.indexAxis === "y" ? "vertical" : "horizontal"}>
            <CartesianGrid strokeDasharray="3 3" />
            {options?.indexAxis === "y" ? (
              <>
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
              </>
            ) : (
              <>
                <XAxis dataKey="name" />
                <YAxis />
              </>
            )}
            <Tooltip />
            <Legend />
            {data.datasets.map((dataset, index) => (
              <Bar
                key={index}
                dataKey={dataset.label || `dataset${index}`}
                fill={typeof dataset.backgroundColor === "string" ? dataset.backgroundColor : "#8884d8"}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      )

    case "line":
      return (
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={transformedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {data.datasets.map((dataset, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={dataset.label || `dataset${index}`}
                stroke={typeof dataset.borderColor === "string" ? dataset.borderColor : "#8884d8"}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )

    case "area":
      return (
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={transformedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {data.datasets.map((dataset, index) => (
              <Area
                key={index}
                type="monotone"
                dataKey={dataset.label || `dataset${index}`}
                stroke={typeof dataset.borderColor === "string" ? dataset.borderColor : "#8884d8"}
                fill={typeof dataset.backgroundColor === "string" ? dataset.backgroundColor : "#8884d8"}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      )

    case "pie":
    case "doughnut":
      return (
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Tooltip />
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align={options?.plugins?.legend?.position === "left" ? "left" : "right"}
            />
            <Pie
              data={transformedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              innerRadius={type === "doughnut" ? 60 : 0}
              fill="#8884d8"
              dataKey={data.datasets[0].label || "dataset0"}
              nameKey="name"
            >
              {transformedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(index)} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      )

    default:
      return <div>Unsupported chart type</div>
  }
}
