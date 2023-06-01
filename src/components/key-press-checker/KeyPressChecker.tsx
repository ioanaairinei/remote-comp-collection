import { useCallback, useEffect, useState } from 'react'
import { KEYBOARD_KEYS } from './keys-data'
import './key-press-checker.less'

const Keyboard = () => {
  const [wiggleKey, setWiggleKey] = useState<string>('')
  const [keyboardKeys] = useState<string[]>(KEYBOARD_KEYS)

  useEffect(() => {
    setRandomKey()
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => handleKeyPress(e)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [wiggleKey])

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault()

      if (event.key.toString().toLowerCase() === wiggleKey.toLowerCase()) {
        setRandomKey()
      }
    },
    [wiggleKey],
  )

  const setRandomKey = () => {
    const index = Math.floor(Math.random() * (KEYBOARD_KEYS.length - 1))
    const key = keyboardKeys[index]

    if (key) {
      setWiggleKey(key)
    }
  }

  return (
    <div className='keyboard'>
      <h1>Eyes on the Screen</h1>
      <div className='row'>
        {keyboardKeys.slice(0, 14).map((key) => (
          <button className={`key ${key === wiggleKey ? 'jiggle' : ''}`} key={key}>
            {key}
          </button>
        ))}
      </div>
      <div className='row'>
        {keyboardKeys.slice(14, 28).map((key) => (
          <button className={`key ${key === wiggleKey ? 'jiggle' : ''}`} data-key={key} key={key}>
            {key}
          </button>
        ))}
      </div>
      <div className='row'>
        {keyboardKeys.slice(28, 41).map((key) => (
          <button className={`key ${key === wiggleKey ? 'jiggle' : ''}`} data-key={key} key={key}>
            {key}
          </button>
        ))}
      </div>
      <div className='row'>
        {keyboardKeys.slice(41, keyboardKeys.length).map((key, index) => (
          <button
            className={`key ${key === wiggleKey ? 'jiggle' : ''}`}
            data-key={key}
            key={key + index}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Keyboard
