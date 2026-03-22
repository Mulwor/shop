'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Navigation } from './Navigation'
import { DeliveryBadge } from './DeliveryBadge'
import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <nav className="wrapper">
        <div className="main">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/" className="text-xl font-bold">
              <Image
                src="/svezhie_logo.svg"
                alt="Логотип компании фруктов и овощей"
                width={100}
                height={100}
                priority
              />
            </Link>

            <DeliveryBadge />
          </div>

          <Navigation />
        </div>
      </nav>
    </header>
  )
}
