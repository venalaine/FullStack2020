import React from 'react'
import styled from 'styled-components'

const FooterDiv = styled.div`
padding: 2em;
background: Gainsboro;
`

const Footer = () => {
  return (
    <FooterDiv>
      <b>Bloglist application created by E. Venäläinen</b>
    </FooterDiv>
  )
}

export default Footer