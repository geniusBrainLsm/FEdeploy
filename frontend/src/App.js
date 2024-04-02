import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Test from "./component/test";
import Header from "./component/Header";
import SignInModal from "./component/SignInModal";
import SignUpModal from "./component/SignUpModal";
import MainContents from "./component/MainContents"
import OAuth2RedirectHandler from './oauth2/OAuth2RedirectHandler';
import { ACCESS_TOKEN } from './constants/index';
import {getCurrentUser} from "./util/APIUtils";
import QuestionRoomCreate from "./component/QuestionRoomCreate";
import QuestionRoom from "./component/QuestionRoom";
import Footer from "./component/Footer";
import QnaCreate from "./component/QnaCreate";
import QnaList from "./component/QnaList";
import QnaRead from "./component/QnaRead";
import QnaDelete from "./component/QnaDelete";
import QnaUpdate from "./component/QnaUpdate";

function App() {

    const [authenticated, setAuthenticated] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState(null);

    useEffect(() => {
        loadCurrentlyLoggedInUser();
    }, []);

    function loadCurrentlyLoggedInUser() {
        // 로그인 유저 정보 가져오기
        getCurrentUser()
            .then(user => {
                setCurrentUser(user);
                setAuthenticated(true);
            })
            .catch(err => {
                // Error Handling
            });
    }

    function handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN);
        setAuthenticated(false);
        setCurrentUser(null);
    }

    return (
        <Router>
            <Header authenticated={authenticated} setAuthenticated={setAuthenticated} onLogout={handleLogout}/>
            <Routes>
                <Route path="/test" element={<Test/>} />
                <Route path="/" element={<MainContents/>}/>
                <Route path="/signIn" element={<SignInModal authenticated={authenticated} setAuthenticated={setAuthenticated} onLogin={loadCurrentlyLoggedInUser}/>} />
                <Route path="/signUp" element={<SignUpModal />} />
                <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
                <Route path="/questionRoomCreate" element={<QuestionRoomCreate />} />
                <Route path="/questionRoom" element={<QuestionRoom />} />
                <Route path="/qnaList" element={<QnaList />} />
                <Route path="/qnaCreate" element={<QnaCreate />}/>
                <Route path="/qnaRead" element={<QnaRead />}/>
                <Route path="/qnaDelete" element={<QnaDelete />}/>
                <Route path="/qnaUpdate" element={<QnaUpdate />}/>
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;
