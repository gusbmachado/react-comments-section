/* eslint-disable prettier/prettier */
import React, { useState, useContext } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { GlobalContext } from '../../context/Provider';
import { useTranslation } from 'react-i18next';

interface DeleteModalProps {
  comId: string,
  parentId?: string,
}

const DeleteModal = ({ comId, parentId }: DeleteModalProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false)
  const onOpenModal = () => setOpen(true)
  const onCloseModal = () => setOpen(false)
  const globalStore: any = useContext(GlobalContext)

  return (
    <div>
      <div style={{ width: '100%' }} onClick={onOpenModal}>
        {t('alerts:delete')}
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <h2>{t('alerts:alert')}</h2>
        <p>{t('alerts:message')}</p>
        <div className='deleteBtns'>
          <button
            className='delete'
            onClick={async () => (
              // eslint-disable-next-line no-sequences
              await globalStore.onDelete(comId, parentId),
              globalStore.onDeleteAction &&
                (await globalStore.onDeleteAction({
                  comIdToDelete: comId,
                  parentOfDeleteId: parentId
                }))
            )}
          >
            {t('alerts:delete')}
          </button>
          <button className='cancel' onClick={onCloseModal}>
            {t('alerts:cancel')}
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default DeleteModal
