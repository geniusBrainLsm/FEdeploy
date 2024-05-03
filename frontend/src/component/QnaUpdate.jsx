import QuillEditor from "./QuillEditor";
import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {createQna, currentUser} from "../util/APIUtils";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function QnaUpdate(props){

    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    게시글 수정
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    정말 수정하시겠습니까?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>수정</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default QnaUpdate;