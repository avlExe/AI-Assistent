'use client'

import { useEffect, useRef } from 'react'

export default function ThreeDHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number

    // Установка размера canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Инициализация
    const init = () => {
      resizeCanvas()
      animate()
    }

    // Простые частицы
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
    }> = []

    // Создание частиц
           for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.8 + 0.4,
        color: ['#3b82f6', '#8b5cf6', '#06b6d4', '#ec4899'][Math.floor(Math.random() * 4)]
      })
    }

    // Анимация
    const animate = () => {
      // Очистка
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Градиентный фон
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.4)') // Более прозрачный
      gradient.addColorStop(0.5, 'rgba(30, 41, 59, 0.2)') // Более прозрачный
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0.4)') // Более прозрачный
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Обновление и отрисовка частиц
      particles.forEach((particle, index) => {
        // Обновление позиции
        particle.x += particle.vx
        particle.y += particle.vy

        // Отскок от краёв
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Пульсация размера
        const pulse = Math.sin(Date.now() * 0.001 + index) * 0.5 + 1
        const currentSize = particle.size * pulse

        // Отрисовка частицы
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = particle.color
        
        // Создание градиента для частицы
        const particleGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, currentSize * 2
        )
        particleGradient.addColorStop(0, particle.color)
        particleGradient.addColorStop(1, 'transparent')
        
        ctx.fillStyle = particleGradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, currentSize * 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })


      // Большие светящиеся орбы
      const time = Date.now() * 0.001

      // Орб 1
      const orb1X = canvas.width * 0.2 + Math.sin(time * 0.3) * 30
      const orb1Y = canvas.height * 0.3 + Math.cos(time * 0.2) * 20
      const orb1Gradient = ctx.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, 150)
      orb1Gradient.addColorStop(0, 'rgba(59, 130, 246, 0.25)')
      orb1Gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.1)')
      orb1Gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = orb1Gradient
      ctx.beginPath()
      ctx.arc(orb1X, orb1Y, 150, 0, Math.PI * 2)
      ctx.fill()

      // Орб 2
      const orb2X = canvas.width * 0.8 + Math.sin(time * 0.4) * 25
      const orb2Y = canvas.height * 0.7 + Math.cos(time * 0.3) * 15
      const orb2Gradient = ctx.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, 120)
      orb2Gradient.addColorStop(0, 'rgba(139, 92, 246, 0.2)')
      orb2Gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.08)')
      orb2Gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = orb2Gradient
      ctx.beginPath()
      ctx.arc(orb2X, orb2Y, 120, 0, Math.PI * 2)
      ctx.fill()

      // Орб 3
      const orb3X = canvas.width * 0.5 + Math.sin(time * 0.5) * 20
      const orb3Y = canvas.height * 0.5 + Math.cos(time * 0.4) * 25
      const orb3Gradient = ctx.createRadialGradient(orb3X, orb3Y, 0, orb3X, orb3Y, 100)
      orb3Gradient.addColorStop(0, 'rgba(6, 182, 212, 0.15)')
      orb3Gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.06)')
      orb3Gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = orb3Gradient
      ctx.beginPath()
      ctx.arc(orb3X, orb3Y, 100, 0, Math.PI * 2)
      ctx.fill()

      // Дополнительные орбы для плотности
      // Орб 4
      const orb4X = canvas.width * 0.1 + Math.sin(time * 0.6) * 15
      const orb4Y = canvas.height * 0.8 + Math.cos(time * 0.5) * 20
      const orb4Gradient = ctx.createRadialGradient(orb4X, orb4Y, 0, orb4X, orb4Y, 80)
      orb4Gradient.addColorStop(0, 'rgba(236, 72, 153, 0.12)')
      orb4Gradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.05)')
      orb4Gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = orb4Gradient
      ctx.beginPath()
      ctx.arc(orb4X, orb4Y, 80, 0, Math.PI * 2)
      ctx.fill()

      // Орб 5
      const orb5X = canvas.width * 0.9 + Math.sin(time * 0.7) * 18
      const orb5Y = canvas.height * 0.2 + Math.cos(time * 0.6) * 22
      const orb5Gradient = ctx.createRadialGradient(orb5X, orb5Y, 0, orb5X, orb5Y, 90)
      orb5Gradient.addColorStop(0, 'rgba(34, 197, 94, 0.1)')
      orb5Gradient.addColorStop(0.5, 'rgba(34, 197, 94, 0.04)')
      orb5Gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = orb5Gradient
      ctx.beginPath()
      ctx.arc(orb5X, orb5Y, 90, 0, Math.PI * 2)
      ctx.fill()

      // Орб 6
      const orb6X = canvas.width * 0.3 + Math.sin(time * 0.8) * 25
      const orb6Y = canvas.height * 0.1 + Math.cos(time * 0.7) * 15
      const orb6Gradient = ctx.createRadialGradient(orb6X, orb6Y, 0, orb6X, orb6Y, 70)
      orb6Gradient.addColorStop(0, 'rgba(168, 85, 247, 0.08)')
      orb6Gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.03)')
      orb6Gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = orb6Gradient
      ctx.beginPath()
      ctx.arc(orb6X, orb6Y, 70, 0, Math.PI * 2)
      ctx.fill()

      // Дополнительные орбы для плотности в хедере
      // Орб 7 - в верхней части
      const orb7X = canvas.width * 0.7 + Math.sin(time * 0.9) * 20
      const orb7Y = canvas.height * 0.15 + Math.cos(time * 0.8) * 18
      const orb7Gradient = ctx.createRadialGradient(orb7X, orb7Y, 0, orb7X, orb7Y, 85)
      orb7Gradient.addColorStop(0, 'rgba(59, 130, 246, 0.12)')
      orb7Gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.05)')
      orb7Gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = orb7Gradient
      ctx.beginPath()
      ctx.arc(orb7X, orb7Y, 85, 0, Math.PI * 2)
      ctx.fill()

      // Орб 8 - в верхней части
      const orb8X = canvas.width * 0.15 + Math.sin(time * 1.0) * 22
      const orb8Y = canvas.height * 0.25 + Math.cos(time * 0.9) * 16
      const orb8Gradient = ctx.createRadialGradient(orb8X, orb8Y, 0, orb8X, orb8Y, 75)
      orb8Gradient.addColorStop(0, 'rgba(139, 92, 246, 0.1)')
      orb8Gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.04)')
      orb8Gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = orb8Gradient
      ctx.beginPath()
      ctx.arc(orb8X, orb8Y, 75, 0, Math.PI * 2)
      ctx.fill()

      // Орб 9 - в верхней части
      const orb9X = canvas.width * 0.85 + Math.sin(time * 1.1) * 19
      const orb9Y = canvas.height * 0.35 + Math.cos(time * 1.0) * 14
      const orb9Gradient = ctx.createRadialGradient(orb9X, orb9Y, 0, orb9X, orb9Y, 65)
      orb9Gradient.addColorStop(0, 'rgba(6, 182, 212, 0.08)')
      orb9Gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.03)')
      orb9Gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = orb9Gradient
      ctx.beginPath()
      ctx.arc(orb9X, orb9Y, 65, 0, Math.PI * 2)
      ctx.fill()

      animationId = requestAnimationFrame(animate)
    }

    init()
    window.addEventListener('resize', resizeCanvas)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: -1 }}
    />
  )
}