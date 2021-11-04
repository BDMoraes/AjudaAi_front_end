import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://www.ulbra.br/canoas" target="_blank" rel="noopener noreferrer">
          ULBRA Canoas
        </a>
        <span className="ms-1">&copy; 2021 Laboratório de Criatividade e Projetos.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
