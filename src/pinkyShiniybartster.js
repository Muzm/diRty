import React from 'react';

export default {
  requstErrorHandle: (error, setter) => {
    if(error.code === "ECONNABORTED") {
      console.log('timeout');
      setter({
        timeout: true
      });
    } else {
      console.log(error);// qnother errors
      setter({
        error: true
      });
    }
  },
  statusVisible(timeout, error, goodStatus) {
    if(timeout) {
      return <h2 className='italic'>Request timeout, maybe try later</h2>;
    } else if (error) {
      return <h2 className='italic'>Request Error</h2>;
    } else {
      return goodStatus;
    }
  }
}