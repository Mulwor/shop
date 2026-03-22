import Image from 'next/image'
import './Header.css'

export function DeliveryBadge() {
  return (
    <div className="delivery">
      <div className="delivery-wrapper">
        <Image src="/delivery.svg" alt="Delivery" width={25} height={25} />
        <p>Доставка проводится</p>
      </div>

      <p style={{ color: 'green' }}>ежедневно с 10:00 до 22:00</p>
    </div>
  )
}
