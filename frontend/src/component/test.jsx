import React, { useState } from "react";
import '../css/TestCss.css';

function Test() {
    const [hashTag, setHashTag] = useState('');
    const [inputHashTags, setInputHashTags] = useState([]);

    const handleOnChange = (e) => {
        const { value } = e.target;
        setHashTag(value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && hashTag.trim() !== '') {
            setInputHashTags(prevHashTags => [...prevHashTags, hashTag.trim()]);
            setHashTag('');
        } else if (e.key === 'Backspace' && hashTag === '') {
            setInputHashTags(prevHashTags => prevHashTags.slice(0, -1));
        }
    }

    const handleDeleteTag = (index) => {
        setInputHashTags(prevHashTags => prevHashTags.filter((_, i) => i !== index));
    }

    return (
        <div className="hash-div1">
            <ul className="hash-ul">
                {inputHashTags.map((tag, index) => (
                    <li className="hash-li" key={index}>
                        <span>{tag}</span>
                        <button onClick={() => handleDeleteTag(index)}>Delete</button>
                    </li>
                ))}
                <input
                    value={hashTag}
                    onChange={handleOnChange}
                    onKeyDown={handleKeyDown}
                />
            </ul>
            <br />
            <br />
        </div>
    );
}

export default Test;
