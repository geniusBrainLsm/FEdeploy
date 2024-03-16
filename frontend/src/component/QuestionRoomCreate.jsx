import React from 'react';
import '../css/Menu.css';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';

function QuestionRoomCreate(){
    return(
        <div>
            <div className="container">
                <div className="test-div">
                    <Accordion className="test-div1" defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>실시간 매칭</Accordion.Header>
                            <Accordion.Body>
                                질문방 참가
                            </Accordion.Body>
                            <Accordion.Body>
                                질문방 개설
                            </Accordion.Body>
                            <Accordion.Body>
                                이전 질문방 조회
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
                <div className="test-div2">
                    <div className="test-div3">
                        이미지
                    </div>
                    <div className="test-guide">
                        <span>실시간 매칭 / 질문방 개설</span>
                    </div>
                    <form>
                        <div className="test-div4">
                            <div>
                                <input
                                    className={"form-input"}
                                    value={""}
                                    onChange={""}
                                    type={"text"}
                                    name={"email"}
                                    placeholder={"질문방 제목"}
                                />
                            </div>
                            <div>
                                <input
                                    className={"form-input"}
                                    value={""}
                                    onChange={""}
                                    type={"text"}
                                    name={"email"}
                                    placeholder={"학생 이름 or 강사 이름"}
                                />
                            </div>
                            <div>
                                <input
                                    className={"form-input"}
                                    value={""}
                                    onChange={""}
                                    type={"text"}
                                    name={"email"}
                                    placeholder={"가격"}
                                />
                            </div>
                            <div>
                                <input
                                    className={"form-input"}
                                    value={""}
                                    onChange={""}
                                    type={"text"}
                                    name={"email"}
                                    placeholder={"비공개 설정"}
                                />
                                <Form.Check // prettier-ignore
                                    type="switch"
                                    id="custom-switch"
                                />
                            </div>
                            <button className="form-button-1">
                                생성하기
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default QuestionRoomCreate;