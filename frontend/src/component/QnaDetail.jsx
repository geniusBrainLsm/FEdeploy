import React, {useRef, useState} from 'react';
import '../css/Qna.css';
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import {createQna} from "../util/APIUtils";
function QnaDetail(props){

    const [textTitle, setTextTitle] = useState('');
    const [textContent, setTextContent] = useState('');

    const navigate = useNavigate();
    const textareaRef = useRef(null); // textarea의 높이를 자동으로 조절하는 함수
    const adjustTextareaHeight = (e) => {
        const textarea = textareaRef.current;
        setTextTitle(e.target.value);
        if (textarea) {
            textarea.style.height = 'auto'; // 높이를 자동으로 조절하기 위해 높이를 'auto'로 설정
            textarea.style.height = `${textarea.scrollHeight}px`; // 실제 스크롤된 높이로 textarea의 높이를 설정
        }
    };

    const navigateToQna = () => {
        navigate("/Qna");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            title: textTitle,
            content: textContent
        };

        createQna(formData)
            .then(() => {
                navigate('/Qna'); // 회원가입 성공 시 /Qna url로 이동
                props.onHide();
            })
            .catch((error) => {
                alert('게시글 작성 실패');
            });
    };

    return(
        <div className="qna-container">
            <div className="qna-detail-wrapper">
                <form onSubmit={handleSubmit}>
                    <div>
                    <textarea
                        value={textTitle}
                        ref={textareaRef}
                        onChange={adjustTextareaHeight}
                        className="qna-detail-text-title"
                        rows="1"
                        placeholder={"글제목을 입력해주세요"}
                    />
                    </div>
                    <div>
                        <input
                            className="qna-hash-tag"
                            placeholder={"태그설정"}
                        />
                        <ul>
                            {/*{hashArr.map((item, index) => (*/}
                            {/*    <li key={index}>{item}</li>*/}
                            {/*))}*/}
                        </ul>
                    </div>
                    <div>
                        <ReactQuill
                            className="qna-detail-content"
                            theme="snow"
                            value={textContent}
                            placeholder="-학습 관련 질문을 남겨주세요."
                        />
                    </div>
                    <div className="qna-detail-btn">
                        <button className="cancel-btn" onClick={navigateToQna}>취소</button>
                        <button type={"submit"} className="registration-btn">등록</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default QnaDetail;