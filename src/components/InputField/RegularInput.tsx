/* eslint-disable prettier/prettier */
import React, { useContext }  from 'react';
import './InputField.scss';
import { GlobalContext } from '../../context/Provider';
import EmojiInput from './EmojiInput';
import { t } from 'i18next';

interface RegularInputProps {
  formStyle?: any,
  comId?: string,
  mode?: string,
  customImg?: string,
  inputStyle?: any,
  cancelBtnStyle?: any,
  submitBtnStyle?: any,
  imgStyle?: any,
  imgDiv?: any,
  handleSubmit: Function,
  text: string,
  setText: Function,
}

const RegularInput = ({
  formStyle,
  imgDiv,
  imgStyle,
  customImg,
  mode,
  inputStyle,
  cancelBtnStyle,
  comId,
  submitBtnStyle,
  handleSubmit,
  text,
  setText
}: RegularInputProps) => {
  const globalStore: any = useContext(GlobalContext)

  return (
    <form
      className='form'
      style={globalStore.formStyle || formStyle}
      onSubmit={() => handleSubmit}
    >
      <div className='userImg' style={imgDiv}>
        <a
          target='_blank'
          href={globalStore.currentUserData.currentUserProfile} rel="noreferrer"
        >
          <img
            src={
              globalStore.customImg ||
              customImg ||
              globalStore.currentUserData.currentUserImg
            }
            style={globalStore.imgStyle || imgStyle}
            alt='userIcon'
            className='imgdefault'
          />
        </a>
      </div>
      {globalStore.removeEmoji ? (
        <input
          className='postComment'
          style={
            mode === 'replyMode' || mode === 'editMode'
              ? globalStore.replyInputStyle
              : globalStore.inputStyle || inputStyle
          }
          type='text'
          placeholder={t('general:reply')}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <EmojiInput
          text={text}
          setText={setText}
          mode={mode}
          inputStyle={inputStyle}
        />
      )}

      {mode && (
        <button
          className='cancelBtn'
          style={globalStore.cancelBtnStyle || cancelBtnStyle}
          type='button'
          onClick={() =>
            mode === 'editMode'
              ? globalStore.handleAction(comId, true)
              : globalStore.handleAction(comId, false)
          }
        >
          {t('general:cancel')}
        </button>
      )}
      <button
        className='postBtn'
        type='submit'
        disabled={text === ''}
        style={globalStore.submitBtnStyle || submitBtnStyle}
        onClick={(e) => (text ? handleSubmit(e) : null)}
      >
        {t('general:post')}
      </button>
    </form>
  )
}

export default RegularInput
