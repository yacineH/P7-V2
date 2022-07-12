import React from 'react'
import Pagintation from '@material-ui/lab/Pagination'

const PaginComp = ({ setPage, page, totalPages }) => {
  const handleChange = (event, value) => {
    setPage(value)
    window.scroll(0, 0)
  }

  return (
    <>
      <div style={{ marginTop: '45px' }}>
        <Pagintation
          onChange={handleChange}
          style={{ display: 'flex', justifyContent: 'center' }}
          variant="outlined"
          page={page}
          count={totalPages}
        />
      </div>
    </>
  )
}

export default PaginComp
