import React from 'react';

const Message = ({ msg, variant }) => {
   return (
      <div
         className={
            variant === 'error'
               ? 'error-msg'
               : variant === 'success'
               ? 'success-msg'
               : 'null-error'
         }
      >
         <p>{msg}</p>
      </div>
   );
};

export default Message;
