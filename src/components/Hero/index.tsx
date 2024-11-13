"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, ChevronDown } from "lucide-react"


export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

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

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 pt-20 pb-8 md:pt-28 md:pb-16 lg:pt-32 lg:pb-24">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="mb-6 text-4xl font-extrabold leading-tight text-black sm:text-5xl lg:text-6xl max-w-4xl mx-auto">
            Automate Trading Strategy and <span className="text-white">Maximize Profits</span>
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-black/80 font-medium sm:text-xl">
            Copy expert trading strategies effortlessly and grow your portfolio with confidence. Our platform is simple to use, requires no trading experience, and connects you with top-performing traders for maximum profit potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            {/* <Link
              href="https://www.binance.com/en/copy-trading/lead-details/4174913719175507969?ref=76333389"
              target="_blank" // Add this attribute
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 px-8 py-3 text-center text-lg font-semibold text-white shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
              >
              Start Copy Trading <ArrowRight className="ml-2 h-4 w-4" />
            </Link> */}
            {/* <Link
              href="#learn-more"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-transparent border-2 border-white text-white font-semibold text-lg hover:bg-white/10 transition-colors duration-300"
            >
              Learn More <ChevronDown className="ml-2 h-4 w-4" />
            </Link> */}
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl mt-12 mb-16">
          <div className="transition-transform duration-300 hover:scale-105 shadow-2xl rounded-xl overflow-hidden">
            {/* Removed Image component */}
            <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
              2017.1 ~ 2024.9
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="mb-4 text-lg font-medium text-white">
            Crypto build is now available for
          </p>
          <div className="flex justify-center items-center gap-6">
            {/* <Image
              src="/images/binance/binance.svg"
              alt="Binance Logo"
              width={48}
              height={48}
              className="transition-transform duration-300 hover:scale-110"
            /> */}
          </div>
        </div>

      </div>
    </section>
  )
}
