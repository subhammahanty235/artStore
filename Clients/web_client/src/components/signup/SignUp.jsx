/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import './signUp.scss'
import { ClickAwayListener, Dialog, TextField } from '@mui/material'
import ClosePopupIcon from '../../assets/cross.svg'
import GoogleLogo from '../../assets/google-icon.svg'
import BpCheckbox from "../../design/inputs/Inputs"
import OTP from "../../utils/OtpInput"
import { transformEmailForOTP } from "../../utils/functions/emailUtils"
import useOtpResendTimer from "../../utils/functions/useOtpResendTimer"
import { useDispatch, useSelector } from "react-redux"
import { generateOTP } from "../../redux/actions/authActions"


const SignUp = () => {
    // const dispatch = useDispatch();

    const [showSignUp, setShowSignup] = useState(true);
    const [component, setComponent] = useState(1); //1 --> 1st form, 2 --> Choose OTP or Password & 3 --> Set Otp or Password
    const [userData, setUserdata] = useState({ name: "", email: "" });
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [choosedOption, setChoosedOption] = useState(0) // 1---> create password , 2--> OTP

   



    return (
        <>

            <Dialog open={showSignUp}>
                <ClickAwayListener onClickAway={() => setShowSignup(false)}>
                    {
                        component === 1 ?
                            <SignUpFormComponent setComponent={setComponent} setUserdata={setUserdata} userData={userData} />
                            : component === 2 ?
                                <OtpAndPassword setComponent={setComponent} setChoosedOption={setChoosedOption} userData={userData}/>
                                :
                                <CollectPasswordOrOTP setOtp={setOtp}  otp={otp} password={password} setPassword={setPassword} choosedOption={choosedOption} userData={userData} setChoosedOption={setComponent}/>
                    }
                </ClickAwayListener>
            </Dialog>

        </>

    )
}

const SignUpFormComponent = ({ setComponent, setUserdata, userData }) => {

    const [acceptTnC, setAcceptTnC] = useState(false);
    const [buttonDisable , setButtonDisable] = useState(true)
    const onChangeHandler = (e) => {
        setUserdata({ ...userData, [e.target.name]: e.target.value })
    }

    const checkbuttonDisable = () =>{
        if(userData.name != "" && userData.email != "" && acceptTnC === true) {
            setButtonDisable(false)
        }else{
            setButtonDisable(true)
        }
    }

    useEffect(()=>{
        checkbuttonDisable()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userData.name , userData.email , acceptTnC] )



    return <>
        <div className="signup__popup__component">
            <nav className="signup__form__component__nav">
                <p className="text_style_1">Sign up</p>
                <img src={ClosePopupIcon} alt="" />
            </nav>

            <div className="signup__form__component__body">
                <div className="signup__form__component__body__inputs">
                    <TextField fullWidth id="outlined-basic" size="small" label="Full Name" variant="outlined" value={userData.name} name="name" onChange={onChangeHandler} />
                    <TextField fullWidth id="outlined-basic" size="small" label="Email" variant="outlined" value={userData.email} name="email" onChange={onChangeHandler} />
                </div>
                <div className="signup__form__component__tandc">
                    <BpCheckbox value={acceptTnC} onChange={() => { setAcceptTnC(!acceptTnC) }} />
                    <p>I agree to Storyes <span>Terms of Service. Privacy Policy</span> and <span> <br /> Content Policies</span> </p>
                </div>

                <button disabled={buttonDisable} onClick={() => { setComponent(2) }}>Create Account</button>

                <div className="other__login__text">
                    <span></span>
                    <p>Or</p>
                    <span></span>
                </div>

                <div className="other__login__method__icons">
                    <img src={GoogleLogo} alt="" />
                </div>
            </div>

            <div className="signup__form__component__footer">
                <p>Already have an account?<span> Log in</span></p>
            </div>
        </div>
    </>
}


