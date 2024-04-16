import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // 스타일 임포트

const QuillEditor = ({ className, value, onChange, placeholder }) => {
    return (
        <ReactQuill
            className={className}
            theme="snow"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
};

export default QuillEditor;
