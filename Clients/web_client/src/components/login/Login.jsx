import './login.scss'
import { useState, useEffect } from 'react'
import { ClickAwayListener, Dialog, TextField } from '@mui/material'
import ClosePopupIcon from '../../assets/cross.svg'
import GoogleLogo from '../../assets/google-icon.svg'
import BpCheckbox from "../../design/inputs/Inputs"
import { transformEmailForOTP } from "../../utils/functions/emailUtils"
import useOtpResendTimer from "../../utils/functions/useOtpResendTimer"
import OTP from "../../utils/OtpInput"

const Login = () => {
    const [showSignUp, setShowSignup] = useState(true);
    const [component, setComponent] = useState(1);
    const [userData, setUserdata] = useState({ email: "", password: "" });
    // const [password, setPassword] = useState("");
    // const [otp, setOtp] = useState("");
    return (
        <div>
            <Dialog open={showSignUp}>
                <ClickAwayListener onClickAway={() => setShowSignup(false)}>
                    {
                        component === 1 ?
                            <LoginFormComponent setComponent={setComponent} setUserdata={setUserdata} userData={userData} />
                            :
                            <OTPLogin />
                        //     <CollectPasswordOrOTP setOtp={setOtp}  otp={otp} password={password} setPassword={setPassword} choosedOption={choosedOption} userData={userData} setChoosedOption={setComponent}/>
                    }
                </ClickAwayListener>
            </Dialog>
        </div>
    )
}
const LoginFormComponent = ({ setComponent, setUserdata, userData }) => {

    // const [acceptTnC, setAcceptTnC] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(true)
    const onChangeHandler = (e) => {
        setUserdata({ ...userData, [e.target.name]: e.target.value })
    }

    const checkbuttonDisable = () => {
        if (userData.email != "" && userData.password != "") {
            setButtonDisable(false)
        } else {
            setButtonDisable(true)
        }
    }

    useEffect(() => {
        checkbuttonDisable()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData.email, userData.password])



    return <>
        <div className="signup__popup__component">
            <nav className="signup__form__component__nav">
                <p className="text_style_1">Welcome Back</p>
                <img src={ClosePopupIcon} alt="" />
            </nav>

            <div className="signup__form__component__body">


                <div className="signup__form__component__body__inputs">
                    <TextField fullWidth id="outlined-basic" size="small" label="Email Id" variant="outlined" value={userData.email} name="email" onChange={onChangeHandler} />
                    <TextField fullWidth id="outlined-basic" size="small" label="Password" variant="outlined" value={userData.password} name="password" onChange={onChangeHandler} />
                </div>
                <span className="login__button__gap">Forgot password?</span>
                {/* <div className="signup__form__component__tandc">
                    <BpCheckbox value={acceptTnC} onChange={() => { setAcceptTnC(!acceptTnC) }} />
                    <p>I agree to Storyes <span>Terms of Service. Privacy Policy</span> and <span> <br /> Content Policies</span> </p>
                </div> */}

                <button disabled={buttonDisable} onClick={() => { setComponent(2) }}>Log in</button>

                <div className="other__login__text">
                    <span></span>
                    <p>Or</p>
                    <span></span>
                </div>

                <div className="other__login__methods">

                    <img src={GoogleLogo} alt="" />

                    <span onClick={() => setComponent(2)}>OTP</span>
                </div>
            </div>

            <div className="signup__form__component__footer">
                <p>Don&apos;t have an account?<span> Sign up</span></p>
            </div>
        </div>
    </>
}

const OTPLogin = () => {
    const [gotOtp, setGotOtp] = useState(false);
    const { minutes, seconds, startTimer, active, resetTimer, timerFinished } = useOtpResendTimer(300)
    const [emailId, setEmailId] = useState("")
    const [otp , setOtp] = useState("")

    return (
        <>
            <div className="signup__popup__component">
                <nav className="signup__form__component__nav">
                    <p className="text_style_1">Welcome Back</p>
                    <img src={ClosePopupIcon} alt="" />
                </nav>

                <div className="signup__form__component__body">
                    {
                        gotOtp === false ?
                            <>
                                <p className="otp__login__heading__para">Enter your <span>Email Id, </span><br /> to get the One Time Password <span>(OTP)</span></p>
                                <TextField fullWidth id="outlined-basic" size="small" label="Email Id" variant="outlined" value={emailId} name="emailId" onChange={(e) => setEmailId(e.target.value)} />
                                <br />

                                <button disabled={emailId === ""} onClick={()=>{setGotOtp(true);startTimer()}}>Get OTP</button>



                                <div className="previous__page__button">
                                    <p onClick={() => { }}> Wanna go back to <span>previous page?</span>  </p>
                                </div>
                            </>
                            :
                            <>
                            <p className="otp__input__heading">
                                Verification code has been sent to your email, {transformEmailForOTP(emailId)}, please enter the same here to complete the signup. Valid for 5 minutes.
                            </p>
                            <div className="signup__form__component__body__otp">
                                <OTP separator={<span>-</span>} length={6} value={otp} onChange={setOtp} />
                            </div>
                            <div className="resend__otp__section">
                                {
                                    timerFinished === true ?
                                        <p className="resend__button">Resend OTP</p> :
                                        <p className="resend__otp__timer">Resend in {minutes}:{seconds}</p>

                                }

                            </div>
                            {/* <div className="signup__form__component__tandc">
                                <BpCheckbox />
                                <p>remember me on this device </p>
                            </div> */}

                            <button disabled={otp.length !== 6} onClick={()=>{}}>{"Proceed"}</button>

                            <div className="previous__page__button">
                                <p onClick={()=>{}}> Wanna go back to <span>previous page?</span>  </p>
                            </div>
                            </>
                    }

                </div>

            </div>

        </>
    )
}

export default Login