const OtpAndPassword = ({ setComponent, setChoosedOption , userData}) => {
    const dispatch = useDispatch();
    const {otpGenerated} = useSelector((state) => state.authReducer)
    const handleChooseOption = (option) => {
        if(option === 2){
            dispatch(generateOTP(userData.email))
            setChoosedOption(option)
            
        }else{
            setChoosedOption(option)
            setComponent(3)
        }
    }

    useEffect(() => {
        if(otpGenerated === true){
            setComponent(3)
        }
    },[otpGenerated])





    return (
        <>
            <div className="signup__popup__component">
                <nav className="signup__form__component__nav">
                    <p className="text_style_1">Sign up</p>
                    <img src={ClosePopupIcon} alt="" />
                </nav>

                <div className="signup__form__component__body">
                    <div className="create__password__otp__card" onClick={() => handleChooseOption(1)}>
                        <div className="create__password__otp__card__left">
                            <h3>Password</h3>
                            <p>Create a password so that you can <br /> login to your account easily</p>
                        </div>
                        <div className="create__password__otp__card__right">

                        </div>
                    </div>

                    <div className="other__login__text">
                        <span></span>
                        <p>Or</p>
                        <span></span>
                    </div>

                    <div className="create__password__otp__card" onClick={() => handleChooseOption(2)}>
                        <div className="create__password__otp__card__left">
                            <h3>One Time Password (OTP)</h3>
                            <p>Don&apos;t wanna remember the passwords, <br />
                                let&apos;s go with passwordless using OTP
                            </p>
                        </div>
                        <div className="create__password__otp__card__right">

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

const CollectPasswordOrOTP = ({ setOtp, otp, password, setPassword, choosedOption, userData , setChoosedOption}) => {
    // eslint-disable-next-line no-unused-vars
    const { minutes, seconds, startTimer, active, resetTimer, timerFinished } = useOtpResendTimer(300)

    const [confirmPassword, setConfirmPassword] = useState("")

    const [disableButton, setDisablebutton] = useState(true)

    useEffect(() => {
        if (choosedOption === 2) {
            if (otp.length === 6) {
                setDisablebutton(false)
            }
        } else {
            if (password === confirmPassword && password !== "" && confirmPassword !== "") {
                setDisablebutton(false)
            } else {
                setDisablebutton(true)
            }
        }
    }, [otp, password, confirmPassword])

    useEffect(() => {
        startTimer(); // Automatically start the timer when the component mounts
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const backToPreviousPage = () =>{
        setChoosedOption(2);
        setOtp("")
        setPassword("")
        setConfirmPassword("")
    }
    return (
        <>
            <div className="signup__popup__component">
                <nav className="signup__form__component__nav">
                    <p className="text_style_1">Sign up</p>
                    <img src={ClosePopupIcon} alt="" />
                </nav>
                {
                    choosedOption === 1 ?
                        <div className="signup__form__component__body">
                            {/* <p className="create__your__password__heading">Create a Password</p> */}
                            <div className="signup__form__component__body__inputs">
                                <TextField fullWidth id="outlined-basic" size="small" label="subhammahanty235@gmail.com" variant="outlined" disabled="true" />
                                <TextField fullWidth id="outlined-basic" size="small" label="New Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <TextField fullWidth id="outlined-basic" size="small" label="Confirm Password" variant="outlined" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <div className="signup__form__component__tandc">
                                <BpCheckbox />
                                <p> remember me on this device </p>
                            </div>

                            <button disabled={disableButton} >Create Account</button>

                            <div className="previous__page__button">
                                <p onClick={backToPreviousPage}> Wanna go back to <span>previous page?</span> </p>
                            </div>
                        </div>
                        :

                        <div className="signup__form__component__body">
                            {/* <p className="create__your__password__heading">Create a Password</p> */}
                            <p className="otp__input__heading">
                                Verification code has been sent to your email, {transformEmailForOTP(userData.email)}, please enter the same here to complete the signup. Valid for 5 minutes.
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

                            <button disabled={disableButton}>Proceed</button>

                            <div className="previous__page__button">
                                <p onClick={backToPreviousPage}> Wanna go back to <span>previous page?</span>  </p>
                            </div>
                        </div>
                }



            </div>
        </>
    )
}


export default SignUp