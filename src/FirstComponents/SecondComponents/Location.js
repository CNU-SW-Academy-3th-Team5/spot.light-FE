import React, {useEffect, useRef, useState} from 'react'
import {Helmet, HelmetProvider} from "react-helmet-async";
import {LocationImage} from "./ThirdComponents/LocationImage";
import './Location.css';

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
    const uploadContainerStyle = {
        position: 'fixed',
        width: '80vw',
        height: '13vh',
        left: '50%',
        top: '20vh',
        transform: 'translate(-50%)',
        border: '1px solid black',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        color: 'black'
    };
    const hideStyle = {
        display: 'none'
    };
    const imgStyle = {
        maxWidth: '100%',
        maxHeight: '100%',
        margin: 'auto',
        display: 'block',
    };
    const uploadButtonStyle = {
        position: 'fixed',
        left: '65vw',
        top: '10vh',
        width: '25vw',
        height: 'auto',
        margin: '0 auto',
        display: 'block',
        border: '1px solid #ddd',
        borderRadius: '20px',
        padding: '1vh 2vw 1vh 2vw',
        fontSize: '2vh',
        backgroundColor: 'black',
        color: 'white',
    };
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
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
    const [isIconVisible, setIsIconVisible] = useState(true);
    const [isTextVisible, setIsTextVisible] = useState(true);
    const [imageUrl, setImageUrl] = useState(null);
    // const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        function initMap() {
            if(!map.current) {
                const mapContainer = document.getElementById('map');
                const mapOption = {
                    center: new window.kakao.maps.LatLng(36.362530384643, 127.34486028546), // 지도의 중심좌표
                    level: 3, // 지도의 확대 레벨
                };
                map.current = new window.kakao.maps.Map(mapContainer, mapOption);

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        const lat = position.coords.latitude; // 위도
                        const lon = position.coords.longitude; // 경도
                        const locPosition = new window.kakao.maps.LatLng(lat, lon);
                        map.current.setCenter(locPosition);
                    });
                }

                clusterer.current = new window.kakao.maps.MarkerClusterer({
                    map: map.current, // 마커들을 클러스터로 관리하고 표시할 지도 객체
                    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
                    minLevel: 4 // 클러스터 할 최소 지도 레벨
                });
            }

            if(markers.current.length >= 1) {
                clusterer.current.removeMarkers(markers.current);
            }

            markers.current = information.map(function (position) {  // 마커를 배열 단위로 묶음
                return new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(position.latitude, position.longitude)
                });
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
    }, [information]);

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

    let handleHomeButton = (event) => {
        if (parseFloat(document.querySelector('#sidepanel').style.height) === 58 && document.querySelector('#sidepanel').scrollTop > 0) {
            document.querySelector('#sidepanel').scrollTop = 0;
            isBiggestFirstAndNotTop = false;
        } else if (parseFloat(document.querySelector('#sidepanel').style.height) === 8) {
            animateHeight(25);
        }

        if(!isHomeButtonOwned) {
            setIsHomeButtonOwned(true);
            setIsEditButtonOwned(false);
            setIsBookmarksButtonOwned(false);
            setIsPersonButtonOwned(false);
            setIsEditVisible(false);
        }
    };

    let handleEditButton = (event) => {
        if(!isEditButtonOwned) {
            setIsHomeButtonOwned(false);
            setIsEditButtonOwned(true);
            setIsBookmarksButtonOwned(false);
            setIsPersonButtonOwned(false);
            setIsEditVisible(true);
        }
    };

    let handleBookmarksButton = (event) => {
        if(!isBookmarksButtonOwned) {
            setIsHomeButtonOwned(false);
            setIsEditButtonOwned(false);
            setIsBookmarksButtonOwned(true);
            setIsPersonButtonOwned(false);
            setIsEditVisible(false);
        }
    };

    let handlePersonButton = (event) => {
        if(!isPersonButtonOwned) {
            setIsHomeButtonOwned(false);
            setIsEditButtonOwned(false);
            setIsBookmarksButtonOwned(false);
            setIsPersonButtonOwned(true);
            setIsEditVisible(false);
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
        const imageFile = event.target.files[0];

        if (navigator.userAgent.match(/iPhone/i)) {
            alert('iPhone');
        } else if (navigator.userAgent.match(/iPad/i)) {
            alert('iPad');
        } else if (navigator.userAgent.match(/iPod/i)) {
            alert('iPod');
        } else if (navigator.userAgent.match(/Android/i)) {
            alert('Android');
        } else {
            alert('알 수 없음');
        }

        if (imageFile !== undefined) {
            if (imageFile.type.startsWith('image/')) {
                setSelectedImage(imageFile);
                const imgUrl = URL.createObjectURL(imageFile);
                setImageUrl(imgUrl); // 이미지 URL을 상태에 저장
                setIsIconVisible(false);
                setIsTextVisible(false);
            } else {
                alert('이미지 파일을 드래그 앤 드롭하세요.');
                setImageUrl(null);
                setIsIconVisible(true);
                setIsTextVisible(true);
                setSelectedImage(null);
            }
        } else {
            setImageUrl(null);
            setIsIconVisible(true);
            setIsTextVisible(true);
            setSelectedImage(null);
        }
    };

    const handleUpload = (e) => {
        e.preventDefault();

        if (!selectedImage) {
            alert('이미지를 선택하세요.');
        } else {
            // alert("사진이 정상적으로 업로드 되었습니다.");
            onUploadSubmit(selectedImage);
            setImageUrl(null);
            setIsIconVisible(true);
            setIsTextVisible(true);
            setSelectedImage(null);
        }
    }

    const handleContainerClick = () => {
        fileInputRef.current.click();
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

    // useEffect(() => {
    //     if (map.current === null) {
    //         return;
    //     }
    //
    //     if (isVisible) {
    //         clusterer.current.addMarkers(markers.current);
    //     } else {
    //         clusterer.current.removeMarkers(markers.current);
    //     }
    // }, [isVisible]);

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>여러 개 마커 제어하기</title>
                    <link href="https://fonts.googleapis.com/css?family=Material+Icons%7CMaterial+Icons+Outlined" rel="stylesheet" type="text/css" />
                </Helmet>
            </HelmetProvider>
            <div id="map" style={mapStyle}></div>
            <div style={titleStyle}>Spot.light</div>
            <div style={searchStyle}>
                <input type="text" style={myInputStyle} placeholder="Search for places" title="Type in a name" />
            </div>
            <div id="sidepanel" style={sidepanelStyle} onTouchStart={handleSidePanelTouchStart} onTouchMove={handleSidePanelTouchMove} onTouchEnd={handleSidePanelTouchEnd}>
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
                        <div style={uploadContainerStyle} onClick={handleContainerClick}>
                            {isIconVisible && <span className="material-icons-outlined">add_circle_outline</span>}
                            {isTextVisible && <span>choose your photos</span>}
                            {imageUrl && <img src={imageUrl} style={imgStyle} alt="업로드된 이미지" />}
                        </div>

                        <form encType="multipart/form-data">
                            <label style={hideStyle}>Upload your file</label>
                            <input type="file" style={hideStyle} onChange={handleImageChange} ref={fileInputRef}/>
                            <br/>
                            <button style={uploadButtonStyle} onClick={handleUpload}>upload</button>
                        </form>
                    </div>
                }
            </div>
            <div id="navbar" style={navbarStyle} ref={navbar_ref}>
                <ul style={navbarUlStyle}>
                    <li id="home" style={navbarUlLiStyle} onClick={handleHomeButton}><span className={isHomeButtonOwned === true ? 'material-icons' : 'material-icons-outlined'}>home</span></li>
                    <li id="edit" style={navbarUlLiStyle} onClick={handleEditButton}><span className={isEditButtonOwned === true ? 'material-icons' : 'material-icons-outlined'}>edit</span></li>
                    <li id="bookmarks" style={navbarUlLiStyle} onClick={handleBookmarksButton}><span className={isBookmarksButtonOwned === true ? 'material-icons' : 'material-icons-outlined'}>bookmarks</span></li>
                    <li id="person" style={navbarUlLiStyle} onClick={handlePersonButton}><span className={isPersonButtonOwned === true ? 'material-icons' : 'material-icons-outlined'}>person</span></li>
                </ul>
            </div>
            {/*<div>*/}
            {/*    <button onClick={() => setIsVisible(false)}>마커 감추기</button>*/}
            {/*    <button onClick={() => setIsVisible(true)}>마커 보이기</button>*/}
            {/*</div>*/}
        </>
    )
}