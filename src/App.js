import React, { useRef, useEffect } from 'react'
import { animated, useSpring } from 'react-spring'
import { useGesture } from 'react-use-gesture'

import './card.css'

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 10,
  (x - window.innerWidth / 2) / 10,
  1.1,
]

const trans = (rx, ry, rs) => [
  'perspective(600px)',
  `rotateX(${rx}deg)`,
  `rotateY(${ry}deg)`,
  `scale(${rs})`,
].join(' ')

function App() {
  const cardRef = useRef()

  const [{ rxrys }, set] = useSpring(() => ({
    rxrys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }))

  const bind = useGesture(
    {
      onMove: ({ xy }) => set({ rxrys: calc(...xy) }),
      onHover: ({ hovering }) => !hovering && set({ rxrys: [0, 0, 1] }),
    },
    {
      domTarget: cardRef,
    },
  )

  useEffect(bind, [bind])

  return (
    <animated.div
      ref={cardRef}
      className="card"
      style={{ transform: rxrys.interpolate(trans) }}
    />
  )
}

export default App
