import React from 'react'

function Modal({ onClose, title, children }) {
    return (
        <div className="modal overflow-y-auto show">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="font-medium text-base mr-auto">{title}</h2>
                    </div>


                    <div className="modal-footer">
                        <button type="button" data-tw-dismiss="modal" className="btn btn-outline-secondary w-20 mr-1">Cancel</button>
                        <button type="button" className="btn btn-primary w-20">Send</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Modal