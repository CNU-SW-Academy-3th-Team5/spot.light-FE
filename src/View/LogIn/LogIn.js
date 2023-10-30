import React, { useState } from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import styles from "./LogIn.module.css";
import { Link } from "react-router-dom";
import axios from 'axios';

export function LogIn(){
    const [formData, setFormData] = useState({
      userEmail: '',
      userPassword: '',
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:8080/api/auth/logIn', {
            userEmail: formData.userEmail,
            userPassword: formData.userPassword
      });
      } catch (error) {
        console.error('로그인 실패:', error.response.data);
      }
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Log In</title>
                </Helmet>
            </HelmetProvider>
            <div className={styles.title}>Spot.light</div>
            <div className={styles.form}>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p className={styles.loginText}>email</p>
                        <input type="email" className={styles.login} name="userEmail" onChange={handleChange}/>
                    </label>
                    <label>
                        <p className={styles.loginText}>password</p>
                        <input type="password" className={styles.login} name="userPassword" onChange={handleChange}/>
                    </label>
                    <br/><br/>
                    <button type="submit" className={styles.logInButton}>로그인</button>
                </form>
            </div>
            <div className={styles.way}>
                <div><Link to="/findid">아이디 찾기</Link></div>
                <div><Link to="/findpassword">비밀번호 찾기</Link></div>
                <div><Link to="/signup">회원가입</Link></div>
            </div>
            <div className={styles.lineContainer}>
                <div className={styles.line}></div>
                <div className={styles.or}>or</div>
                <div className={styles.line}></div>
            </div>
        </>
    );
}