import Accordion from "react-bootstrap/Accordion";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../css/Qna.css';
import Pagination from 'react-bootstrap/Pagination';

function Qna(){

    const navigate = useNavigate();

    const [activeSort, setActiveSort] = useState(""); // 현재 활성화된 정렬 버튼의 상태를 관리

    const handleSortClick = (sortType) => {
        setActiveSort(sortType); // 클릭한 버튼의 종류를 상태로 설정
    };

    const navigateToDetail = () => {
        navigate("/QnaDetail");
    };

    // const handelTrans

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
                                <a href="/Qna" className="a-link">질문/답변</a>
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
                            <a href="#" className="qna-a">
                                <div className="qna-info">
                                    <div>
                                        <h4>게시글 제목</h4>
                                    </div>
                                    <div>
                                        <p>게시글 내용</p>
                                    </div>
                                    <div className="qna-tag">
                                        <span>태그</span>
                                    </div>
                                    <div className="qna-info-detail">
                                        <div>
                                            <span>qwer123</span>
                                            <span>&nbsp;</span>
                                            <span>2024-01-02</span>
                                        </div>
                                        <div className="qna-info-user-data">
                                            <span>하트</span>
                                            <span>&nbsp;</span>
                                            <span>1</span>
                                            <span>&nbsp;</span>
                                            <span>조회수</span>
                                            <span>&nbsp;</span>
                                            <span>1</span>
                                            <span>&nbsp;</span>
                                            <span>답글</span>
                                            <span>&nbsp;</span>
                                            <span>1</span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                    </div>
                    <div className="qna">
                        <a href="#" className="qna-a">
                            <div className="qna-info">
                                <div>
                                    <h4>게시글 제목</h4>
                                </div>
                                <div>
                                    <p>게시글 내용</p>
                                </div>
                                <div className="qna-tag">
                                    <span>태그</span>
                                </div>
                                <div className="qna-info-detail">
                                    <div>
                                        <span>qwer123</span>
                                        <span>&nbsp;</span>
                                        <span>2024-01-02</span>
                                    </div>
                                    <div className="qna-info-user-data">
                                        <span>하트</span>
                                        <span>&nbsp;</span>
                                        <span>1</span>
                                        <span>&nbsp;</span>
                                        <span>조회수</span>
                                        <span>&nbsp;</span>
                                        <span>1</span>
                                        <span>&nbsp;</span>
                                        <span>답글</span>
                                        <span>&nbsp;</span>
                                        <span>1</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="qna">
                        <a href="#" className="qna-a">
                            <div className="qna-info">
                                <div>
                                    <h4>게시글 제목</h4>
                                </div>
                                <div>
                                    <p>게시글 내용</p>
                                </div>
                                <div className="qna-tag">
                                    <span>태그</span>
                                </div>
                                <div className="qna-info-detail">
                                    <div>
                                        <span>qwer123</span>
                                        <span>&nbsp;</span>
                                        <span>2024-01-02</span>
                                    </div>
                                    <div className="qna-info-user-data">
                                        <span>하트</span>
                                        <span>&nbsp;</span>
                                        <span>1</span>
                                        <span>&nbsp;</span>
                                        <span>조회수</span>
                                        <span>&nbsp;</span>
                                        <span>1</span>
                                        <span>&nbsp;</span>
                                        <span>답글</span>
                                        <span>&nbsp;</span>
                                        <span>1</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="qna">
                        <a href="#" className="qna-a">
                            <div className="qna-info">
                                <div>
                                    <h4>게시글 제목</h4>
                                </div>
                                <div>
                                    <p>게시글 내용</p>
                                </div>
                                <div className="qna-tag">
                                    <span>태그</span>
                                </div>
                                <div className="qna-info-detail">
                                    <div>
                                        <span>qwer123</span>
                                        <span>&nbsp;</span>
                                        <span>2024-01-02</span>
                                    </div>
                                    <div className="qna-info-user-data">
                                        <span>하트</span>
                                        <span>&nbsp;</span>
                                        <span>1</span>
                                        <span>&nbsp;</span>
                                        <span>조회수</span>
                                        <span>&nbsp;</span>
                                        <span>1</span>
                                        <span>&nbsp;</span>
                                        <span>답글</span>
                                        <span>&nbsp;</span>
                                        <span>1</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="qna">
                        <a href="#" className="qna-a">
                            <div className="qna-info">
                                <div>
                                    <h4>게시글 제목</h4>
                                </div>
                                <div>
                                    <p>게시글 내용</p>
                                </div>
                                <div className="qna-tag">
                                    <span>태그</span>
                                </div>
                                <div className="qna-info-detail">
                                    <div>
                                        <span>qwer123</span>
                                        <span>&nbsp;</span>
                                        <span>2024-01-02</span>
                                    </div>
                                    <div className="qna-info-user-data">
                                        <span>하트</span>
                                        <span>&nbsp;</span>
                                        <span>1</span>
                                        <span>&nbsp;</span>
                                        <span>조회수</span>
                                        <span>&nbsp;</span>
                                        <span>1</span>
                                        <span>&nbsp;</span>
                                        <span>답글</span>
                                        <span>&nbsp;</span>
                                        <span>1</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div>
                        {/*<Pagination>*/}
                        {/*    <Pagination.First />*/}
                        {/*    <Pagination.Prev />*/}
                        {/*    <Pagination.Item>{1}</Pagination.Item>*/}
                        {/*    <Pagination.Ellipsis />*/}

                        {/*    <Pagination.Item>{10}</Pagination.Item>*/}
                        {/*    <Pagination.Item>{11}</Pagination.Item>*/}
                        {/*    <Pagination.Item active>{12}</Pagination.Item>*/}
                        {/*    <Pagination.Item>{13}</Pagination.Item>*/}
                        {/*    <Pagination.Item disabled>{14}</Pagination.Item>*/}

                        {/*    <Pagination.Ellipsis />*/}
                        {/*    <Pagination.Item>{20}</Pagination.Item>*/}
                        {/*    <Pagination.Next />*/}
                        {/*    <Pagination.Last />*/}
                        {/*</Pagination>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Qna;