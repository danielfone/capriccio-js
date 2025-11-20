import Markdown from 'react-markdown'

import { IScene } from './scenes'
import Lock from './Lock'
import useLocalStorage from './useLocalStorage';

function Scene({ scene, className, onUnlock, onExit }: {
  scene: IScene,
  className: string,
  onUnlock: () => void,
  onExit: (nextSceneId: string) => void
}) {
  const lock = scene.lock;
  const [isUnlocked, setIsUnlocked] = useLocalStorage(`scene-unlocked-${scene.id}`, false);

  const handleExitClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const path = event.currentTarget.pathname;
    const id = path.substring(path.lastIndexOf('/') + 1);

    event.preventDefault();
    onExit(id);
  }

  const handleUnlock = () => {
    setIsUnlocked(true);
    onUnlock(); // Proceed to the next scene
  };

  return (
    <div className={className}>
      <h1>{scene.name}</h1>

      {scene.file && <textarea readOnly cols={60} rows={20} value={scene.file}></textarea>}

      {isUnlocked && scene.unlocked ? (
        <Markdown>{scene.unlocked}</Markdown>
      ) : (
        <>
          <Markdown>{scene.description}</Markdown>
          {lock && <Lock lock={lock} onUnlock={handleUnlock} />}
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
