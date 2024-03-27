import React, { useRef } from 'react';
import '../css/Qna.css';
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";

function QnaDetail(){

    const navigate = useNavigate();
    const textareaRef = useRef(null); // textarea의 높이를 자동으로 조절하는 함수
    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // 높이를 자동으로 조절하기 위해 높이를 'auto'로 설정
            textarea.style.height = `${textarea.scrollHeight}px`; // 실제 스크롤된 높이로 textarea의 높이를 설정
        }
    };

    const navigateToQna = () => {
        navigate("/Qna");
    };

    return(
        <div className="qna-container">
            <div className="qna-detail-wrapper">
                <div>
                    <textarea
                        ref={textareaRef}
                        onChange={adjustTextareaHeight}
                        className="qna-detail-text-header"
                        rows="1"
                        placeholder={"글제목을 입력해주세요"}
                    />
                </div>
                <div>
                    {/*<input*/}
                    {/*    placeholder={"태그설정"}*/}
                    {/*/>*/}
                </div>
                <div>
                    <ReactQuill
                        className="qna-detail-editor"
                        theme="snow"
                        value={""}
                        placeholder="-학습 관련 질문을 남겨주세요."
                    />
                </div>
                <div className="qna-detail-btn">
                    <button className="cancel-btn" onClick={navigateToQna}>취소</button>
                    <button className="registration-btn">등록</button>
                </div>
            </div>
        </div>
    )
}

export default QnaDetail;