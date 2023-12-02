import styled from 'styled-components'

import { formatCurrency } from '../../utils/helpers'

import CreateCabinForm from './CreateCabinForm'
import { useState } from 'react'
import { useDeleteCabin } from './useDeleteCabin'

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`

function CabinRow({ cabin }) {
  const [showEditForm, setShowEditForm] = useState(false)
  const { isDeleting, deleteCabin } = useDeleteCabin()
  return (
    <>
      <TableRow>
        <Img src={cabin.image} alt={cabin.name} />
        <Cabin>{cabin.name}</Cabin>
        <div>Fits up to {cabin.maxCapacity}</div>
        <Price>{formatCurrency(cabin.regularPrice)}</Price>
        {cabin.discount ? (
          <Discount>{formatCurrency(cabin.discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button onClick={() => setShowEditForm((show) => !show)}>EDIT</button>
          <button onClick={() => deleteCabin(cabin.id)} disabled={isDeleting}>
            DELETE
          </button>
        </div>
      </TableRow>
      {showEditForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  )
}

export default CabinRow
