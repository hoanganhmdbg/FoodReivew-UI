
import NavBar from '../Navbar/navbar';
import '../Layout/mainLayout.css';
export default function MainLayOut(props) {
    return (
        <div className='mainLayout'>
            <NavBar></NavBar>
            <div className='mainLayout-content mt-2'>
                {props.children}
            </div>
        </div>
    )
}