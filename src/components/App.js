import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import api from '../utils/Api.js';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import okImage from '../images/ok.svg';
import notOkImage from '../images/not-ok.svg';

export const BASE_URL = 'https://auth.nomoreparties.co';

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({password, email}),
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({password, email}),
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

export function getContent(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(data => data)
};

export function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  // Хук открытия попапа аватарки
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  // Хук открытия профиля для редактирования
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  // Хук открытия попапа для добавления карточки
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  // Хук открытия полноразмерной картинки
  const [selectedCard, setSelectedCard] = useState({});

  // Стейт для определения, залогинен ли пользователь
  const [loggedIn, setLoggedIn] = useState(false);

  const [isRegistered, setIsRegistered] = useState(false);

  // Стейт для установки емэйла пользователя
  const [email, setEmail] = useState("");
  
  function handleLogin(email) {
    setLoggedIn(true);
    setEmail(email);
  }

  function handleRegister(value) {
    setIsRegistered(value);
    setIsInfoTooltipOpen(true);
  }

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCardsData()])
    .then((data) => {
      setCurrentUser({
        ...data[0],
        _id: data[0]._id,
        name: data[0].name,
        about: data[0].about,
        avatar: data[0].avatar
      });
      setCards(data[1]);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true,
      link: card.link,
      name: card.name
    });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => {
          return state.map((c) => c._id === card._id ? newCard : c)
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((message) => {
        setCards((cardsAfterDel) => cardsAfterDel.filter(cardToDel => cardToDel._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(userInfo) {
    api.setUserInfo(userInfo)
      .then((user) => {
        setCurrentUser({
          ...currentUser,
          name: user.name,
          about: user.about
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatarLink) {
    api.setUserAvatar(avatarLink)
      .then((avatar) => {
        setCurrentUser({
          ...currentUser,
          avatar: avatar.avatar
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(newPlace) {
    api.createCard(newPlace)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
            <Header email={email} />
            <Routes>
              <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
              <Route path="/signup" element={<Register handleRegister={handleRegister} />} />
              <Route path="/" element={loggedIn ? <Navigate to="/main" replace /> : <Navigate to="/signin" replace />} />
              <Route path="/main" element={
                <ProtectedRoute 
                  element={Main}
                  cards={cards}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  loggedIn={loggedIn}
                />
              }
            />
            </Routes>
            <Footer />
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
            <InfoTooltip 
              isOpen={isInfoTooltipOpen} 
              onClose={closeAllPopups} 
              titleText={isRegistered ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}
              imgPath={isRegistered ? okImage : notOkImage}
            />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
};