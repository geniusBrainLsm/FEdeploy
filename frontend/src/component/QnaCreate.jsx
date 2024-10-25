import React, { useState, useRef } from 'react';
import '../css/Qna.css';
import { useNavigate } from "react-router-dom";
import { createQna, currentUser } from "../util/APIUtils";
import QuillEditor from "./QuillEditor";

function QnaCreate(props) {
    const [textTitle, setTextTitle] = useState('');
    const [textContent, setTextContent] = useState('');
    const [hashTag, setHashTag] = useState('');
    const [inputHashTag, setInputHashTag] = useState([]);
    const [selectedValue, setSelectedValue] = useState('1');
    const [images, setImages] = useState([]);

    const selectList = [
        { value: "1", name: "질문/답변" },
        { value: "2", name: "수강평" },
        { value: "3", name: "개선요구" }
    ];

    const navigate = useNavigate();
    const textareaRef = useRef(null);

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
            e.preventDefault();
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
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    const navigateToQna = () => {
        navigate("/QnaList");
    };

    const [tempImages, setTempImages] = useState([]);

    const handleImageUpload = (image) => {
        setTempImages([...tempImages, image]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tagArray = inputHashTag.map(tag => ({ contents: tag }));

        try {
            const user = await currentUser();
            const formData = new FormData();

            // base64 이미지를 파일로 변환
            const base64Pattern = /data:image\/(png|jpeg|jpg|gif);base64,([^"']+)/g;
            let match;
            let imageIndex = 0;
            let contentsWithPaths = textContent;

            while ((match = base64Pattern.exec(textContent)) !== null) {
                const base64Data = match[2];
                const imageType = match[1];
                const byteCharacters = atob(base64Data);
                const byteArrays = [];

                for (let i = 0; i < byteCharacters.length; i++) {
                    byteArrays.push(byteCharacters.charCodeAt(i));
                }

                const byteArray = new Uint8Array(byteArrays);
                const blob = new Blob([byteArray], {type: `image/${imageType}`});
                const fileName = `image_${imageIndex}.${imageType}`;
                const file = new File([blob], fileName, {type: `image/${imageType}`});

                formData.append(`files`, file);

                // 컨텐츠에서 base64 데이터를 파일 이름으로 대체
                contentsWithPaths = contentsWithPaths.replace(match[0], `[IMAGE:${fileName}]`);
                imageIndex++;
            }

            const boardDTO = {
                title: textTitle,
                tag: tagArray,
                writer: user.name,
                boardType: selectedValue,
                contents: contentsWithPaths,
                likeCount: 0,
                viewCount: 0,
                commentsCount: 0
            };

            // boardDTO를 FormData에 추가
            formData.append('boardDTO', new Blob([JSON.stringify(boardDTO)], {
                type: 'application/json'
            }));

            const response = await createQna(formData);
            console.log('Response:', response);
            navigate('/QnaList');
        } catch (error) {
            console.error('게시글 작성 실패:', error);
            alert('게시글 작성 실패: ' + error.message);
        }
    };


    return (
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
                            placeholder="글제목을 입력해주세요"
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
                                                style={{ cursor: 'pointer' }}
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
                            setImages={setImages}
                        />
                    </div>
                    <div className="qna-detail-btn">
                        <button className="cancel-btn" onClick={navigateToQna}>취소</button>
                        <button type="submit" className="registration-btn">등록</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default QnaCreate;
