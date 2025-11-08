import React from 'react'
import styled from 'styled-components'

const PaymentIndividual = () => {
  return (
    <Pay>
      <article>
        <div className="header">

        </div>
        
      </article>
    </Pay>
  )
}

export default PaymentIndividual

const Pay = styled.div`
width: 100%;
height: 100vh;
background: yellow;
display: flex;
justify-content: center;

article{
width: 90%;
height: 100%;
background: blue;

.header{
width: 100%;
height: 10%;
background: green;
}
}
`