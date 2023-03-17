import HeaderDiv from './Header';

function Error() {
    return (
        <div className='text-center m-5'>
            <p className='display-4'>The page does not exists.</p>
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