import React, {useEffect, useState} from "react";
import QuillEditor from "./QuillEditor";
import {getQnaRead} from "../util/APIUtils";
import {useParams} from "react-router-dom";
import QnaDelete from "./QnaDelete";
import Button from "react-bootstrap/Button";
import QnaUpdate from "./QnaUpdate";
import parse from "html-react-parser";

function QnaRead(){

    const [modalShowUpdate, setModalShowUpdate] = React.useState(false);
    const [modalShowDelete, setModalShowDelete] = React.useState(false);
    const [showEditor, setShowEditor] = useState(false);
    const [qnaRead, setQnaRead] = useState([]);

    let { id } = useParams();
    const toggleEditor = () => {
        setShowEditor(!showEditor);
    };

    useEffect(() => {

        // readQna 함수를 호출하여 게시글 데이터를 가져옵니다.
        const fetchData = async () => {
            try {
                const response = await getQnaRead(id);
                setQnaRead(response); // 가져온 데이터를 상태에 설정합니다.
                console.log(response);
            } catch (error) {
                console.error("Error fetching Q&A data:", error);
            }
        };

        fetchData().then(r => {
            // console.log("성공")
        }); // useEffect에서 바로 호출하여 컴포넌트가 마운트될 때 데이터를 가져오도록 합니다.
    }, []);
    const parseStyles = (styleString) => {
        return styleString.split(';').reduce((acc, style) => {
            const [key, value] = style.split(':');
            if (key && value) {
                const camelCaseKey = key.trim().replace(/-./g, x => x[1].toUpperCase());
                acc[camelCaseKey] = value.trim();
            }
            return acc;
        }, {});
    };

    const parseOptions = {
        replace: (domNode) => {
            if (domNode.attribs && domNode.name === 'img') {
                const { src, style, ...props } = domNode.attribs;
                // Spring Boot 리소스 핸들러 경로에 맞게 src 수정
                const newSrc = `/images/${src}`;
                const styleObject = style ? parseStyles(style) : {};
                return <img src={newSrc} style={styleObject} {...props} alt="" />;
            }
        }
    };

    const parsedContent = qnaRead.contents ? parse(qnaRead.contents, parseOptions) : null;

    return(
        <div className="qna-read-container">
            <div className="qna-read-view">
                <div className="qna-read-header">
                    <div className="qna-read-header-title">
                        {qnaRead.title}
                    </div>
                    <div className="qna-read-header-time">
                        <span>
                            <span>{qnaRead.createdAt}</span>
                            <span>&nbsp;</span>
                            <span>조회수 : {qnaRead.viewCount}</span>
                            <span>&nbsp;</span>
                            <span>좋아요수 : {qnaRead.likeCount}</span>
                        </span>
                        <div>
                            <Button variant="primary" onClick={() => setModalShowUpdate(true)}>
                                수정
                            </Button>
                            <QnaUpdate
                                show={modalShowUpdate}
                                onHide={() => setModalShowUpdate(false)}
                            />
                            <Button variant="primary" onClick={() => setModalShowDelete(true)}>
                                삭제
                            </Button>
                            <QnaDelete  
                                show={modalShowDelete}
                                onHide={() => setModalShowDelete(false)}
                            />
                        </div>
                    </div>
                </div>
                <div className="qna-read-horizon">
                </div>
                <div className="qna-read-body">
                    <div className="qna-read-body-contents">
                        {/*게시글 내용*/}
                        {parsedContent}
                    </div>
                    {/*해시태그*/}
                    <ul className="qna-read-body-hashtag">
                        {qnaRead && qnaRead.tag && qnaRead.tag.length > 0 && (
                            qnaRead.tag.map((tag, tagIndex) => (
                                <li className="qna-read-body-hashtag-li" key={tagIndex}>
                                    <span>{tag.contents}</span>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
                <div className="qna-read-comment-body">
                    <div className="qna-read-comment">
                        <p>
                            <span>댓글</span>
                            &nbsp;
                            <span className="qna-read-comment-count">0</span>
                        </p>
                    </div>
                    {!showEditor && (
                        <div className="qna-read-comment-create" onClick={toggleEditor}>
                            <p className="qna-read-comment-create-p">댓글을 작성해보세요.</p>
                        </div>
                    )}
                    {showEditor && (
                        <div>
                            <QuillEditor
                                className={"qna-read-comment-content"}
                                // value={textContent}
                                // onChange={handleContentChange}
                                placeholder="댓글을 입력해주세요."
                            />
                            <div className="qna-detail-btn">
                                <button className="cancel-btn" onClick={toggleEditor}>취소</button>
                                <button type={"submit"} className="registration-btn">등록</button>
                            </div>
                        </div>
                    )}
                    <div className="qna-read-comment-none">
                        <div className="qna-read-comment-none">
                            <p className="qna-read-comment-none-span">
                                답변이 없습니다.
                                <br/>
                                답변을 입력해주세요!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="qna-read-sidebar">
                <div className="qna-read-profile-info-card">
                    <a className="qna-read-user-info-profile-card2">
                        <div className="qna-read-user-info">
                            <div>
                                <h3 className="qna-read-user">{qnaRead.writer}</h3>
                            </div>
                            <div>
                                <p className="qna-read-user-p">작성한 질문수 1</p>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="qna-read-info-card">
                    <div>
                        <p>카테고리</p>
                    </div>
                    <div>
                        <p>세부 분야</p>
                    </div>
                    <div>
                        <p>해결 여부</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QnaRead;