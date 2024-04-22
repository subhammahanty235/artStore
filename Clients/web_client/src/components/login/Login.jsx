/* eslint-disable react/prop-types */
import './login.scss'
import { useState, useEffect } from 'react'
import { ClickAwayListener, Dialog, TextField } from '@mui/material'
import ClosePopupIcon from '../../assets/cross.svg'
import GoogleLogo from '../../assets/google-icon.svg'
import { transformEmailForOTP } from "../../utils/functions/emailUtils"
import useOtpResendTimer from "../../utils/functions/useOtpResendTimer"
import OTP from "../../utils/OtpInput"
import { useDispatch, useSelector } from 'react-redux'
import { generateOTP, loginWithOTP, loginWithPassword } from '../../redux/actions/authActions'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [showSignUp, setShowSignup] = useState(true);
    const [component, setComponent] = useState(1);
    const [userData, setUserdata] = useState({ email: "", password: "" });
    const {openLoginPanel} = useSelector((state) => state.global)
    // const [password, setPassword] = useState("");
    // const [otp, setOtp] = useState("");
    return (
        <div>
            <Dialog open={openLoginPanel}>
                <ClickAwayListener onClickAway={() => setShowSignup(false)}>
                    {
                        component === 1 ?
                            <LoginFormComponent setComponent={setComponent} setUserdata={setUserdata} userData={userData} />
                            :
                            <OTPLogin setComponent={setComponent}/>
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
    const dispatch = useDispatch()
    const onChangeHandler = (e) => {
        setUserdata({ ...userData, [e.target.name]: e.target.value })
    }

    const checkbuttonDisable = () => {
        if (userData.email !== "" && userData.password !== "") {
            setButtonDisable(false)
        } else {
            setButtonDisable(true)
        }
    }
    const closeButtonHandler = () =>{
        dispatch(
            {
              type:"CLOSE_AUTH_PANELS"
            }
          )
      }

    useEffect(() => {
        checkbuttonDisable()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData.email, userData.password])


    const SignUpButtonHandler = () =>{
        dispatch(
          {
            type:"OPEN_SIGNUP_PANEL"
          }
        )
      }


    return <>
        <div className="signup__popup__component">
            <nav className="signup__form__component__nav">
                <p className="text_style_1">Welcome Back</p>
                <img src={ClosePopupIcon} alt="" onClick={closeButtonHandler}/>
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

                <button disabled={buttonDisable} onClick={() => {dispatch(loginWithPassword(userData.email , userData.password))}}>Log in</button>

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

            <div className="signup__form__component__footer" onClick={SignUpButtonHandler}>
                <p>Don&apos;t have an account?<span> Sign up</span></p>
            </div>
        </div>
    </>
}

const OTPLogin = ({setComponent}) => {
    const [gotOtp, setGotOtp] = useState(false);
    const { minutes, seconds, startTimer, timerFinished } = useOtpResendTimer(300)
    const [emailId, setEmailId] = useState("")
    const [otp , setOtp] = useState("")
    const navigate = useNavigate()
    const {otpGenerated, signupComplete} = useSelector((state) => state.authReducer)
    

    const dispatch = useDispatch()
    useEffect(() => {
        if(otpGenerated === true){
            setGotOtp(true)
            startTimer()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[otpGenerated])

    useEffect(()=>{
        if(signupComplete === true){
            navigate("/")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[signupComplete])

    

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

                                <button disabled={emailId === ""} onClick={()=>{dispatch(generateOTP(emailId))}}>Get OTP</button>



                                <div className="previous__page__button">
                                    <p onClick={() => {setComponent(1) }}> Wanna go back to <span>previous page?</span>  </p>
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

                            <button disabled={otp.length !== 6} onClick={()=>{dispatch(loginWithOTP(emailId, otp))}}>{"Proceed"}</button>

                            <div className="previous__page__button">
                                <p onClick={()=>{setGotOtp(false)}}> Wanna go back to <span>previous page?</span>  </p>
                            </div>
                            </>
                    }

                </div>

            </div>

        </>
    )
}

export default Login
