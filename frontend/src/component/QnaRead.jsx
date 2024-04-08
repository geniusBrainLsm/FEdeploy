import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

function QnaRead(){
    return(
        <div className="qna-read-container">
            <div className="qna-read-view">
                <div className="qna-read-header">
                    <div className="qna-read-header-title">
                        글 제목
                    </div>
                    <div className="qna-read-header-time">
                        <p>
                            <span>2024-04-08 16:20</span>
                            <span>&nbsp;</span>
                            <span>조회수</span>
                            <span>&nbsp;</span>
                            <span>3</span>
                        </p>
                    </div>
                </div>
                <div className="qna-read-horizon">
                </div>
                <div className="qna-read-body">
                    <div className="qna-read-body-contents">
                        햇살 가득한 아침, 작은 시골 마을은 평화롭게 깨어났다. 마을 사람들은 서로 인사를 나누며 하루를 시작했다. 가장처럼 활기찬 노인 할아버지는 오래된 나무 아래에 앉아 무언가를 생각에 잠기고 있었다.

                        한편, 어린 소년 태호는 아침 식사를 마치고 마을을 돌아다니며 새로운 모험을 찾아다녔다. 그의 꿈은 큰 세계를 여행하고 모험을 경험하는 것이었다.

                        그런데, 오늘은 조금 특별한 날이었다. 마을에는 예쁜 무늬의 꽃으로 장식된 작은 집에서 새 이웃이 이사를 오는 날이었다. 새 이웃은 인사하기도 전에 손에 든 상자를 놓고 근처에 앉아 있던 할아버지를 봤다.

                        "안녕하세요, 할아버지. 이 집은 여기 있는 건가요?" 새 이웃은 호기심 가득한 시선으로 물었다.

                        "그렇습니다. 이곳은 제 집이죠. 반가워요. 여기서 어떤 일을 하시나요?" 할아버지는 친절하게 말했다.

                        "저는 작은 작업실을 가지고 여기에서 공예품을 만들 계획이에요. 무언가를 만들어 보는 건 어떨까요?" 새 이웃은 기대감을 감추지 않았다.

                        "정말 좋네요! 그럼 제가 도와줄게요." 할아버지는 웃으며 말했다.

                        새 이웃과 할아버지는 함께 작업실에 들어가서 나무와 도구들을 꺼냈다. 함께 일하며 대화를 나누고, 서로의 이야기를 나누며 친구가 되어갔다.

                        한편, 태호는 마을을 돌아다니며 새로운 친구들을 사귀고 있었다. 그는 여러 이야기를 듣고, 새로운 경험을 쌓으며 자신의 꿈을 키워나갔다.

                        그리고 저녁이 되어, 마을 사람들은 모여 즐거운 시간을 보냈다. 새 이웃은 자랑스럽게 자신이 만든 작품을 보여주었고, 할아버지와 태호도 함께 행복한 시간을 보냈다.

                        작고 평화로운 이 마을에서, 서로를 이해하고 돕는 마음이 풍성한 삶의 소중함을 깨달았다. 함께하는 것이 가장 중요하다는 것을 마을 사람들은 알고 있었다.
                    </div>
                        <ul className="qna-read-body-hashtag">
                            <li className="qna-read-body-hashtag-li">
                                <span>태그 1번</span>
                            </li>
                            <li className="qna-read-body-hashtag-li">
                                <span>태그 2번</span>
                            </li>
                            <li className="qna-read-body-hashtag-li">
                                <span>태그 3번</span>
                            </li>
                            {/*/!*해시태그*!/*/}
                            {/*{qnaItem.tag.map((tag, tagIndex) => (*/}
                            {/*    <li className="qnaList-hash-li" key={tagIndex}>*/}
                            {/*        <span>{tag.contents}</span>*/}
                            {/*    </li>*/}
                            {/*))}*/}
                        </ul>
                </div>
                <div className="qna-read-comment-body">
                    <div className="qna-read-comment">
                        <p>
                            <span>댓글</span>
                            &nbsp;
                            <span className="qna-read-comment-count">20</span>
                        </p>
                    </div>
                    <div className="qna-read-comment-create">
                        <p className="qna-read-comment-create-p">댓글을 작성해보세요.</p>
                    </div>
                    <div className="qna-read-comment-none">
                        <div className="qna-read-comment-none">
                            <p className="qna-read-comment-none-span">
                                답변이 없습니다.
                                <br/>
                                답변을 입력해주세요!
                            </p>

                        </div>
                    </div>
                </div>
            </div>
            <div className="qna-read-sidebar">
                <div>
                    작성자
                </div>
                <div>
                    카테고리목록 기타등등
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default QnaRead;