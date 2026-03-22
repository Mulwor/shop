'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'О нас', href: '/about' },
  { name: 'Доставка и оплата', href: '/delivery' },
  { name: 'Контакты', href: '/contact' },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <ul className="main list">
      {navigation.map((item) => {
        const isActive = pathname === item.href

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`${
                isActive
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {item.name}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
