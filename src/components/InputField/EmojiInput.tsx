/* eslint-disable prettier/prettier */
import React, { useRef, useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../../context/Provider';
import Picker from 'emoji-picker-react';
import './InputField.scss';
import { t } from 'i18next';

function useOutsideAlerter(ref: any, setOpen: Function) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        // eslint-disable-next-line no-undef
        setOpen(!open)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

interface EmojiInputProps {
  text: string,
  setText: Function,
  mode?: string,
  inputStyle?: any,
}

const EmojiInput = ({ text, setText, mode, inputStyle }: EmojiInputProps) => {
  const [open, setOpen] = useState(false)
  const [chosenEmoji, setChosenEmoji] = useState<{ emoji?: any }>()
  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef, setOpen)

  const globalStore: any = useContext(GlobalContext)

  useEffect(() => {
    if (chosenEmoji) {
      const newText = text + ' ' + chosenEmoji.emoji
      setText(newText)
    }
  }, [chosenEmoji])

  const onEmojiClick = (event: any, emojiObject: { emoji?: any }) => {
    // eslint-disable-next-line no-unused-expressions
    event
    setChosenEmoji(emojiObject)
  }

  return (
    <div className='emoji-input'>
      <input
        className='postComment'
        style={
          mode === 'replyMode' || mode === 'editMode'
            ? globalStore.replyInputStyle
            : globalStore.inputStyle || inputStyle
        }
        placeholder={t('general:reply')}
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className='emoji-icon' onClick={() => setOpen(!open)} />
      {open ? (
        <div ref={wrapperRef}>
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      ) : null}
    </div>
  )
}

export default EmojiInput
