import {Link} from "react-router-dom";
import {useState} from "react";
import StyledInput from "../components/StyledInput";
import StyledAuth from "../components/StyledAuth";
import Button from "../components/Button/Button";
import ProfileBasicImg from "../asset/image/profile-basic-img.svg";
import EditCircle from "../asset/icon/EditCircle.svg";
import Logo from "../asset/icon/Logo.svg";

export default function Signup() {
  const [disabled, setDisabled] = useState(true);
  const [clientWitch, setClientWitch] = useState(document.documentElement.clientWidth);

  return (
    <StyledAuth>
      <div>
        {clientWitch < 431 && (
          <>
            <h1>
              <img src={Logo} alt="로고" />
            </h1>
            <p>
              안녕하세요.
              <br />
              MOMOO 입니다.
            </p>
          </>
        )}
        <article>
          <Link to="/login">Login</Link>
          <h2>Signup</h2>
        </article>
        <form>
          <label htmlFor="profile-inp" className="profile">
            <img src={ProfileBasicImg} alt="프로필 사진" />
            <img src={EditCircle} alt="변경하기" />
          </label>
          <input id="profile-inp" type="file" className="a11y-hidden" />

          <label htmlFor="username-inp" className="a11y-hidden">
            사용자 이름
          </label>
          <StyledInput id="username-inp" placeholder="username" type="text" />
          <label htmlFor="email-inp" className="a11y-hidden">
            이메일
          </label>
          <StyledInput id="email-inp" placeholder="email" type="email" />
          <label htmlFor="password-inp" className="a11y-hidden">
            비밀번호
          </label>
          <StyledInput id="password-inp" placeholder="password" type="password" />
          <label htmlFor="password-inp" className="a11y-hidden">
            비밀번호 재확인
          </label>
          <StyledInput id="password-inp" placeholder="password confirm" type="password" />
          <Button size={clientWitch > 1024 ? "l" : "s"} disabled={disabled}>
            Signup
          </Button>
        </form>
      </div>
    </StyledAuth>
  );
}
