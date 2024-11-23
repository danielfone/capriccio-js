import scenes from './scenes.json'
import { files } from './fileData'

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

scenes.forEach((scene: IScene) => {
  if (scene.file && files[scene.file]) {
    scene.file = files[scene.file]
  }
})

export default scenes as IScene[]
