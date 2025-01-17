import React from 'react'

const RequestToast = ({mess, status}) => {

  if (!mess) return null;
  return (
    <div><div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>{status} successfully.</span>
        </div>
      </div></div>
  )
}

export default RequestToast;