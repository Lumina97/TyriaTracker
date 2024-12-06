import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/TradingPost')({
  component: () => <div>Hello /TradingPost!</div>,
})
