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
           for (let i = 0; i < 40; i++) {
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

    // Переменная для контроля FPS
    let lastTime = 0
    const targetFPS = 30
    const frameInterval = 1000 / targetFPS

    // Анимация
    const animate = (currentTime: number) => {
      // Ограничиваем FPS для лучшей производительности
      if (currentTime - lastTime < frameInterval) {
        animationId = requestAnimationFrame(animate)
        return
      }
      lastTime = currentTime

      // Очистка
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Градиентный фон (рисуем только если изменился размер)
      if (!canvas.dataset.gradientCached) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop(0, 'rgba(15, 23, 42, 0.4)')
        gradient.addColorStop(0.5, 'rgba(30, 41, 59, 0.2)')
        gradient.addColorStop(1, 'rgba(15, 23, 42, 0.4)')
        
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        canvas.dataset.gradientCached = 'true'
      }

      // Обновление и отрисовка частиц
      particles.forEach((particle, index) => {
        // Обновление позиции
        particle.x += particle.vx
        particle.y += particle.vy

        // Отскок от краёв
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Упрощенная пульсация
        const pulse = Math.sin(currentTime * 0.0005 + index) * 0.3 + 0.7
        const currentSize = particle.size * pulse

        // Упрощенная отрисовка частицы
        ctx.globalAlpha = particle.opacity * 0.6
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2)
        ctx.fill()
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

      // Дополнительный орб для плотности в хедере (только один)
      // Орб 7 - в верхней части
      const orb7X = canvas.width * 0.7 + Math.sin(time * 0.9) * 20
      const orb7Y = canvas.height * 0.15 + Math.cos(time * 0.8) * 18
      const orb7Gradient = ctx.createRadialGradient(orb7X, orb7Y, 0, orb7X, orb7Y, 85)
      orb7Gradient.addColorStop(0, 'rgba(59, 130, 246, 0.08)')
      orb7Gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.03)')
      orb7Gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = orb7Gradient
      ctx.beginPath()
      ctx.arc(orb7X, orb7Y, 85, 0, Math.PI * 2)
      ctx.fill()

      animationId = requestAnimationFrame(animate)
    }

    // Debounced resize function
    let resizeTimeout: NodeJS.Timeout
    const debouncedResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        resizeCanvas()
        canvas.dataset.gradientCached = '' // Сброс кэша градиента
      }, 100)
    }

    init()
    window.addEventListener('resize', debouncedResize)

    return () => {
      cancelAnimationFrame(animationId)
      clearTimeout(resizeTimeout)
      window.removeEventListener('resize', debouncedResize)
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