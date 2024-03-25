import React from 'react';
import '../css/QuestionRoom.css';

function QuestionRoom(){
    return(
        <div className="question-room-container">
            <div className="room-partition-div">
                <div className="charge-div">
                    진행시간 : 50분
                </div>
                <div className="progress-time-div">
                    최종요금 : 5,000원
                </div>
                <div className="participant-list-div">
                    참가자목록
                </div>
                <div className="participant-div">
                    참가자1 참가자2
                </div>
                <div className="chat-div">
                    채팅메세지 목록

                    선생님 : 안녕하세요
                </div>
            </div>
            <div className="room-partition-div2">
                그림판
            </div>
        </div>
    );
}

export default QuestionRoom;