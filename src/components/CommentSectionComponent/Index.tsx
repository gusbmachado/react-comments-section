/* eslint-disable prettier/prettier */
import CommentStructure from '../CommentStructure.tsx/Index';
import InputField from '../InputField/Index';
import './CommentSection.css';
import React, { useContext } from 'react';
import { GlobalContext } from '../../context/Provider';
import _ from 'lodash';
import LoginSection from '../LoginSection/LoginSection';
import NoComments from './NoComments';
import { useTranslation } from 'react-i18next';

interface CommentSectionProps {
  overlayStyle?: any,
  logIn: {
    loginLink: string,
    signupLink: string,
  },
  hrStyle?: any,
  titleStyle?: any,
  customNoComment?: Function,
}

const CommentSection = ({
  overlayStyle,
  logIn,
  hrStyle,
  titleStyle,
  customNoComment
}: CommentSectionProps) => {
  const loginMode = () => {
    return (
      <LoginSection
        loginLink={logIn?.loginLink}
        signUpLink={logIn?.signupLink}
      />
    )
  }
  const globalStore: any = useContext(GlobalContext)

  const totalComments = () => {
    let count = 0
    globalStore.data.map((i: any) => {
      count = count + 1
      i.replies.map(() => (count = count + 1))
    })
    return count
  }

  const { t } = useTranslation()

  return (
    <div className='overlay' style={overlayStyle}>
      <span className='comment-title' style={titleStyle}>
        {/* {globalStore.commentsCount || totalComments()}{' '}
        {totalComments() === 1 ? 'Comment' : 'Comments'} */}
        {t('general:comment', {
          count: globalStore.commentsCount || totalComments()
        })}
      </span>
      <hr className='hr-style' style={hrStyle} />
      {globalStore.currentUserData === null ? (
        loginMode()
      ) : (
        <InputField formStyle={{ margin: '10px 0px' }} imgDiv={{ margin: 0 }} />
      )}

      {globalStore.data.length > 0 ? (
        globalStore.data.map(
          (i: {
            userId: string,
            comId: string,
            fullName: string,
            avatarUrl: string,
            text: string,
            userProfile?: string,
            replies: Array<any> | undefined,
          }) => {
            return (
              <div key={i.comId}>
                <CommentStructure
                  info={i}
                  editMode={
                    _.indexOf(globalStore.editArr, i.comId) !== -1
                  }
                  replyMode={
                    _.indexOf(globalStore.replyArr, i.comId) !== -1
                  }
                  logIn={logIn}
                />
                {i.replies &&
                  i.replies.length > 0 &&
                  i.replies.map((j) => {
                    return (
                      <div className='replySection' key={j.comId}>
                        <CommentStructure
                          info={j}
                          parentId={i.comId}
                          editMode={
                            _.indexOf(globalStore.editArr, j.comId) !== -1
                          }
                          replyMode={
                            _.indexOf(globalStore.replyArr, j.comId) !== -1
                          }
                          logIn={logIn}
                        />
                      </div>
                    )
                  })}
              </div>
            )
          }
        )
      ) : customNoComment ? (
        customNoComment()
      ) : (
        <NoComments />
      )}
    </div>
  )
}

export default CommentSection
