import waveTone from '../data/tone.wav?base64'
import pngTone from "../data/tone.png?base64"

export const files = {
  "tone.wav": waveTone,
  "tone.png": pngTone
} as Record<string, string>
