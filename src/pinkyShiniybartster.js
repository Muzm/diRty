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
  }
}