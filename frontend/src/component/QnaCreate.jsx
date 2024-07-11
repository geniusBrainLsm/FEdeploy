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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tagArray = inputHashTag.map(tag => ({ contents: tag }));
        const pureTextContent = textContent.replace(/<[^>]+>/g, '');

        try {
            const user = await currentUser();

            const formData = new FormData();

            // 이미지를 서버에 업로드하고 URL을 받아옴
            const imageUrls = await Promise.all(images.map(async (image) => {
                const imageData = new FormData();
                imageData.append('image', image.file);

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: imageData,
                });
                const data = await response.json();
                return data.url;
            }));

            // 에디터 내용에서 base64 이미지를 실제 URL로 대체
            let contentsWithUrls = textContent;
            images.forEach((image, index) => {
                contentsWithUrls = contentsWithUrls.replace(image.base64ImageSrc, imageUrls[index]);
            });

            // boardDTO 객체 생성
            const boardDTO = {
                title: textTitle,
                tag: tagArray,
                writer: user.name,
                boardType: selectedValue,
                contents: contentsWithUrls,
                likeCount: 0,
                viewCount: 0,
                commentsCount: 0
            };

            // boardDTO를 JSON 문자열로 변환하여 FormData에 추가
            formData.append('boardDTO', new Blob([JSON.stringify(boardDTO)], {
                type: 'application/json'
            }));

            // 이미지 파일들을 FormData에 추가 (서버에서 필요한 경우)
            images.forEach((image, index) => {
                formData.append('files', image.file);
            });

            await createQna(formData);
            navigate('/QnaList');
        } catch (error) {
            console.error('게시글 작성 실패:', error);
            alert('게시글 작성 실패');
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
