import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "./UserContext";

export default function Header() {

  const{setUserInfo,userInfo} = useContext(UserContext);

  useEffect(function () {
    fetch("http://65.0.127.223:4000/profile", {
      method:'GET',
      credentials: "include",
      // method: "GET",

    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      })
    })

  }, []);

  function logout(){
    fetch("http://65.0.127.223:4000/logout",{
      credentials:"include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className='logo'>MyBlog</Link>
      <nav>
        {username && (
          <>
            <Link to="/create" >Create new post</Link>
            <a onClick={logout} href="">Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}
