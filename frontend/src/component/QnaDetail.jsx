import React from "react";
import '../css/Qna.css';
import ReactQuill from "react-quill";

function QnaDetail(){
    return(
        <div className="qna-detail-wrapper">
            <div>
                <input
                    placeholder={"글제목"}
                />
            </div>
            <div>
                <input
                    placeholder={"태그설정"}
                />
            </div>
            <div>
                    <ReactQuill className="qna-detail-editor"/>
            </div>
            <div>
                <button>취소</button>
                <button>등록</button>
            </div>
        </div>
    )
}

export default QnaDetail;