import { useState } from 'react' 
import LiveMap from './components/MapMarker'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="w-[50vw] h-[100vh] bg-amber-300">
         <LiveMap className='h-[100vh]'/>
      </div> 
    </>
  )
}

export default App
