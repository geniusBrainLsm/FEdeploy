import React, {useEffect, useRef, useState} from 'react';
import '../css/Qna.css';
import { useNavigate } from "react-router-dom";
import {createQna, currentUser} from "../util/APIUtils";
import QuillEditor from "./QuillEditor";
function QnaCreate(props){

    const [textTitle, setTextTitle] = useState('');
    const [textContent, setTextContent] = useState('');
    const [hashTag, setHashTag] = useState('');
    const [inputHashTag, setInputHashTag] = useState([]);
    const [selectedValue, setSelectedValue] = useState('1');

    const selectList = [
        { value: "1", name: "질문/답변" },
        { value: "2", name: "수강평" },
        { value: "3", name: "개선요구" }
    ];

    const navigate = useNavigate();
    const textareaRef = useRef(null); // textarea의 높이를 자동으로 조절하는 함수

    const handleOnHashTagChange = (e) => {
        const { value } = e.target;
        setHashTag(value);
    }

    const handleContentChange = (text) => {
        setTextContent(text);
    }

    const handleSelectChange = (e) => {
        const { value } = e.target;
        setSelectedValue(value);
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

    const adjustTextareaHeight = (e) => {
        const textarea = textareaRef.current;
        setTextTitle(e.target.value);
        if (textarea) {
            textarea.style.height = 'auto'; // 높이를 자동으로 조절하기 위해 높이를 'auto'로 설정
            textarea.style.height = `${textarea.scrollHeight}px`; // 실제 스크롤된 높이로 textarea의 높이를 설정
        }
    };

    const navigateToQna = () => {
        navigate("/QnaList");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 모든 배열 요소를 문자열 객체로 변환하여 문자열로 합침
        // inputHashTags 배열을 객체로 변환하여 key-value 형태로 추가
        const tagArray = inputHashTag.map((tag) => {
            return { contents: tag };
        });

        const pureTextContent = textContent.replace(/<[^>]+>/g, '');

        // 현재 사용자 정보를 가져오는 비동기 함수
        currentUser()
            .then(currentUser => {
                // 현재 사용자 정보를 받은 후에 formData 객체 생성 및 createQna 호출
                const formData = {
                    title: textTitle,
                    tag: tagArray,
                    writer: currentUser.name,
                    boardType: selectedValue,
                    contents: pureTextContent,
                    likeCount: 0,
                    viewCount: 0,
                    commentsCount: 0
                };

                createQna(formData)
                    .then(() => {
                        navigate('/QnaList'); // 게시글 작성 성공 시 /QnaList url로 이동
                    })
                    .catch((error) => {
                        alert('게시글 작성 실패');
                        console.log(error);
                    });
            })
            .catch(error => {
                console.error('현재 사용자 정보를 가져오는데 실패했습니다:', error);
                // 사용자 정보를 가져오지 못한 경우에 대한 에러 처리
                alert('현재 사용자 정보를 가져오는데 실패했습니다');
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
                                    type="text"
                                    value={hashTag}
                                    onChange={handleOnHashTagChange}
                                    onKeyDown={handleKeyDown}
                                    placeholder="태그를 설정하세요"
                                />
                            </ul>
                        </div>
                    </div>
                    <div>
                        <select value={selectedValue} onChange={handleSelectChange}>
                            {selectList.map(item => (
                                <option key={item.value} value={item.value}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <QuillEditor
                            className="qna-detail-content"
                            value={textContent}
                            onChange={handleContentChange}
                            placeholder="-학습 관련 질문을 남겨주세요."
                        />
                    </div>
                    <div>
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

export default QnaCreate;