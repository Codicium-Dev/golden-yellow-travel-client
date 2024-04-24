"use client"

import React from 'react'
import type { RootState } from '@/services/lib/store';
import { useSelector, useDispatch } from "react-redux";
import { ModalOpen, ModalClose } from '@/services/redux/reducer/modalSlice';

function ModalComponent({ modalName } : { modalName : undefined | string }) {

    const modal = useSelector((state : RootState) => state.modal.isOpen);
    const dispatch = useDispatch();

    const handleMouseEnter = () => {
      
      dispatch(ModalOpen());
      
    }
  
    const handleMouseOut = () => {
  
      dispatch(ModalClose())
  
    }

  return (
    <>
    
        {
            modal && (
                <div 
                onMouseEnter={handleMouseEnter}
                onMouseOut={handleMouseOut}
                className={` ${modal && 'custom-animate-modal'} shadow-xl rounded-xl w-auto h-[300px] p-5 bg-slate-50 absolute z-50 -bottom-[500px]`}
                >
                    Hello {modalName} Modal
                </div>
            )
        }

    </>
  )
}

export default ModalComponent