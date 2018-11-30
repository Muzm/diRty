import React from 'react';

export default {
  requstErrorHandle: (error, setter) => {
    if(error.code === "ECONNABORTED") {
      setter({
        errorType: 1
      });
    } else {
      console.log(error);// qnother errors
      setter({
        errorType: 3
      });
    }
  },
  statusVisible(errorType, goodStatus) {
    if(errorType === 1) {
      return <h2 className='italic'>Request timeout, maybe try later</h2>;
    } else if(errorType === 2) {
      return <h2 className='italic'>Error</h2>;
    } else if (errorType === 3) {
      return <h2 className='italic'>Request Error</h2>;
    } else {
      return goodStatus;
    }
  }
}