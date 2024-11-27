import { useEffect, useState } from 'react'

import Home from './Home'
import Scene from './Scene'

import scenes from './scenes'

const initialSceneId = window.location.pathname.replace(/^\/scene\//, '') || ''

function App() {
  const [className, setClassName] = useState('')
  const [sceneId, setSceneId] = useState(initialSceneId)
  const scene = scenes.find(scene => scene.id === sceneId)

  // Load the scene when the URL changes
  useEffect(() => {
    window.addEventListener('popstate', () => {
      setSceneId(window.location.pathname.replace(/^\/scene\//, ''))
    })
  }, [])

  const loadScene = (id: string) => {
    window.history.pushState({}, '', `/scene/${id}`);
    if (id === 'a-hazy-return') setClassName('fade-in')
    setSceneId(id)
  }

  const handleUnlock = () => {
    if (scene?.lock) loadScene(scene.lock.opens)
  }

  const handleExit = (nextSceneId: string) => {
    if (nextSceneId == 'a-hazy-return') {
      setClassName('fade-out')
      setTimeout(() => loadScene('a-hazy-return'), 2000)
    } else {
      loadScene(nextSceneId)
    }
  }

  if (!scene) {
    return <Home onBegin={() => loadScene(scenes[0].id)} />
  } else {
    return <Scene scene={scene} onUnlock={handleUnlock} onExit={handleExit} className={className} />
  }
}

export default App
