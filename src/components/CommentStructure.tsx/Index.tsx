/* eslint-disable prettier/prettier */
import './CommentStructure.scss';
import React, { useContext } from 'react';
import { GlobalContext } from '../../context/Provider';
import InputField from '../InputField/Index';
import { Menu, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/core.css';
import DeleteModal from './DeleteModal';
import { useTranslation } from 'react-i18next';

interface CommentStructureProps {
  info: {
    userId: string,
    comId: string,
    fullName: string,
    avatarUrl: string,
    text: string,
    userProfile?: string,
    replies?: Array<any> | undefined,
  },
  editMode: boolean,
  parentId?: string,
  replyMode: boolean,
  logIn: {
    loginLink: string,
    signupLink: string,
  }
}

const CommentStructure = ({
  info,
  editMode,
  parentId,
  replyMode
}: CommentStructureProps) => {
  const globalStore: any = useContext(GlobalContext)
  const currentUser = globalStore.currentUserData
  const { t } = useTranslation();

  const optionsMenu = () => {
    return (
      <div className='userActions'>
        {info.userId === currentUser.currentUserId && (
          <Menu
            menuButton={
              <button className='actionsBtn'>
                {' '}
                <div className='optionIcon' />
              </button>
            }
          >
            <MenuItem
              onClick={() => globalStore.handleActioDeleten(info.comId, true)}
            >
              {t('alerts:edit')}
            </MenuItem>
            <MenuItem>
              <DeleteModal comId={info.comId} parentId={parentId} />
            </MenuItem>
          </Menu>
        )}
      </div>
    )
  }

  const userInfo = () => {
    return (
      <div className='commentsTwo'>
        <a className='userLink' target='_blank' href={info.userProfile} rel="noreferrer">
          <div>
            <img
              src={info.avatarUrl}
              alt='userIcon'
              className='imgdefault'
              style={
                globalStore.imgStyle ||
                (!globalStore.replyTop
                  ? { position: 'relative', top: 7 }
                  : null)
              }
            />
          </div>
          <div className='fullName'>{info.fullName} </div>
        </a>
      </div>
    )
  }

  const replyTopSection = () => {
    return (
      <div className='halfDiv'>
        <div className='userInfo'>
          <div>{info.text}</div>
          {userInfo()}
        </div>
        {currentUser && optionsMenu()}
      </div>
    )
  }

  const replyBottomSection = () => {
    return (
      <div className='halfDiv'>
        <div className='userInfo'>
          {userInfo()}
          {globalStore.advancedInput ? (
            <div
              className='infoStyle'
              dangerouslySetInnerHTML={{
                __html: info.text
              }}
            />
          ) : (
            <div className='infoStyle'>{info.text}</div>
          )}
          <div style={{ marginLeft: 32 }}>
            {' '}
            {currentUser && (
              <div>
                <button
                  className='replyBtn'
                  onClick={() => globalStore.handleAction(info.comId, false)}
                >
                  <div className='replyIcon' />
                  <span style={{ marginLeft: 17 }}>{t('alerts:reply')}</span>
                </button>
              </div>
            )}
          </div>
        </div>
        {currentUser && optionsMenu()}
      </div>
    )
  }

  const actionModeSection = (mode: string) => {
    if (mode === 'reply') {
      return (
        <div className='replysection'>
          {globalStore.replyTop ? replyTopSection() : replyBottomSection()}
          <InputField
            formStyle={{
              backgroundColor: 'transparent',
              padding: '20px 0px',
              marginLeft: '-15px'
            }}
            comId={info.comId}
            fillerText=""
            mode="replyMode"
            parentId={parentId}
          />
        </div>
      )
    } else {
      return (
        <InputField
          formStyle={{
            backgroundColor: 'transparent',
            padding: '20px 0px',
            marginLeft: '-15px'
          }}
          comId={info.comId}
          fillerText={info.text}
          mode="editMode"
          parentId={parentId}
        />
      )
    }
  }

  return (
    <div>
      {editMode
        ? actionModeSection('edit')
        : replyMode
        ? actionModeSection('reply')
        : globalStore.replyTop
        ? replyTopSection()
        : replyBottomSection()}
    </div>
  )
}

export default CommentStructure
