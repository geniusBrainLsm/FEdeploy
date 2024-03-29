import React, {useRef, useState} from 'react';
import '../css/Qna.css';
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import {createQna} from "../util/APIUtils";
function QnaDetail(props){

    const [textTitle, setTextTitle] = useState('');
    const [textContent, setTextContent] = useState('');
    const [hashTag, setHashTag] = useState('');
    const [inputHashTags, setInputHashTags] = useState([]);
    const navigate = useNavigate();
    const textareaRef = useRef(null); // textarea의 높이를 자동으로 조절하는 함수

    const handleOnChange = (e) => {
        const { value } = e.target;
        setHashTag(value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && hashTag.trim() !== '') {
            setInputHashTags(prevHashTags => [...prevHashTags, hashTag.trim()]);
            setHashTag('');
            e.preventDefault(); // Input에서 엔터키 누를 시 Form 요청으로 넘어가는걸 방지
        } else if (e.key === 'Backspace' && hashTag === '') {
            setInputHashTags(prevHashTags => prevHashTags.slice(0, -1));
        }
    }

    const handleDeleteTag = (index) => {
        setInputHashTags(prevHashTags => prevHashTags.filter((_, i) => i !== index));
    }

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

        //
        const formData = {
            title: textTitle,
            // tag: tag,
            // writer: writer,
            // boardType: boardType,
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
                        <div className="hash-div1">
                            <ul className="hash-ul">
                                {inputHashTags.map((tag, index) => (
                                    <li className="hash-li" key={index}>
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
                                    value={hashTag}
                                    onChange={handleOnChange}
                                    onKeyDown={handleKeyDown}
                                    placeholder="태그를 설정하세요"
                                />
                            </ul>
                        </div>
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