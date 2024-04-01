import React, { useState } from "react";
import '../css/TestCss.css';

function Test() {
    // const [hashTag, setHashTag] = useState('');
    // const [inputHashTags, setInputHashTags] = useState([]);
    //
    // const handleOnChange = (e) => {
    //     const { value } = e.target;
    //     setHashTag(value);
    // }
    //
    // const handleKeyDown = (e) => {
    //     if (e.key === 'Enter' && hashTag.trim() !== '') {
    //         setInputHashTags(prevHashTags => [...prevHashTags, hashTag.trim()]);
    //         setHashTag('');
    //         e.preventDefault();
    //     } else if (e.key === 'Backspace' && hashTag === '') {
    //         setInputHashTags(prevHashTags => prevHashTags.slice(0, -1));
    //     }
    // }

    // const handleDeleteTag = (index) => {
    //     setInputHashTags(prevHashTags => prevHashTags.filter((_, i) => i !== index));
    // }
    //
    // const handleSubmit = (e) => {
    //     e.preventDefault(); // 기본 제출 동작을 막습니다.
    //     // 이곳에 필요한 처리를 추가하세요 (예: 해시 태그를 추가하는 로직)
    // }

    return (
        <div className="hash-div1">
            {/*<form onSubmit={handleSubmit}> /!* onSubmit 이벤트를 캡처하여 기본 제출 동작을 막습니다. *!/*/}
            {/*    <ul className="hash-ul">*/}
            {/*        {inputHashTags.map((tag, index) => (*/}
            {/*            <li className="hash-li" key={index}>*/}
            {/*                <span className="hash-span">{tag}</span>*/}
            {/*                <button className="hash-delete-btn" onClick={() => handleDeleteTag(index)}>*/}
            {/*                    <svg*/}
            {/*                        width="8"*/}
            {/*                        height="8"*/}
            {/*                        viewBox="0 0 100 100"*/}
            {/*                        xmlns="http://www.w3.org/2000/svg"*/}
            {/*                        style={{ cursor: 'pointer' }}*/}
            {/*                    >*/}
            {/*                        <line x1="10" y1="10" x2="90" y2="90" stroke="black" strokeWidth="20" />*/}
            {/*                        <line x1="90" y1="10" x2="10" y2="90" stroke="black" strokeWidth="20" />*/}
            {/*                    </svg>*/}
            {/*                </button>*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*    <input*/}
            {/*        value={hashTag}*/}
            {/*        onChange={handleOnChange}*/}
            {/*        onKeyDown={handleKeyDown}*/}
            {/*        placeholder="태그를 설정하세요"*/}
            {/*    />*/}
            {/*</form>*/}
            <br />
            <br />
        </div>
    );
}

export default Test;