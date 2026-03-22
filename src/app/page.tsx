'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const MapComponent = dynamic(() => import('../components/map/MapComponent'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: '500px',
        background: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
      }}
    >
      Загрузка карты...
    </div>
  ),
})

export default function Home() {
  const [isMapApiReady, setIsMapApiReady] = useState(false)
  const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY

  useEffect(() => {
    // Функция проверки готовности API
    const checkYmapsReady = () => {
      if (window.ymaps3) {
        setIsMapApiReady(true)
        return true
      }
      return false
    }

    // Если API уже загружен
    if (checkYmapsReady()) {
      return
    }

    // Проверяем, существует ли уже скрипт
    const existingScript = document.querySelector(
      'script[src*="api-maps.yandex.ru/v3"]',
    )

    if (existingScript) {
      // Если скрипт уже есть, ждем его загрузки
      const interval = setInterval(() => {
        if (checkYmapsReady()) {
          clearInterval(interval)
        }
      }, 100)

      return () => clearInterval(interval)
    }

    // Загружаем скрипт
    const script = document.createElement('script')
    script.src = `https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=ru_RU`
    script.async = true
    script.defer = true

    script.onload = () => {
      // Проверяем готовность API каждые 100 мс
      const interval = setInterval(() => {
        if (checkYmapsReady()) {
          clearInterval(interval)
        }
      }, 100)

      // Таймаут на случай, если API не загрузится
      setTimeout(() => {
        clearInterval(interval)
        if (!window.ymaps3) {
          console.error('API Яндекс.Карт не загрузился в течение 10 секунд')
        }
      }, 10000)
    }

    script.onerror = (e) => {
      console.error('Ошибка загрузки API Яндекс.Карт:', e)
    }

    document.head.appendChild(script)

    return () => {
      // Не удаляем скрипт, так как он может использоваться на других страницах
    }
  }, [apiKey])

  return (
    <main style={{ padding: '20px' }}>
      <h1>Карта доставки</h1>
      {isMapApiReady ? (
        <MapComponent />
      ) : (
        <div
          style={{
            height: '500px',
            background: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            fontSize: '16px',
            color: '#666',
          }}
        >
          Подготовка карты...
        </div>
      )}
    </main>
  )
}
