import HeaderDiv from './Header';
import NavBar from './NavBar';

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
            <NavBar />
            <Error />
        </div>
    )
}

export default ErrorPage;