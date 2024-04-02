import Accordion from "react-bootstrap/Accordion";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import '../css/Qna.css';
import {readQna} from "../util/APIUtils";
import Pagination from 'react-bootstrap/Pagination';

function QnaList(){

    const navigate = useNavigate();
    const [activeSort, setActiveSort] = useState(""); // 현재 활성화된 정렬 버튼의 상태를 관리
    const [qnaList, setQnaList] = useState([]); // 게시글 데이터
    const handleSortClick = (sortType) => {
        setActiveSort(sortType); // 클릭한 버튼의 종류를 상태로 설정
    };

    const navigateToDetail = () => {
        navigate("/QnaCreate");
    };

    useEffect(() => {
        // readQna 함수를 호출하여 게시글 데이터를 가져옵니다.
        const fetchData = async () => {
            try {
                const response = await readQna();
                setQnaList(response); // 가져온 데이터를 상태에 설정합니다.
            } catch (error) {
                console.error("Error fetching Q&A data:", error);
            }
        };

        fetchData().then(r => {
            console.log("성공")
        }); // useEffect에서 바로 호출하여 컴포넌트가 마운트될 때 데이터를 가져오도록 합니다.
    }, []);

    return(
        <div>
            <div className="qrc-image-div2">
                이미지
            </div>
            <div className="qna-container">
                <div className="vertical-menu">
                    <Accordion className="test-div1" defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header className="custom-accordion-container">커뮤니티</Accordion.Header>
                            <Accordion.Body>
                                <a href="/frontend/src/component/QnaList" className="a-link">질문/답변</a>
                            </Accordion.Body>
                            <Accordion.Body>
                                <a href="/QuestionRoomCreate" className="a-link">수강평</a>
                            </Accordion.Body>
                            <Accordion.Body>
                                <a href="/QuestionRoomCreate" className="a-link">개선요구</a>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
                <div className="qna-container2">
                    <div className="qna-guide">
                        <span>커뮤니티 / 질문 / 답변</span>
                    </div>
                    <div className="qna-posts">
                        <button className={`sorts-btn ${activeSort === "최신순" ? "active" : ""}`} onClick={() => handleSortClick("최신순")}>최신순</button>
                        <button className={`sorts-btn ${activeSort === "정확도순" ? "active" : ""}`} onClick={() => handleSortClick("정확도순")}>정확도순</button>
                        <button className={`sorts-btn ${activeSort === "조회수순" ? "active" : ""}`} onClick={() => handleSortClick("조회수순")}>조회수순</button>
                        <button className={`sorts-btn ${activeSort === "좋아요순" ? "active" : ""}`} onClick={() => handleSortClick("좋아요순")}>좋아요순</button>
                        <button className={"write-btn"} onClick={navigateToDetail}>글쓰기</button>
                    </div>
                    <div className="qna">
                        {/* 게시글 데이터를 반복하여 화면에 표시합니다. */}
                        {qnaList.map((qnaItem, index) => (
                            <a href="#" className="qna-a" key={index}>
                                <div className="qna-info">
                                    <div>
                                        <h4>{qnaItem.title}</h4>
                                    </div>
                                    <div>
                                        <p>{qnaItem.contents}</p>
                                    </div>
                                    <div className="qna-tag">
                                        <span>{qnaItem.tag}</span>
                                    </div>
                                    <div className="qna-info-detail">
                                        <div>
                                            <span>{qnaItem.writer}</span>
                                            <span>&nbsp;</span>
                                            <span>{qnaItem.date}</span>
                                        </div>
                                        <div className="qna-info-user-data">
                                            <span>하트</span>
                                            <span>&nbsp;</span>
                                            <span>{qnaItem.likeCount}</span>
                                            <span>&nbsp;</span>
                                            <span>조회수</span>
                                            <span>&nbsp;</span>
                                            <span>{qnaItem.viewCounter}</span>
                                            <span>&nbsp;</span>
                                            <span>답글</span>
                                            <span>&nbsp;</span>
                                            <span>{qnaItem.commentCounter}</span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QnaList;