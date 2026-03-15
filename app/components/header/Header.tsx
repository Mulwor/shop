'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './Header.css'
import Delivery from '@/widgets/Delivery'

export default function Header() {
  const pathname = usePathname()

  const navigation = [
    { name: 'О нас', href: '/about' },
    { name: 'Доставка и оплата', href: '/delivery' },
    { name: 'Контакты', href: '/contact' },
  ]

  return (
    <header className="header">
      <nav className="wrapper">
        <div className="main">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/" className="text-xl font-bold">
              <Image
                src="/svezhie_logo.svg"
                alt="СВЕЖИЕ"
                width={100}
                height={100}
                priority
              />
            </Link>

            <Delivery />
          </div>

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
        </div>
      </nav>
    </header>
  )
}
