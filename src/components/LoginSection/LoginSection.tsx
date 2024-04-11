/* eslint-disable prettier/prettier */
import React from 'react';
import './LoginSection.scss';
import { t } from 'i18next';

interface LoginSectionProps {
  loginLink: string,
  signUpLink: string,
}

const LoginSection = ({ loginLink, signUpLink }: LoginSectionProps) => {
  return (
    <div className='signBox'>
      <div className='signLine'>{t('general:log')}</div>
      <div>
        <a href={loginLink}>
          <button className='loginBtn' name='login'>
            {t('general:login')}
          </button>
        </a>
        {signUpLink !== '' && (
          <a href={signUpLink}>
            <button className='signBtn' name='signup'>
              {t('general:signup')}
            </button>
          </a>
        )}
      </div>
    </div>
  )
}

export default LoginSection
