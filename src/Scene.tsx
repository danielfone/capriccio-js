import Markdown from 'react-markdown'

import { IScene } from './scenes'
import Lock from './Lock'

function Scene({ scene, onUnlock, onExit }: {
  scene: IScene,
  onUnlock: () => void,
  onExit: (nextSceneId: string) => void
}) {

  const lock = scene.lock;
  const isUnlocked = false

  const handleExitClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const path = event.currentTarget.pathname;
    const id = path.substring(path.lastIndexOf('/') + 1);

    event.preventDefault();
    onExit(id);
  }

  return (
    <div>
      <h1>{scene.name}</h1>

      {scene.file && <textarea readOnly cols={60} rows={20} >{btoa(scene.file)}</textarea>}

      {isUnlocked && scene.unlocked ? (
        <Markdown>{scene.unlocked}</Markdown>
      ) : (
        <>
          <Markdown>{scene.description}</Markdown>
          {lock && <Lock lock={lock} onUnlock={onUnlock} />}
        </>
      )}

      {Object.entries(scene.exits).map(([scene_id, direction]) => (
        <p key={scene_id}>
          <a href={`/scene/${scene_id}`} onClick={handleExitClick}>{direction}</a>
        </p>
      ))}
    </div>
  );
}

export default Scene
