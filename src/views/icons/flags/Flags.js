import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

const CoreUIIcons = () => {
  const eventos = [
    {
      pkcodevento: 1,
      titulo: 'evento',
      descricao: 'descdo',
      localizacao: 'Taquara',
      datahora: '24/10/2021, 22:12',
      inicio: '24/10/2021 20:50',
      termino: '24/10/2021 20:55',
      imagem:
        'http://s2.glbimg.com/z_gIOSUdsxyNGClgVLYVBHBziyw=/0x0:400x400/400x400/s.glbimg.com/po/tt2/f/original/2016/05/20/new-google-favicon-logo.png',
      categoria: 'TESTE2',
      criador: 1,
      ativo: true,
    },
    {
      pkcodevento: 1,
      titulo: 'evento',
      descricao: 'descdo',
      localizacao: 'Taquara',
      datahora: '24/10/2021, 22:12',
      inicio: '24/10/2021 20:50',
      termino: '24/10/2021 20:55',
      imagem:
        'http://s2.glbimg.com/z_gIOSUdsxyNGClgVLYVBHBziyw=/0x0:400x400/400x400/s.glbimg.com/po/tt2/f/original/2016/05/20/new-google-favicon-logo.png',
      categoria: 'TESTE2',
      criador: 1,
      ativo: true,
    },
  ]

  return (
    <CCard className="mb-4">
      <CCardHeader>Eventos</CCardHeader>
      <CCardBody>
        <CRow className="text-center">
          {eventos.map((item) => (
            <CCol className="mb-5" xs={6} sm={4} md={3} xl={2} key={item}>
              <div>
                `pkcodevento: ${item.pkcodevento}``titulo: ${item.titulo}``descricao: $
                {item.descricao}``localizacao: ${item.localizacao}``datahora: ${item.datahora}
                ``inicio: ${item.inicio}``termino: ${item.termino}``imagem: ${item.imagem}
                ``categoria: ${item.categoria}``criador: ${item.criador}``ativo: ${item.ativo}`
              </div>
            </CCol>
          ))}
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default CoreUIIcons
