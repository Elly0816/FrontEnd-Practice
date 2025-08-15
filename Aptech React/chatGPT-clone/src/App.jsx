import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';
import { sendMessageToOpenAi } from './openAi';
import { useEffect, useState, useRef } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    // {
    //   text: 'Hi, I am ChatGPT',
    //   isBot: true,
    // },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatsRef = useRef(null);

  const handleSend = async () => {
    setMessages((messages) => [...messages, { text: input, isBot: false }]);
    setInput('');
    setIsLoading(true);
    const res = await sendMessageToOpenAi(input);
    console.log(res);
    setMessages((messages) => [...messages, { text: res, isBot: true }]);
    setIsLoading(false);
  };

  const defaultSend = async (searchString) => {
    setMessages((messages) => [...messages, { text: searchString, isBot: false }]);
    setInput('');
    setIsLoading(true);
    const res = await sendMessageToOpenAi(searchString);
    console.log(res);
    setMessages((messages) => [...messages, { text: res, isBot: true }]);
    setIsLoading(false);
  };

  useEffect(() => {
    chatsRef.current.scrollTop = chatsRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="Logo" className="logo" />
            <span className="brand">ChatGPT</span>
          </div>

          <button className="midBtn" onClick={() => setMessages([])}>
            <img src={addBtn} alt="New Chat" className="addBtn" />
            New Chat
          </button>
          <div className="upperSideBottom">
            <button className="query" onClick={() => defaultSend('What is Programming?')}>
              <img src={msgIcon} alt="Query" />
              What is Programming?
            </button>
            <button className="query" onClick={() => defaultSend('How to use an API?')}>
              <img src={msgIcon} alt="Query" />
              How to use an API?
            </button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems">
            <img src={home} alt="Home" className="listitemsImg" />
            Home
          </div>
          <div className="listItems">
            <img src={saved} alt="Save" className="listitemsImg" />
            Save
          </div>
          <div className="listItems">
            <img src={rocket} alt="Upgrade" className="listitemsImg" />
            Upgrade to Pro
          </div>
        </div>
      </div>
      <div className="main">
        <div className="chats" ref={chatsRef}>
          {/* <div className="chat">
            <img className="chatImg" src={userIcon} alt="" />
            <p className="txt">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda beatae laboriosam
              nemo facilis, corrupti nisi ratione quae obcaecati, eum expedita veniam odio vitae
              sint officia quaerat officiis est similique rerum quas consectetur. Quasi, porro
              voluptate voluptates vero voluptatibus reprehenderit velit vel deserunt! Quidem
              voluptas non commodi laboriosam assumenda eaque aliquid?
            </p>
          </div>
          <div className="chat bot">
            <img className="chatImg" src={gptImgLogo} alt="" />
            <p className="txt">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure tempore magnam ad earum
              illo accusamus nobis, non odio natus? Architecto dolor fuga optio delectus a accusamus
              aliquam inventore vero itaque natus numquam deleniti rem nobis, beatae facere
              laudantium pariatur minus repellat saepe quia iure excepturi ad nesciunt! In,
              molestiae quae?
            </p>
          </div>
          <div className="chat">
            <img className="chatImg" src={userIcon} alt="" />
            <p className="txt">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda beatae laboriosam
              nemo facilis, corrupti nisi ratione quae obcaecati, eum expedita veniam odio vitae
              sint officia quaerat officiis est similique rerum quas consectetur. Quasi, porro
              voluptate voluptates vero voluptatibus reprehenderit velit vel deserunt! Quidem
              voluptas non commodi laboriosam assumenda eaque aliquid?
            </p>
          </div>
          <div className="chat bot">
            <img className="chatImg" src={gptImgLogo} alt="" />
            <p className="txt">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure tempore magnam ad earum
              illo accusamus nobis, non odio natus? Architecto dolor fuga optio delectus a accusamus
              aliquam inventore vero itaque natus numquam deleniti rem nobis, beatae facere
              laudantium pariatur minus repellat saepe quia iure excepturi ad nesciunt! In,
              molestiae quae?
            </p>
          </div>
          <div className="chat">
            <img className="chatImg" src={userIcon} alt="" />
            <p className="txt">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda beatae laboriosam
              nemo facilis, corrupti nisi ratione quae obcaecati, eum expedita veniam odio vitae
              sint officia quaerat officiis est similique rerum quas consectetur. Quasi, porro
              voluptate voluptates vero voluptatibus reprehenderit velit vel deserunt! Quidem
              voluptas non commodi laboriosam assumenda eaque aliquid?
            </p>
          </div>
          <div className="chat bot">
            <img className="chatImg" src={gptImgLogo} alt="" />
            <p className="txt">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure tempore magnam ad earum
              illo accusamus nobis, non odio natus? Architecto dolor fuga optio delectus a accusamus
              aliquam inventore vero itaque natus numquam deleniti rem nobis, beatae facere
              laudantium pariatur minus repellat saepe quia iure excepturi ad nesciunt! In,
              molestiae quae?
            </p>
          </div>
          <div className="chat">
            <img className="chatImg" src={userIcon} alt="" />
            <p className="txt">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda beatae laboriosam
              nemo facilis, corrupti nisi ratione quae obcaecati, eum expedita veniam odio vitae
              sint officia quaerat officiis est similique rerum quas consectetur. Quasi, porro
              voluptate voluptates vero voluptatibus reprehenderit velit vel deserunt! Quidem
              voluptas non commodi laboriosam assumenda eaque aliquid?
            </p>
          </div>
          <div className="chat bot">
            <img className="chatImg" src={gptImgLogo} alt="" />
            <p className="txt">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure tempore magnam ad earum
              illo accusamus nobis, non odio natus? Architecto dolor fuga optio delectus a accusamus
              aliquam inventore vero itaque natus numquam deleniti rem nobis, beatae facere
              laudantium pariatur minus repellat saepe quia iure excepturi ad nesciunt! In,
              molestiae quae?
            </p>
          </div> */}
          {!isLoading && messages.length == 0 && (
            <div className="title">
              <h1>Hi, What would you like to know?</h1>
            </div>
          )}
          {messages.map((message, index) => (
            <>
              <div className={`chat ${message.isBot && 'bot'}`} key={index}>
                <img className="chatImg" src={message.isBot ? gptImgLogo : userIcon} alt="" />
                <p className="txt">{message.text}</p>
              </div>
            </>
          ))}
          {isLoading && (
            <div className="thinking chat">
              <p>Thinking...</p>
              <div className={`ellipse`}></div>
            </div>
          )}
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Send a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="send" onClick={handleSend}>
              <img src={sendBtn} alt="Send" />
            </button>
          </div>
          <p>ChatGPT may produce incorrect results</p>
        </div>
      </div>
    </div>
  );
}

export default App;
