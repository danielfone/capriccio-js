import scenes from './scenes.json'
import waveTone from "../data/tone.wav?raw"
import pngTone from "../data/tone.png?raw"

export interface IScene {
  id: string
  name?: string
  description: string
  file?: string
  lock?: ILock
  unlocked?: string
  exits: Record<string, string | undefined>
}

export interface ILock {
  prompt: string
  answer: string
  opens: string
  errors?: string[]
  hints: string[]
}

const files = {
  "data/tone.wave": waveTone,
  "data/tone.png": pngTone
} as Record<string, string>

scenes.forEach((scene: IScene) => {
  if (scene.file && files[scene.file]) scene.file = btoa(files[scene.file])
})

export default scenes as IScene[]
