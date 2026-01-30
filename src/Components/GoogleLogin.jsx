import { use, useEffect } from 'react';
import  api  from '../API/Axios/customAxios';
import { useSignInGoogle } from '../hook/reactQueryFetch';
import { useContextModal } from '../Context-API/ContextModal';

function GoogleLogin() {

  const {data, isLoading, refetch, isError, isSuccess, response} = useSignInGoogle();
  const {openModal, closeModal, setBannerShow, banner} = useContextModal();

  useEffect(() => {
    window.google.accounts.id.renderButton(
      document.getElementById('google-btn'),
      { theme: 'outline', size: 'large', shape: 'pill' }
    );
    return () => {google.accounts.id.disableAutoSelect()}
  }, []);

  useEffect(() => {
    if(isSuccess && data){
      setBannerShow(1);
      openModal();
    }else if(isError && response){
      setBannerShow(2);
      //openModal();
    }
  }, [isSuccess, isError]);
  

  return (
      <div className='flex justify-center mt-4'>
        <div id="google-btn"></div>
      </div>
  )
}

export default GoogleLogin;