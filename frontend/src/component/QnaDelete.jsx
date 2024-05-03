import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {deleteQna} from "../util/APIUtils";
import {useNavigate, useParams} from "react-router-dom";

function QnaDelete(props){

    let { id } = useParams();

    const navigate = useNavigate();

    const handleDelete = () => {
        deleteQna(id)
            .then(response => {
                console.log('게시글이 성공적으로 삭제되었습니다:', response);
                window.location.href = "/QnaList";
                // 로그인 성공시 메인화면으로 이동
                // 삭제 성공 시 수행할 작업
            })
            .catch(error => {
                console.error('게시글 삭제 중 오류 발생:', error);
                // 오류 처리
            });
    }

    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    게시글 삭제
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    정말 삭제하시겠습니까?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>취소</Button>
                <Button onClick={handleDelete} href="/QnaList">삭제</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default QnaDelete;