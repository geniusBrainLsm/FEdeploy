import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./component/Header";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInModal from "./component/SignInModal";
import SignUpModal from "./component/SignUpModal";
import MainContents from "./component/MainContents"
import OAuth2RedirectHandler from './oauth2/OAuth2RedirectHandler';
import { ACCESS_TOKEN } from './constants/index';
import {getCurrentUser} from "./util/APIUtils";
import QuestionRoomCreate from "./component/QuestionRoomCreate";
import QuestionRoom from "./component/QuestionRoom";
import Footer from "./component/Footer";
import Qna from "./component/Qna";
import QnaDetail from "./component/QnaDetail";
import Test from "./component/test";

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
                <Route path="/QuestionRoomCreate" element={<QuestionRoomCreate />} />
                <Route path="/QuestionRoom" element={<QuestionRoom />} />
                <Route path="/Qna" element={<Qna />} />
                <Route path="/QnaDetail" element={<QnaDetail />}/>
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;
