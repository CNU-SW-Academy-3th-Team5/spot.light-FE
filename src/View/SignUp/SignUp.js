import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import styles from './SignUp.module.css';
import axios from 'axios';

export function SignUp() {
  const [formData, setFormData] = useState({
    userEmail: '',
    userPassword: '',
    userPasswordCheck: '',
    userName: '',
    userNickname: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signUp', {
        userEmail: formData.userEmail,
        userPassword: formData.userPassword,
        userPasswordCheck: formData.userPasswordCheck,
        userName: formData.userName,
        userNickname: formData.userNickname
      });
      console.log('회원가입 성공:', response.data);
    } catch (error) {
      console.error('회원가입 실패:', error.response.data);
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Sign Up</title>
        </Helmet>
      </HelmetProvider>
      <div className={styles.title}>회원가입</div>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <label>
            <p className={styles.signUpText}>name</p>
            <input type="text" id="signupName" className={styles.signUp} name="userName" onChange={handleChange} />
          </label>
          <label>
            <p className={styles.signUpText}>email</p>
            <input type="email" id="signupEmail" className={styles.signUp} name="userEmail" onChange={handleChange} />
          </label>
          <label>
            <p className={styles.signUpText}>password</p>
            <input type="password" id="signupPassword" className={styles.signUp} name="userPassword" onChange={handleChange} />
          </label>
          <label>
            <p className={styles.signUpText}>password check</p>
            <input type="password" id="signupPasswordCheck" className={styles.signUp} name="userPasswordCheck" onChange={handleChange} />
          </label>
          <label>
            <p className={styles.signUpText}>nickname</p>
            <input type="text" id="signupNickName" className={styles.signUp} name="userNickname" onChange={handleChange} />
          </label>
          <br />
          <button className={styles.signUpButton} type="submit">회원가입</button>
        </form>
      </div>
    </>
  );
}
