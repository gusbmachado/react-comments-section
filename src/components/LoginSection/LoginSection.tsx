import React from 'react'
import './LoginSection.scss'

interface LoginSectionProps {
  loginLink: string
  signUpLink: string
}

const LoginSection = ({ loginLink, signUpLink }: LoginSectionProps) => {
  return (
    <div className='signBox'>
      <div className='signLine'>Faça login ou cadastre-se para deixar um comentário</div>
      <div>
        <a href={loginLink}>
          <button className='loginBtn' name='login'>
            Login
          </button>
        </a>
        <a href={signUpLink}>
          <button className='signBtn' name='signup'>
            Registre-se
          </button>
        </a>
      </div>
    </div>
  )
}

export default LoginSection
