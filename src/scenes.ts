import level1 from './scenes/level-01.yml'
import level2 from './scenes/level-02.yml'
import level3 from './scenes/level-03.yml'
import level4 from './scenes/level-04.yml'
import level5 from './scenes/level-05.yml'
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

const scenes = [] as IScene[]
scenes.push(...level1)
scenes.push(...level2)
scenes.push(...level3)
scenes.push(...level4)
scenes.push(...level5)

scenes.forEach((scene) => {
  if (scene.file && files[scene.file]) {
    scene.file = files[scene.file]
  }
})

export default scenes as IScene[]
