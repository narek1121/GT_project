import React from 'react'
import { styled } from '@stitches/react'

const Title = styled('h1', {
  fontSize: '2rem',
  fontWeight: 700,
  marginBottom: '1rem',
})

const Text = styled('p', {
  lineHeight: 1.6,
})

const Home: React.FC = () => (
  <div className="space-y-4">
    <Title>Welcome to GameTrack!</Title>
    <Text>
      Отслеживайте ваши игры, достижения и коллекции с удобным интерфейсом и адаптивным дизайном.
    </Text>
  </div>
)

export default Home;