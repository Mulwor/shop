'use client'

import { useEffect, useRef } from 'react'
import { plesetskayaLocation } from '../../address'

const MapComponent = () => {
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    let isMounted = true

    const initMap = () => {
      if (!isMounted) return

      // Проверяем, что ymaps загружен
      if (!window.ymaps) {
        console.error('ymaps не загружен')
        return
      }

      const DELIVERY_RADIUS = 1000 // 3 км в метрах

      // Создаем карту
      const map = new window.ymaps.Map(mapContainerRef.current, {
        center: [plesetskayaLocation[1], plesetskayaLocation[0]], // [широта, долгота]
        zoom: 13,
        controls: ['zoomControl', 'fullscreenControl'],
      })

      // ========== СОЗДАЕМ ЗЕЛЕНЫЙ КРУГ (ЗОНА ДОСТАВКИ) ==========
      const deliveryCircle = new window.ymaps.Circle(
        [
          [plesetskayaLocation[1], plesetskayaLocation[0]], // центр круга
          DELIVERY_RADIUS, // радиус в метрах
        ],
        {
          hintContent: 'Зона доставки 1 км',
          balloonContent: '🚚 Доставка доступна в радиусе 1 км от Плесецкой 14',
        },
        {
          fillColor: 'rgba(76, 175, 80, 0.25)', // Зеленый с прозрачностью 25%
          strokeColor: '#2e7d32', // Темно-зеленый контур
          strokeWidth: 3,
          strokeOpacity: 0.8,
          draggable: false,
          hasHint: true,
          hasBalloon: true,
        },
      )

      // ========== СОЗДАЕМ КРАСНУЮ МЕТКУ (Плесецкая 14) ==========
      const marker = new window.ymaps.Placemark(
        [plesetskayaLocation[1], plesetskayaLocation[0]],
        {
          hintContent: 'Плесецкая ул., 14',
          balloonContent: '📍 Плесецкая ул., 14<br/>🚚 Зона доставки: 3 км',
        },
        {
          preset: 'islands#redCircleIcon',
          iconColor: '#ff4444',
        },
      )

      // Добавляем объекты на карту
      map.geoObjects.add(deliveryCircle)
      map.geoObjects.add(marker)

      // Обработчик клика на метку
      marker.events.add('click', () => {
        marker.balloon.open()
      })

      mapRef.current = map
      console.log('Карта успешно создана')
    }

    // Загружаем API Яндекс.Карт
    const loadYandexMaps = () => {
      // Если уже загружен, сразу инициализируем
      if (window.ymaps) {
        window.ymaps.ready(initMap)
        return
      }

      // Создаем скрипт для загрузки API
      const script = document.createElement('script')
      script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU'
      script.async = true

      script.onload = () => {
        // Ждем, пока ymaps станет доступен
        if (window.ymaps) {
          window.ymaps.ready(initMap)
        } else {
          console.error('ymaps не загрузился')
        }
      }

      script.onerror = () => {
        console.error('Ошибка загрузки Яндекс.Карт API')
      }

      document.head.appendChild(script)
    }

    loadYandexMaps()

    // Очистка при размонтировании
    return () => {
      isMounted = false
      if (mapRef.current) {
        mapRef.current.destroy?.()
      }
    }
  }, [])

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: '100%',
        height: '500px',
        position: 'relative',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    />
  )
}

export default MapComponent
