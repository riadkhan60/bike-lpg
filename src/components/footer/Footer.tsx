import React from 'react'
import FooterElements from './FooterElements'
import AuthButton from '../authentication/AuthButton'

export default function Footer() {
  return (
    <FooterElements authButton={<AuthButton />}/>
  )
}
