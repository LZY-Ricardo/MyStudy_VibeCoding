import './App.scss'
import ReactPlayground from './ReactPlayground'
import { PlaygroundProvider } from './ReactPlayground/PlaygroundContext'

export default function App() {
  return (
    <div>
      <PlaygroundProvider>
        <ReactPlayground />
      </PlaygroundProvider>
    </div>
  )
}
