import { useState, useContext } from 'react'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import { GlobalContext } from '../../context/Provider'
import React from 'react'

interface DeleteModalProps {
  comId: string
  parentId?: string
}

const DeleteModal = ({ comId, parentId }: DeleteModalProps) => {
  const [open, setOpen] = useState(false)
  const onOpenModal = () => setOpen(true)
  const onCloseModal = () => setOpen(false)
  const globalStore: any = useContext(GlobalContext)

  return (
    <div>
      <div style={{ width: '100%' }} onClick={onOpenModal}>
        Remover
      </div>
      <Modal open={open} onClose={onCloseModal} center>
      <h2>Tem certeza?</h2>
        <p>Depois de remover este comentário, ele estará perdido para sempre.</p>
        <div className='deleteBtns'>
          <button
            className='delete'
            onClick={async () => (
              await globalStore.onDelete(comId, parentId),
              globalStore.onDeleteAction &&
                (await globalStore.onDeleteAction({
                  comIdToDelete: comId,
                  parentOfDeleteId: parentId
                }))
            )}
          >
            Remover
          </button>
          <button className='cancel' onClick={onCloseModal}>
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default DeleteModal
