import { useState } from 'react';
import { ILock } from './scenes'

// This function normalizes a string by converting it to lowercase and removing
// all non-alphanumeric characters.
//
// Example: normalize("Hello, World!") => "helloworld"
const normalize = (str: string) => str.toLowerCase().replace(/[^a-z1-9]/g, '');

function answerMatches(actual: string, expected: string): boolean {
  return normalize(actual) === normalize(expected);
}

function Lock({ lock, onUnlock }: {
  lock: ILock,
  onUnlock: () => void
}) {
  const [error, setError] = useState<string | undefined>();
  const [hint, setHint] = useState<number>(0);
  const hasHint = hint < lock.hints.length;
  const hintText = hint > 0 && lock.hints && lock.hints[hint - 1];


  const tryLock = (event: React.FormEvent) => {
    event.preventDefault();

    const key = (event.target as HTMLFormElement).key.value;
    if (answerMatches(key, lock.answer)) {
      onUnlock();
    } else {
      // Pick a random error message
      const randomError = lock.errors && lock.errors[Math.floor(Math.random() * lock.errors.length)];
      setError(randomError || "Incorrect. Try again.");
    }
  }

  return <>
    <p>{lock.prompt}</p>
    <form onSubmit={tryLock}>
      <input type="text" name="key" />
      <input type="submit" value="Unlock" />
    </form>
    {error && <p className="error">{error}</p>}
    {hintText && <p className="hint">{hintText}</p>}
    {hasHint && <p><a href="#" onClick={() => setHint(hint + 1)}>Hint {hint + 1}</a></p>}
  </>
}

export default Lock
