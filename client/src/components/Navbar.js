import React,{useContext} from 'react'
import {UserContext} from '../App'
import {Link, useHistory} from 'react-router-dom'

const NavBar = ()=>{
    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
    const renderList = ()=>{
        if (state){
            return [
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/create">Create Post</Link></li>,
                <li>
                <button className="btn waves-effect waves-light #c62828 red darken-3"
                onClick = {()=>{
                    localStorage.clear()
                    dispatch({type:"CLEAR"})
                    history.push('/signin')
                }}
                >
                    Logout
                </button>
                </li>

            ]
        }else{
            return [
                <li><Link to="/signin">Signin</Link></li>,
                <li><Link to="/signup">Signup</Link></li>
            ]
        }
    }
    return(
        <nav>
            <div className="nav-wrapper white">
            <Link to={state?"/":"/signin"} className="brand-logo left">InstaClone</Link>
            <ul id="nav-mobile" className="right">
                {renderList()}

            </ul>
            </div>
        </nav>
    )
}

export default NavBar;