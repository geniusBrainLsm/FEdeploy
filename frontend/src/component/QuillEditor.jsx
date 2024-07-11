import React, { useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // 스타일 임포트
import ImageResize from 'quill-image-resize-module-react';
import { Quill } from 'react-quill';
import 'quill-image-drop-module';
import {ImageDrop} from "quill-image-drop-module";

// Quill에 ImageDrop과 ImageResize 모듈 추가
Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageDrop', ImageDrop);

const QuillEditor = ({ className, value, onChange, placeholder }) => {
    const quillRef = useRef(null);
    const [images, setImages] = useState([]);

    // 이미지 핸들러 함수
    const handleImageUpload = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = () => {
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64ImageSrc = e.target.result;

                const quill = quillRef.current.getEditor();
                const range = quill.getSelection();
                quill.insertEmbed(range.index, 'image', base64ImageSrc);

                setImages(prevImages => [...prevImages, { file, base64ImageSrc }]);
            };
            reader.readAsDataURL(file);
        };
    };

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'align': [] }],
                [{ 'color': [] }, { 'background': [] }],
                ['link', 'image', 'video'],
                ['clean'],
            ],
            handlers: {
                'image': handleImageUpload,
            }
        },
        clipboard: {
            matchVisual: false,
        },
        imageDrop: true,
        imageResize: {
            parchment: Quill.import('parchment')
        }
    }), []);

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video', 'align', 'color', 'background'
    ];

    return (
        <ReactQuill
            ref={quillRef}
            className={className}
            theme="snow"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            modules={modules}
            formats={formats}
        />
    );
};

export default QuillEditor;