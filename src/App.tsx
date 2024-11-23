import { useState } from 'react'

import Home from './Home'
import Scene from './Scene'

import scenes from './scenes'

const initialSceneId = window.location.pathname.replace(/^\/scene\//, '') || ''

function App() {
  const [sceneId, setSceneId] = useState(initialSceneId)
  const scene = scenes.find(scene => scene.id === sceneId)

  const loadScene = (id: string) => {
    window.history.pushState({}, '', `/scene/${id}`);
    setSceneId(id)
  }

  const handleUnlock = () => {
    if (scene?.lock) loadScene(scene.lock.opens)
  }

  const handleExit = (nextSceneId: string) => {
    loadScene(nextSceneId)
  }

  if (!scene) {
    return <Home onBegin={() => loadScene(scenes[0].id)} />
  } else {
    return <Scene scene={scene} onUnlock={handleUnlock} onExit={handleExit} />
  }
}

export default App
