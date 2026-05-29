"use client"

import { useEffect, useState } from "react"
import { testimonials } from "@/lib/site-config"

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [])

  const item = testimonials[index]

  return (
    <section className="mt-16">
      <h2 className="text-center text-2xl font-semibold text-white sm:text-3xl">What people say</h2>
      <div className="glass relative mx-auto mt-6 max-w-2xl rounded-2xl p-6 sm:p-8">
        <div key={item.name} className="testimonial-fade text-center">
          <p className="text-base leading-8 text-slate-200 sm:text-lg">&ldquo;{item.quote}&rdquo;</p>
          <p className="mt-4 text-sm font-medium text-cyan-200">— {item.name}</p>
        </div>
        <div className="mt-5 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-label={`Show testimonial from ${t.name}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-7 bg-cyan-300" : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
