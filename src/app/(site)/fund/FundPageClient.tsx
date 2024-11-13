"use client"

import Image from "next/image"
import { ArrowRight, BarChart2, Shield, TrendingUp, DollarSign, Users, Zap } from "lucide-react"
import { useState, useRef, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const performanceData = [
  { quarter: '2017Q1', profit: 74.62 },
  { quarter: '2017Q2', profit: 833.72 },
  { quarter: '2017Q3', profit: 1341.98 },
  { quarter: '2017Q4', profit: 6101.64 },
  { quarter: '2018Q1', profit: 8946.16 },
  { quarter: '2018Q2', profit: 13916.34 },
  { quarter: '2018Q3', profit: 16496.21 },
  { quarter: '2018Q4', profit: 32361.19 },
  { quarter: '2019Q1', profit: 135993.41 },
  { quarter: '2019Q2', profit: 371309.09 },
  { quarter: '2019Q3', profit: 387925.00 },
  { quarter: '2019Q4', profit: 447098.00 },
  { quarter: '2020Q1', profit: 657025.37 },
  { quarter: '2020Q2', profit: 740033.06 },
  { quarter: '2020Q3', profit: 2141435.47 },
  { quarter: '2020Q4', profit: 6070692.43 },
  { quarter: '2021Q1', profit: 6948734.53 },
  { quarter: '2021Q2', profit: 6744869.80 },
  { quarter: '2021Q3', profit: 7336314.06 },
  { quarter: '2021Q4', profit: 11388403.18 },
  { quarter: '2022Q1', profit: 11582789.82 },
  { quarter: '2022Q2', profit: 13587505.63 },
  { quarter: '2022Q3', profit: 14270962.81 },
  { quarter: '2022Q4', profit: 14950659.40 },
  { quarter: '2023Q1', profit: 50039930.47 },
  { quarter: '2023Q2', profit: 61827984.18 },
  { quarter: '2023Q3', profit: 56699972.29 },
  { quarter: '2023Q4', profit: 58907993.16 },
  { quarter: '2024Q1', profit: 193011400.77 },
  { quarter: '2024Q2', profit: 196017790.61 },
  { quarter: '2024Q3', profit: 244092712.91 },
  { quarter: '2024Q4', profit: 230124684.32 }
]

export default function FundPageClient() {
  const [activeTab, setActiveTab] = useState("overview")
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const circles: { x: number; y: number; radius: number; dx: number; dy: number }[] = []

    for (let i = 0; i < 20; i++) {
      circles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 50 + 10,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
      })
    }

    function animate() {
      if (!canvas) return // Add this null check
      ctx!.clearRect(0, 0, canvas.width, canvas.height)

      circles.forEach((circle) => {
        ctx!.beginPath()
        ctx!.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2)
        ctx!.fillStyle = "rgba(255, 255, 255, 0.1)"
        ctx!.fill()

        if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0) {
          circle.dx = -circle.dx
        }
        if (circle.y + circle.radius > canvas.height || circle.y - circle.radius < 0) {
          circle.dy = -circle.dy
        }

        circle.x += circle.dx
        circle.y += circle.dy
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <main className="relative min-h-screen bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 pt-32 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />
      <div className="relative z-10">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-center text-black">
              Invest in the Future of Finance
            </h1>
            <p className="text-xl text-black text-center">
              Our cryptocurrency fund leverages advanced strategies to maximize returns while minimizing risks in the
              volatile crypto market.
            </p>
            <div className="flex justify-center">
              <Button size="lg" asChild className="bg-black text-yellow-400 hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <a
                  href="https://www.binance.com/en/copy-trading/lead-details/4174913719175507969?timeRange=7D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  Start Copy Trading
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-1">
              <TabsTrigger value="overview" className="text-black data-[state=active]:bg-white data-[state=active]:text-yellow-600">Overview</TabsTrigger>
              <TabsTrigger value="performance" className="text-black data-[state=active]:bg-white data-[state=active]:text-yellow-600">Performance</TabsTrigger>
              <TabsTrigger value="strategy" className="text-black data-[state=active]:bg-white data-[state=active]:text-yellow-600">Strategy</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-8">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard icon={TrendingUp} title="Annual Returns" value="524.76%" description="Average annual returns since inception" />
                <StatCard icon={Shield} title="Maximum Drawdown" value="27~35%" description="Potential maximum drawdown range" />
                <StatCard icon={DollarSign} title="Max Leverage" value="7X" description="Maximum leverage allowed" />
              </div>
            </TabsContent>
            <TabsContent value="performance" className="mt-8">
              <Card className="bg-white bg-opacity-90 backdrop-blur-lg shadow-xl">
                <CardHeader>
                  <CardTitle className="text-black">Fund Performance</CardTitle>
                  <CardDescription className="text-gray-600">Quarter profits over the past years</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="quarter" stroke="#718096" />
                      <Tooltip contentStyle={{ backgroundColor: 'white', border: 'none' }} />
                      <Line type="monotone" dataKey="profit" stroke="#d97706" strokeWidth={2} dot={{ fill: '#d97706' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="strategy" className="mt-8">
              <div className="flex justify-center">
                <Image
                  src="/images/hero/hero-image.jpg"
                  alt="Backtesting Strategy"
                  width={800}
                  height={600}
                  className="rounded-lg shadow-2xl border-4 border-white"
                />
              </div>
              <div className="mt-8 text-center">
                <h3 className="text-2xl font-bold text-black">Trend Follow Algorithm</h3>
                <Card className="mt-4 bg-white bg-opacity-90 backdrop-blur-lg shadow-xl">
                  <CardContent className="p-6">
                    <p className="text-gray-700">
                      Our strategy involves taking both long and short positions in Bitcoin and Ethereum to capitalize on market trends. By following these trends, we aim to maximize returns while effectively managing risks.

                      <br />
                      If you had bought and held Bitcoin from 2017 to 2024, your profit would have been 6710.51%, with a maximum drawdown of 83.40%. Our fund aims to maximize profit while reducing drawdown.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white bg-opacity-90 backdrop-blur-lg shadow-2xl">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-4 text-black">Ready to Invest?</h2>
                <p className="mb-6 text-gray-700">Join thousands of investors and start growing your wealth with our cryptocurrency fund.</p>
                <Button variant="secondary" size="lg" asChild className="bg-black text-yellow-400 hover:bg-gray-800 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  <a
                    href="https://www.binance.com/en/copy-trading/lead-details/4174913719175507969?timeRange=7D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    Get Started Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <footer className="container mx-auto px-4 py-8 text-center text-black">
          <p className="font-bold">Caution: Max drawdown can be above 35%.</p>
          <p className="mt-2">Past performance does not guarantee future results. Invest responsibly.</p>
        </footer>
      </div>
    </main>
  )
}

function StatCard({ icon: Icon, title, value, description }: { icon: any; title: string; value: string; description: string }) {
  return (
    <Card className="bg-white bg-opacity-90 backdrop-blur-lg shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-black">
          <Icon className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-black">{value}</p>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
