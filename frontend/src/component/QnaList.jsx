import Accordion from "react-bootstrap/Accordion";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import '../css/Qna.css';
import {readQna} from "../util/APIUtils";
import '@fortawesome/fontawesome-free/css/all.css';
import Pagination from 'react-bootstrap/Pagination';
import parse from 'html-react-parser';

function formatDate(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function QnaList(){

    const navigate = useNavigate();
    const [activeSort, setActiveSort] = useState(""); // 현재 활성화된 정렬 버튼의 상태를 관리
    const [qnaList, setQnaList] = useState([]); // 게시글 데이터
    const [qnaSearch, setQnaSearch] = useState('');
    const [hashTag, setHashTag] = useState('');
    const [inputHashTag, setInputHashTag] = useState([]);

    const handleQnaSearch = (e) => {
        setQnaSearch(e.target.value);
    }

    const handleOnHashTagChange = (e) => {
        const { value } = e.target;
        setHashTag(value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && hashTag.trim() !== '') {
            setInputHashTag(prevHashTags => [...prevHashTags, hashTag.trim()]);
            setHashTag('');
            e.preventDefault(); // Input에서 엔터키 누를 시 Form 요청으로 넘어가는걸 방지
        } else if (e.key === 'Backspace' && hashTag === '') {
            setInputHashTag(prevHashTags => prevHashTags.slice(0, -1));
        }
    }

    const handleDeleteTag = (index) => {
        setInputHashTag(prevHashTags => prevHashTags.filter((_, i) => i !== index));
    }

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
                const response = await readQna(qnaSearch);
                setQnaList(response.content); // 가져온 데이터를 상태에 설정합니다.
                console.log(response);
            } catch (error) {
                console.error("Error fetching Q&A data:", error);
            }
        };

        fetchData().then(r => {
            // console.log("성공")
        }); // useEffect에서 바로 호출하여 컴포넌트가 마운트될 때 데이터를 가져오도록 합니다.
    }, []);

    return(
        <div>
            <div className="community-header">
                <div className="community-header-content">
                    <h2 className="community-header-content-title">커뮤니티 게시판</h2>
                    <p className="community-header-content-sub-title">질문사항이나 개선사항을 작성하세요!</p>
                </div>
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
                    <div className="qna-search-filter">
                        <form>
                            <div className="qna-search-item">
                                <div className="qna-search-item2">
                                    <input
                                        className="qna-search-item-input"
                                        value={qnaSearch}
                                        onChange={handleQnaSearch}
                                        placeholder="질문을 검색해보세요!"
                                    />
                                </div>
                                <button className="qna-search-btn">
                                    <span>검색</span>
                                </button>
                            </div>
                            {/* 해시코드 검색창 */}
                            <div className="qna-search-item">
                                <div className="qna-search-hash-box">
                                    <div className="qna-search-hash-box2">
                                        <ul className="hash-ul">
                                            {inputHashTag.map((tag, index) => (
                                                <li className="qna-search-hash-li" key={index}>
                                                    <span className="hash-span">{tag}</span>
                                                    <button className="hash-delete-btn" onClick={() => handleDeleteTag(index)}>
                                                        <svg
                                                            width="8"
                                                            height="8"
                                                            viewBox="0 0 100 100"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            style={{ cursor: 'pointer' }} // 마우스가 올라가면 커서를 포인터로 변경합니다.
                                                        >
                                                            <line x1="10" y1="10" x2="90" y2="90" stroke="black" strokeWidth="20" />
                                                            <line x1="90" y1="10" x2="10" y2="90" stroke="black" strokeWidth="20" />
                                                        </svg>
                                                    </button>
                                                </li>
                                            ))}
                                            <input
                                                className="qna-search-hash-input"
                                                type="text"
                                                value={hashTag}
                                                onChange={handleOnHashTagChange}
                                                onKeyDown={handleKeyDown}
                                                placeholder="태그를 설정하세요"
                                            />
                                        </ul>
                                    </div>
                                </div>
                                <button className="qna-search-reset-btn">
                                    <span>초기화</span>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="qna-posts">
                        <button className={`sorts-btn ${activeSort === "최신순" ? "active" : ""}`} onClick={() => handleSortClick("최신순")}>최신순</button>
                        <button className={`sorts-btn ${activeSort === "조회수순" ? "active" : ""}`} onClick={() => handleSortClick("조회수순")}>조회수순</button>
                        <button className={`sorts-btn ${activeSort === "좋아요순" ? "active" : ""}`} onClick={() => handleSortClick("좋아요순")}>좋아요순</button>
                        <button className={"write-btn"} onClick={navigateToDetail}>글쓰기</button>
                    </div>
                        {/* 게시글 데이터를 반복하여 화면에 표시 */}
                        {qnaList && qnaList.length > 0 && qnaList.map((qnaItem, index) => (
                        <div className="qna" key={qnaItem.id}>
                                <a href={`/QnaRead/${qnaItem.id}`} className="qna-a" key={index}>
                                    <div className="qna-info">
                                        <div>
                                            {/*글 제목*/}
                                            <h4>{qnaItem.title}</h4>
                                        </div>
                                        <div>
                                            {/*글 내용*/}
                                            <p>{parse(qnaItem.contents)}</p>
                                        </div>
                                        <div className="qna-tag">
                                            <ul className="hash-ul">
                                                {/*해시태그*/}
                                                {qnaItem.tag.map((tag, tagIndex) => (
                                                    <li className="qnaList-hash-li" key={tagIndex}>
                                                        <span>{tag.contents}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="qna-info-detail">
                                            <div>
                                                {/*글쓴이*/}
                                                <span>작성자 : {qnaItem.writer}</span>
                                                <span>&nbsp;</span>
                                                {/*작성일*/}
                                                <span>{formatDate(qnaItem.createdAt)}</span>
                                            </div>
                                            <div className="qna-info-user-data">
                                                {/*좋아요 개수*/}
                                                <span className="heart-icon"></span>
                                                <span>&nbsp;</span>
                                                <span>{qnaItem.likeCount}</span>
                                                <span className="">&nbsp;</span>
                                                {/*조회수*/}
                                                <span className="view-icon"></span>
                                                <span>&nbsp;</span>
                                                <span>{qnaItem.viewCount}</span>
                                                <span className="">&nbsp;</span>
                                                {/*댓글 개수*/}
                                                <span className="comment-icon"></span>
                                                <span>&nbsp;</span>
                                                <span>{qnaItem.commentsCount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default QnaList;