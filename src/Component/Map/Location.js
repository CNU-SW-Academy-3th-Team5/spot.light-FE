import React, {useEffect, useRef, useState} from 'react'
import {Helmet, HelmetProvider} from "react-helmet-async";
import styles from './Location.module.css';
import {LocationImage} from "./LocationImage";

export function Location({information = [], onUploadSubmit}) {
    const mapStyle = {
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        zIndex: 1
    };
    const titleStyle = {
        position: 'fixed',
        top: '8vh',
        left: '7vw',
        backgroundColor: 'transparent',
        zIndex: 2,
        fontSize: '2vh',
        fontWeight: 'bold'
    };
    const searchStyle = {
        position: 'fixed',
        top: '13vh',
        left: '50%',
        transform: 'translate(-50%)',
        zIndex: 2
    };
    const myInputStyle = {
        backgroundImage: 'url("./searchicon.png")',
        backgroundPosition: 'right 4vw center',
        backgroundRepeat: 'no-repeat',
        width: '80vw',
        height: 'auto',
        margin: 0,
        border: '1px solid #ddd',
        borderRadius: '20px',
        padding: '2vh 4vw 2vh 4vw',
        fontSize: '2vh'
    };
    const sidepanelStyle = {
        position: 'fixed',
        margin: 0,
        borderTop: '1px solid black',
        borderRadius: '20px 20px 0 0',
        padding: 0,
        width: '100vw',
        bottom: 0,
        backgroundColor: 'white',
        fontSize: '1.5em',
        lineHeight: '1.5em',
        color: 'black',
        fontFamily: 'Helvetica, serif',
        textAlign: 'center',
        zIndex: 2
    };
    const fixedContentStyle = {
        position: 'fixed',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        border: 0,
        borderRadius: '20px 20px 0 0',
        padding: '1vh 0 1vh 0',
        width: '100vw',
        height: 'auto',
        backgroundColor: 'white'
    };
    const headStyle = {
        background: 'rgb(128, 128, 128)',
        width: '12vw',
        height: '1vh',
        borderRadius: '20px'
    };
    const sentenceContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        border: 0,
        padding: '3vh 0 0 0',
        width: 'auto',
        height: 'auto',
        fontSize: '2vh',
        fontWeight: 'bold',
    };
    const imageContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 0,
        border: 0,
        padding: 0,
        width: 'auto',
        height: 'auto',
        fontSize: 0,
        lineHeight: 0,
        textAlign: 'center'
    };
    const navbarStyle = {
        position: 'fixed',
        margin: 0,
        borderTop: '1px solid black',
        padding: 0,
        width: '100vw',
        height: 'auto',
        bottom: 0,
        overflow: 'hidden',
        backgroundColor: 'white',
        zIndex: 3
    };
    const navbarUlStyle = {
        margin: 0,
        border: 0,
        padding: 0,
        listStyleType: 'none',
        overflow: 'hidden'
    };
    const navbarUlLiStyle = {
        float: 'left',
        display: 'block',
        margin: 0,
        border: 0,
        padding: '3vh 0',
        width: '25vw',
        height: 'auto',
        color: 'black',
        textAlign: 'center',
        textDecoration: 'none',
        backgroundColor: 'white',
        userSelect: 'none'
    };
    const [editStyle, setEditStyle] = useState({
        position: 'fixed',
        margin: 0,
        border: 0,
        padding: 0,
        width: '100vw',
        backgroundColor: 'white',
        zIndex: 3
    });
    const map = useRef(null);
    const markers = useRef([]);
    const clusterer = useRef(null);
    const navbar_ref = useRef();
    let isBiggestFirstAndNotTop = false;
    let touchStartY = 0;
    let deltaY = 0;
    const [isHomeButtonOwned, setIsHomeButtonOwned] = useState(true);
    const [isEditButtonOwned, setIsEditButtonOwned] = useState(false);
    const [isBookmarksButtonOwned, setIsBookmarksButtonOwned] = useState(false);
    const [isPersonButtonOwned, setIsPersonButtonOwned] = useState(false);
    const [isHomeButtonClicked, setIsHomeButtonClicked] = useState(false);
    const [isEditButtonClicked, setIsEditButtonClicked] = useState(false);
    const [isBookmarksButtonClicked, setIsBookmarksButtonClicked] = useState(false);
    const [isPersonButtonClicked, setIsPersonButtonClicked] = useState(false);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [address, setAddress] = useState('');
    const [tip, setTip] = useState('');


    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };
    const handleTipChange = (e) => {
        setTip(e.target.value);
    };

    useEffect(() => {
        function initMap() {
            if(!map.current) {
                const mapContainer = document.getElementById('map');
                const mapOption = {
                    center: new window.kakao.maps.LatLng(null, null), // 지도의 중심좌표
                    level: 3, // 지도의 확대 레벨
                };
                map.current = new window.kakao.maps.Map(mapContainer, mapOption);
            }

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    const lat = position.coords.latitude; // 위도
                    const lon = position.coords.longitude; // 경도
                    const locPosition = new window.kakao.maps.LatLng(lat, lon);
                    map.current.setCenter(locPosition);
                });
            }

            markers.current = information.map(function (position) {  // 마커를 배열 단위로 묶음
                return new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(position.latitude, position.longitude)
                });
            });

            clusterer.current = new window.kakao.maps.MarkerClusterer({
                map: map.current, // 마커들을 클러스터로 관리하고 표시할 지도 객체
                averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
                minLevel: 4 // 클러스터 할 최소 지도 레벨
            });

            clusterer.current.addMarkers(markers.current);
        }

        window.kakao.maps.load(() => initMap());

        const navbar_ref_style = window.getComputedStyle(navbar_ref.current);
        document.querySelector('#sidepanel').style.marginBottom = navbar_ref_style.getPropertyValue("height");
        document.querySelector('#sidepanel').style.height = "25vh";
        document.querySelector('#sidepanel').style.overflow = "hidden";
        const gap = window.innerHeight - parseFloat(navbar_ref_style.getPropertyValue("height"));
        const newEditStyle = {
            ...editStyle,
            height: `${gap}px`,
        };
        setEditStyle(newEditStyle);

        return () => {
            if (clusterer.current) {
                clusterer.current.removeMarkers(markers.current);
            }
        };
    }, [information, editStyle]);

    let handleSidePanelTouchStart = (event) => {
        touchStartY = event.touches[0].clientY;

        if (parseFloat(document.querySelector('#sidepanel').style.height) === 58 && document.querySelector('#sidepanel').scrollTop > 0) {
            isBiggestFirstAndNotTop = true;
        } else {
            isBiggestFirstAndNotTop = false;
        }
    };

    let handleSidePanelTouchMove = (event) => {
        if (parseFloat(document.querySelector('#sidepanel').style.height) === 58 && isBiggestFirstAndNotTop) {
            if (document.querySelector('#sidepanel').scrollTop === 0) {
                let touchCurrentY = event.touches[0].clientY;
                deltaY = touchCurrentY - touchStartY;

                if (deltaY > 0) {
                    let newHeight = parseFloat(document.querySelector('#sidepanel').style.height) - ((deltaY / window.innerHeight) * 100);

                    if (newHeight < 8) {
                        newHeight = 8;
                    }

                    document.querySelector('#sidepanel').style.height = `${newHeight}vh`;
                    document.querySelector('#sidepanel').style.overflow = "hidden";
                    isBiggestFirstAndNotTop = false;
                }

                touchStartY = touchCurrentY;
            }
        } else if (parseFloat(document.querySelector('#sidepanel').style.height) === 58 && !isBiggestFirstAndNotTop) {
            if (document.querySelector('#sidepanel').scrollTop > 0) {
                let touchCurrentY = event.touches[0].clientY;
                const scrollTop = document.querySelector('#sidepanel').scrollTop;
                deltaY = touchCurrentY - touchStartY;
                document.querySelector('#sidepanel').scrollTop = scrollTop - deltaY;
                touchStartY = touchCurrentY;
            } else if (document.querySelector('#sidepanel').scrollTop === 0) {
                let touchCurrentY = event.touches[0].clientY;
                deltaY = touchCurrentY - touchStartY;

                if (deltaY <= 0) {
                    const scrollTop = document.querySelector('#sidepanel').scrollTop;
                    document.querySelector('#sidepanel').scrollTop = scrollTop - deltaY;
                } else if (deltaY > 0) {
                    let newHeight = parseFloat(document.querySelector('#sidepanel').style.height) - ((deltaY / window.innerHeight) * 100);

                    if (newHeight < 8) {
                        newHeight = 8;
                    }

                    document.querySelector('#sidepanel').style.height = `${newHeight}vh`;
                    document.querySelector('#sidepanel').style.overflow = "hidden";
                }

                touchStartY = touchCurrentY;
            }
        } else if (parseFloat(document.querySelector('#sidepanel').style.height) >= 8 && parseFloat(document.querySelector('#sidepanel').style.height) < 58) {
            let touchCurrentY = event.touches[0].clientY;
            deltaY = touchCurrentY - touchStartY;
            let newHeight = parseFloat(document.querySelector('#sidepanel').style.height) - ((deltaY / window.innerHeight) * 100);

            if (newHeight > 58) {
                newHeight = 58;
            } else if (newHeight < 8) {
                newHeight = 8;
            }

            document.querySelector('#sidepanel').style.height = `${newHeight}vh`;

            if (parseFloat(document.querySelector('#sidepanel').style.height) === 58) {
                document.querySelector('#sidepanel').style.overflow = "scroll";
            }

            touchStartY = touchCurrentY;
        }
    };

    let handleSidePanelTouchEnd = (event) => {
        if (parseFloat(document.querySelector('#sidepanel').style.height) === 58 && document.querySelector('#sidepanel').scrollTop > 0) {
            isBiggestFirstAndNotTop = true;
        } else if (parseFloat(document.querySelector('#sidepanel').style.height) === 58 && document.querySelector('#sidepanel').scrollTop === 0) {
            isBiggestFirstAndNotTop = false;
        } else if (parseFloat(document.querySelector('#sidepanel').style.height) > 25 && parseFloat(document.querySelector('#sidepanel').style.height) < 58) {
            if (deltaY <= 0) {
                animateHeight(58);
            } else if (deltaY > 0) {
                animateHeight(25);
            }

            isBiggestFirstAndNotTop = false;
        } else if (parseFloat(document.querySelector('#sidepanel').style.height) === 25) {
            isBiggestFirstAndNotTop = false;
        } else if (parseFloat(document.querySelector('#sidepanel').style.height) > 8 && parseFloat(document.querySelector('#sidepanel').style.height) < 25) {
            if (deltaY <= 0) {
                animateHeight(25);
            } else if (deltaY > 0) {
                animateHeight(8);
            }

            isBiggestFirstAndNotTop = false;
        } else if (parseFloat(document.querySelector('#sidepanel').style.height) === 8) {
            document.querySelector('#sidepanel').style.overflow = "hidden";
            isBiggestFirstAndNotTop = false;
        }
    };

    let handleHomeButtonTouchStart = (event) => {
        document.querySelector('#home').style.backgroundColor = 'gray';
        setIsHomeButtonClicked(true);
    };

    let handleHomeButtonTouchMove = (event) => {
        if ((event.touches[0].clientX < document.querySelector('#home').getBoundingClientRect().left || event.touches[0].clientX > document.querySelector('#home').getBoundingClientRect().right) ||
            (event.touches[0].clientY < document.querySelector('#home').getBoundingClientRect().top || event.touches[0].clientY > document.querySelector('#home').getBoundingClientRect().bottom)) {
            document.querySelector('#home').style.backgroundColor = 'white';
            setIsHomeButtonClicked(false);
        }
    };

    let handleHomeButtonTouchEnd = (event) => {
        if (isHomeButtonClicked) {
            if (parseFloat(document.querySelector('#sidepanel').style.height) === 58 && document.querySelector('#sidepanel').scrollTop > 0) {
                document.querySelector('#sidepanel').scrollTop = 0;
                isBiggestFirstAndNotTop = false;
            } else if (parseFloat(document.querySelector('#sidepanel').style.height) === 8) {
                animateHeight(25);
            }

            document.querySelector('#home').style.backgroundColor = 'white';
            setIsHomeButtonClicked(false);

            if(!isHomeButtonOwned) {
                setIsHomeButtonOwned(true);
                setIsEditButtonOwned(false);
                setIsBookmarksButtonOwned(false);
                setIsPersonButtonOwned(false);
                setIsEditVisible(false);
            }
        }
    };

    let handleEditButtonTouchStart = (event) => {
        document.querySelector('#edit').style.backgroundColor = 'gray';
        setIsEditButtonClicked(true);
    };

    let handleEditButtonTouchMove = (event) => {
        if ((event.touches[0].clientX < document.querySelector('#edit').getBoundingClientRect().left || event.touches[0].clientX > document.querySelector('#edit').getBoundingClientRect().right) ||
            (event.touches[0].clientY < document.querySelector('#edit').getBoundingClientRect().top || event.touches[0].clientY > document.querySelector('#edit').getBoundingClientRect().bottom)) {
            document.querySelector('#edit').style.backgroundColor = 'white';
            setIsEditButtonClicked(false);
        }
    };

    let handleEditButtonTouchEnd = (event) => {
        if (isEditButtonClicked) {
            document.querySelector('#edit').style.backgroundColor = 'white';
            setIsEditButtonClicked(false);

            if(!isEditButtonOwned) {
                setIsHomeButtonOwned(false);
                setIsEditButtonOwned(true);
                setIsBookmarksButtonOwned(false);
                setIsPersonButtonOwned(false);
                setIsEditVisible(true);
            }
        }
    };

    let handleBookmarksButtonTouchStart = (event) => {
        document.querySelector('#bookmarks').style.backgroundColor = 'gray';
        setIsBookmarksButtonClicked(true);
    };

    let handleBookmarksButtonTouchMove = (event) => {
        if ((event.touches[0].clientX < document.querySelector('#bookmarks').getBoundingClientRect().left || event.touches[0].clientX > document.querySelector('#bookmarks').getBoundingClientRect().right) ||
            (event.touches[0].clientY < document.querySelector('#bookmarks').getBoundingClientRect().top || event.touches[0].clientY > document.querySelector('#bookmarks').getBoundingClientRect().bottom)) {
            document.querySelector('#bookmarks').style.backgroundColor = 'white';
            setIsBookmarksButtonClicked(false);
        }
    };

    let handleBookmarksButtonTouchEnd = (event) => {
        if (isBookmarksButtonClicked) {
            document.querySelector('#bookmarks').style.backgroundColor = 'white';
            setIsBookmarksButtonClicked(false);

            if(!isBookmarksButtonOwned) {
                setIsHomeButtonOwned(false);
                setIsEditButtonOwned(false);
                setIsBookmarksButtonOwned(true);
                setIsPersonButtonOwned(false);
                setIsEditVisible(false);
            }
        }
    };

    let handlePersonButtonTouchStart = (event) => {
        document.querySelector('#person').style.backgroundColor = 'gray';
        setIsPersonButtonClicked(true);
    };

    let handlePersonButtonTouchMove = (event) => {
        if ((event.touches[0].clientX < document.querySelector('#person').getBoundingClientRect().left || event.touches[0].clientX > document.querySelector('#person').getBoundingClientRect().right) ||
            (event.touches[0].clientY < document.querySelector('#person').getBoundingClientRect().top || event.touches[0].clientY > document.querySelector('#person').getBoundingClientRect().bottom)) {
            document.querySelector('#person').style.backgroundColor = 'white';
            setIsPersonButtonClicked(false);
        }
    };

    let handlePersonButtonTouchEnd = (event) => {
        if (isPersonButtonClicked) {
            document.querySelector('#person').style.backgroundColor = 'white';
            setIsPersonButtonClicked(false);

            if(!isPersonButtonOwned) {
                setIsHomeButtonOwned(false);
                setIsEditButtonOwned(false);
                setIsBookmarksButtonOwned(false);
                setIsPersonButtonOwned(true);
                setIsEditVisible(false);
            }
        }
    };

    function animateHeight(targetHeight) {
        const currentHeight = parseFloat(document.querySelector('#sidepanel').style.height);
        const duration = 500;
        const startTime = performance.now();

        function step() {
            const currentTime = performance.now();
            const elapsedTime = currentTime - startTime;
            if (elapsedTime >= duration) {
                document.querySelector('#sidepanel').style.height = `${targetHeight}vh`;
                document.querySelector('#sidepanel').style.overflow = targetHeight === 58 ? 'scroll' : 'hidden';
            } else {
                const progress = elapsedTime / duration;
                const newHeight = currentHeight + (targetHeight - currentHeight) * progress;
                document.querySelector('#sidepanel').style.height = `${newHeight}vh`;
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleUpload = (e) => {
        e.preventDefault();
      
        if (!selectedImage) {
          alert('이미지를 선택하세요.');
        } else {
          const formData = new FormData();
          formData.append('image', selectedImage);
          formData.append('address', address);
          formData.append('tip', tip);
      
          fetch('http://localhost:8080/api/v1/upload', {
            method: 'POST',
            body: formData,
          })
            .then((response) => {
              if (response.ok) {
                alert('사진이 정상적으로 업로드 되었습니다.');
                // 업로드 성공 후 추가 작업을 수행할 수 있습니다.
              } else {
                alert('업로드에 실패했습니다.');
              }
            })
            .catch((error) => {
              alert('서버 장애');
              console.error(error);
            });
        }
      };

    const handleResize = () => {
        window.location.reload();
    };

    

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>home</title>
                    <link href="https://fonts.googleapis.com/css?family=Material+Icons%7CMaterial+Icons+Outlined" rel="stylesheet" type="text/css" />
                </Helmet>
            </HelmetProvider>
            <div id="map" style={mapStyle}></div>
            <div style={titleStyle}>Spot.light</div>
            <div style={searchStyle}>
                <input type="text" style={myInputStyle} placeholder="Search for places" title="Type in a name" />
            </div>
            <div id="sidepanel" className={styles.sidepanel} style={sidepanelStyle} onTouchStart={handleSidePanelTouchStart} onTouchMove={handleSidePanelTouchMove} onTouchEnd={handleSidePanelTouchEnd}>
                <div style={fixedContentStyle}>
                    <div style={headStyle}></div>
                </div>
                <div style={sentenceContainerStyle}>이런 곳은 어떠세요?</div>
                <div style={imageContainerStyle}>
                    {information.map(v =>
                        <LocationImage {...v} key={v.savedPath}/>
                    )}
                </div>
            </div>
            <div>
                {isEditVisible && 
                    <div style={editStyle}>
                        <form encType="multipart/form-data" onSubmit={handleUpload} className={styles.formContainer}>
                            <button className={styles.submitButton} type="submit">Upload</button>
                            <br />
                            <div className={styles.fileUpload}>
                                <input type="file" onChange={handleImageChange} />
                            </div>
                            <br />
                            <div className={styles.lineContainer}>
                                <div className={styles.line}></div>
                                <div className={styles.or}>or</div>
                                <div className={styles.line}></div>
                            </div>
                            <br />
                            <br />
                            <div className={styles.addressInputContainer}>
                                <label className={styles.addressLabel}>Address</label>
                                <input className={styles.addressInput} type="text" value={address} onChange={handleAddressChange} placeholder="정확한 주소를 입력해봐요!"/>
                            </div>
                            <br />
                            <div className={styles.tipInputContainer}>
                                <label className={styles.tipLabel}>tip</label>
                                <textarea className={styles.tipInput} value={tip} onChange={handleTipChange} placeholder="tip을 입력해주세요!"/>
                            </div>
                        </form>
                    </div>
                }
            </div>
            <div id="navbar" style={navbarStyle} ref={navbar_ref}>
                <ul style={navbarUlStyle}>
                    <li id="home" style={navbarUlLiStyle} onTouchStart={handleHomeButtonTouchStart} onTouchMove={handleHomeButtonTouchMove} onTouchEnd={handleHomeButtonTouchEnd}><span className={isHomeButtonClicked === true ? 'material-icons-outlined' : (isHomeButtonOwned === true ? 'material-icons' : 'material-icons-outlined')}>home</span></li>
                    <li id="edit" style={navbarUlLiStyle} onTouchStart={handleEditButtonTouchStart} onTouchMove={handleEditButtonTouchMove} onTouchEnd={handleEditButtonTouchEnd}><span className={isEditButtonClicked === true ? 'material-icons-outlined' : (isEditButtonOwned === true ? 'material-icons' : 'material-icons-outlined')}>edit</span></li>
                    <li id="bookmarks" style={navbarUlLiStyle} onTouchStart={handleBookmarksButtonTouchStart} onTouchMove={handleBookmarksButtonTouchMove} onTouchEnd={handleBookmarksButtonTouchEnd}><span className={isBookmarksButtonClicked === true ? 'material-icons-outlined' : (isBookmarksButtonOwned === true ? 'material-icons' : 'material-icons-outlined')}>bookmarks</span></li>
                    <li id="person" style={navbarUlLiStyle} onTouchStart={handlePersonButtonTouchStart} onTouchMove={handlePersonButtonTouchMove} onTouchEnd={handlePersonButtonTouchEnd}><span className={isPersonButtonClicked === true ? 'material-icons-outlined' : (isPersonButtonOwned === true ? 'material-icons' : 'material-icons-outlined')}>person</span></li>
                </ul>
            </div>

        </>
    )
}