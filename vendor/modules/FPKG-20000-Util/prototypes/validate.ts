const validate = () => {
  setTimeout(() => {
    const isError: any = document.getElementsByClassName('is-error');
    isError[0].querySelector('input').focus();
  }, 100);
};
export default validate;
