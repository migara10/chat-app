import React, { useState } from 'react';
import Login from './Login/Login';
import Register from './Register/Register';

function Home() {

  const [isLogin, setIsLogin] = useState(true);

  const changeIsLogin = () => {
    setIsLogin(!isLogin)
  }
  
  return (
    <div>
      {isLogin && <Login handleLogin={changeIsLogin} />}
      {!isLogin && <Register handleLogin={changeIsLogin} />}
    </div>
  )
}

export default Home