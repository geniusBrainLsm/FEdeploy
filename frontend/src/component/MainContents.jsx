import React, { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import '../css/Main.css';
import '../css/Menu.css';
import testLogo from "../img/size_s_icon_137187.png";
function MainContents(){

    return (
        <div>
            <div>
                <Carousel data-bs-theme="dark" className="test1">
                    <Carousel.Item interval={2000}>
                        <img className={"form-logo"} src={testLogo} alt="로고 이미지"/>
                        <Carousel.Caption>
                            {/*<h5>1번</h5>*/}
                            {/*<p>설명글</p>*/}
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                        <img className={"form-logo"} src={testLogo} alt="로고 이미지"/>
                        <Carousel.Caption>
                            {/*<h5>2번</h5>*/}
                            {/*<p>설명글</p>*/}
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                        <img className={"form-logo"} src={testLogo} alt="로고 이미지"/>
                        <Carousel.Caption>
                            {/*<h5>3번</h5>*/}
                            {/*<p>설명글</p>*/}
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <div className={"main-contents-container"}>
                    <div className={"test2"}>
                    </div>
                    <div className={"test2"}>
                    </div>
                    <div className={"test2"}>
                    </div>
                    <div className={"test2"}>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainContents;
