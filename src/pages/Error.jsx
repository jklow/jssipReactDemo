import HeaderDiv from './Header';

function Error() {
    return (
        <div className='text-center m-5'>
            <p className='display-4'>The page requested does not exist.<br/> Access /chat for messaging, /call for voice call and /video for video call demo</p>
        </div>
    )
}

function ErrorPage() {
    return (
        <div>
            <HeaderDiv />
            <Error />
        </div>
    )
}

export default ErrorPage;