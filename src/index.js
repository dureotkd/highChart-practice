import React, { Profiler } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

/**
 * /domain 도메인에 따라서 리액트 화면전환을 자동으로 해주는 고마운 라이브러리
 * 뭐... 개인이 비슷하게 만들 수 있지만 궃이..? 이거쓰면 코드 더 보기 쉬워지고 깔끔해짐 (기능도 더 많음 뒤로가기 지원 이런거?)
 */
import { BrowserRouter } from "react-router-dom"; // 브라우저 라우터

const root = ReactDOM.createRoot(document.getElementById("root"));

function onRenderCallback(
  id,
  phase, // mount | update
  actualDuration, // 렌더링 시간
  baseDuration, // 전체 서브트리를 렌더링하는데 걸린 시간
  startTime, // 렌더링을 시작한 시간
  commitTime, // 업데이트요청한 시간
  interactions // trace set
) {
  // console.log(phase, actualDuration, baseDuration);
}
root.render(
  // <React.StrictMode>
  <Profiler id="Render" onRender={onRenderCallback}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Profiler>
  // </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
