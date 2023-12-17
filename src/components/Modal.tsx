import { IoIosClose } from "react-icons/io";

interface ModalProps {
    isvisible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className: string
  }

function Modal({ isvisible, onClose, children }: ModalProps) {
    if (!isvisible) return null
    
    const handleClose = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.id === 'wrapper') onClose()
    }
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-5 backdrop-blur-sm
        flex justify-center items-center z-50" id="wrapper" onClick={ handleClose }>
            <div className="w-[600px] flex flex-col ">
                <button className="text-blue-gray-700 text-xl place-self-end" onClick={() => onClose()}><IoIosClose size={20} /></button>
                <div className="bg-white rounded p-8 border-[1px] border-[#C0C0C0] flex justify-center shadow-2xl">{children}</div>
            </div>
        </div>
    )
}

export default Modal