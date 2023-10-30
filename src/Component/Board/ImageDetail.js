import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MyImage from './test2.jpg'
import styles from './ImageDetail.module.css';

export function ImageDetail({ savePath }) {
    const [user, setUser] = useState([]);
    const [islike, setIslike] = useState(false);
    const [isBookmarked, setBookmarked] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/user')
        .then((response) => {
            const userData = response.data;
            setUser(userData);
        })
        .catch((error) => {
            console.error('API 호출 중 오류 발생:', error);
        });
    }, []);

    const toggleBookmark = () => {
        setBookmarked(!isBookmarked);
    };

    const fetchLikeStatus = () => {
        // 서버에서 islike 값을 가져오는 API 호출
        axios.get('http://localhost:8080/api/v1/like')
          .then((response) => {
            setIslike(response.data);
          })
          .catch((error) => {
            console.error('API 호출 중 오류 발생:', error);
          });
      };
    
    const toggleLike = () => {
        // 서버에서 islike 값을 토글하는 API 호출
        axios.post('http://localhost:8080/api/v1/like')
          .then((response) => {
            setIslike(response.data);
          })
          .catch((error) => {
            console.error('API 호출 중 오류 발생:', error);
          });
    };
    
    useEffect(() => {
        fetchLikeStatus(); // 컴포넌트가 마운트될 때 최초 호출
    }, []);

    return (
        <div>
            <div>
                <ArrowBackIosNewOutlinedIcon />
            </div>
            <div>
                <ul className={styles.ul}>
                    {user.map((user, index) => (
                    <li className={styles.li} key={index}>
                        <p className={styles.name}>{user.userName}</p>
                        <p className={styles.email}>{user.userEmail}</p>
                    </li>
                    ))}
                </ul>
            </div>
            <div className={styles.imageContainer}>
                <img className={styles.responsiveImage} src={MyImage} />
            </div>
            <div>
                <button className={styles.likeButton} onClick={toggleLike}>
                    {islike ? <LightbulbIcon className={styles.largeIcon}/> : <LightbulbOutlinedIcon className={styles.largeIcon}/>}
                </button>
                < ChatBubbleOutlineOutlinedIcon />
                <button className={styles.bookmarkButton} onClick={toggleBookmark}>
                    {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                </button>
            </div>
        </div>
    );
}