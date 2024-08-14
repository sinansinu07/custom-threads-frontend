import axios from "axios";
import { useAuth } from "../../context/AuthContext"
import React, { useState } from 'react';
// import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import NavBar from "../NavBar";
import { Alert } from "reactstrap";

Array.prototype.findErrors = function(name) {
    let result = ""
    this.forEach(ele => {
        if(ele.path === name) {
            result += ele.msg
        }
    })
    return result
    // for(let i = 0; i < this.length; i++) {
    //     let result = ""
    //     if(this[i].path === name) {
    //         result += this[i].msg
    //     }
    //     return result
    // }
}

export default function CustomerProfile() {

    const { user,setUser } = useAuth()

    console.log('user',user)

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState({
        number:""
    })
    const [OTP,setOTP] = useState({
        sentOTP :""
    })

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [verifyMssg, setVerifyMssg] = useState("")
    const [verifiedMssg, setVerifiedMssg] = useState("")

    const [usernameModal, setUsernameModal] = useState(false)
    const [passwordModal, setPasswordModal]= useState(false)
    const [emailModal, setEmailModal] = useState(false)
    const [phoneModal, setPhoneModal] = useState(false)
    const [OTPModal, setOTPModal] = useState(false)

    const [usernameServerErrors, setUsernameServerErrors] = useState("")
    const [usernameFormErrors, setUsernameFormErrors] = useState("")
    const [emailServerErrors, setEmailServerErrors] = useState("")
    const [emailFormErrors, setEmailFormErrors] = useState("")
    const [phoneServerErrors, setPhoneServerErrors] = useState("")
    const [phoneFormErrors, setPhoneFormErrors] = useState("")
    const [otpServerErrors, setOtpServerErrors] = useState("")
    const [otpFormErrors, setOtpFormErrors] = useState("")
    const [passwordServerErrors, setPasswordServerErrors] = useState("")
    const [passwordFormErrors, setPasswordFormErrors] = useState("")

    const usernameErrors = {}
    const emailErrors = {}
    const phoneErrors = {}
    const otpErrors = {}
    const passwordErrors = {}

    const validateUsernameErrors = () => {
        if(username.trim().length === 0){
            usernameErrors.username = "Update the new Username"
        }
    }
    validateUsernameErrors()

    const validateEmailErrors = () => {
        if(email.trim().length === 0){
            emailErrors.email = "Update the new Email"
        }
    }
    validateEmailErrors()

    const validatePhoneErrors = () => {
        if(phone.number?.trim().length === 0) {
            phoneErrors.phone = "Update the new Phone Number"
        } 
        // if(phone.length === 0) {
        //     phoneErrors.phone = "Update the new Phone Number"
        // }
        if(phone.length < 10){
            if(phone.length === 0) {
                phoneErrors.phone = "Update the new Phone Number"
            } else {
                phoneErrors.phone = "Invalid Number format"
            }
        }
    }
    validatePhoneErrors()

    const validateOtpErrors = () => {
        if(OTP.sentOTP?.trim().length === 0){
            otpErrors.otp = "Enter the Otp Number"
        }
    }
    validateOtpErrors()

    const validatePasswordErrors = () => {
        if(currentPassword.trim().length === 0){
            passwordErrors.currentPassword = "Current Password is required"
        }
        if(newPassword.trim().length === 0){
            passwordErrors.newPassword = "New Password is required"
        }
        if(newPassword !== confirmPassword) {
            passwordErrors.confirmPassword = "Passwords do not match"
        }
    }
    validatePasswordErrors()

    const toggleUsername = () => {
        setUsernameModal(!usernameModal)
        setUsernameFormErrors("")
        setUsernameServerErrors("")
        setUsername("")
    }

    const toggleChangePassword = () => {
        setPasswordModal(!passwordModal)
        setPasswordFormErrors("")
        setPasswordServerErrors("")
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
    }

    const toggleEmail = () => {
        setEmailModal(!emailModal)
        setEmailFormErrors("")
        setEmailServerErrors("")
        setEmail("")
    }
    const togglePhone = () => {
        setPhoneModal(!phoneModal)
        setPhoneFormErrors("")
        setPhoneServerErrors("")
    }
    const toggleOTP = () => {
        setOTPModal(!OTPModal)
        setOtpFormErrors("")
        setOtpServerErrors("")
    }

    // const navigate = useNavigate()

    const handleVerifyEmail = async () => {
        if(!user.isVerified) {
            try {
                const response = await axios.post("http://localhost:5000/api/user/verifyLink", {}, {
                headers: {
                Authorization: localStorage.getItem("token"),
                }
                })
                setVerifyMssg(response.data[0].message)
                alert(response.data[0].message)
                console.log(response.data[0].message)
            } catch(err) {
                setVerifyMssg(err.response.data)
                alert(err.message)
                console.log(err)
            }
        } else {
            setVerifiedMssg("Email already verified")
            if(verifiedMssg) {
                alert(verifiedMssg)
            }
        }
    }

    const handleChangeUsername = async (e) => {
        // console.log(username)
        e.preventDefault()
        if(Object.keys(usernameErrors).length === 0) {
            try {
                const response = await axios.put("http://localhost:5000/api/user/changeUsername", {username}, {
                    headers : {
                        Authorization: localStorage.getItem("token")
                    }
                })
                console.log(response.data)
                alert("Username Successfully Changed")
                user.username = username
                setUser(user)
                toggleUsername()
                setUsername("")
                setUsernameServerErrors("")
                setUsernameFormErrors("")
            } catch(err) {
                console.log(err)
                // alert(err.message)
                setUsernameServerErrors(err.response.data.errors)
                console.log(usernameServerErrors)
                setUsernameFormErrors("")
            }
        } else {
            setUsernameFormErrors(usernameErrors)
            setUsernameServerErrors("")
        }
    }

    const handleChangeEmail = async (e) => {
        // console.log(username)
        e.preventDefault()
        if(Object.keys(emailErrors).length === 0) {
            try {
                const response = await axios.put("http://localhost:5000/api/user/changeEmail", {email}, {
                    headers : {
                        Authorization: localStorage.getItem("token")
                    }
                })
                console.log(response.data)

                alert("email Successfully Changed")
                user.email = email
                setUser(user)
                toggleEmail()
                setEmail("")
                setEmailFormErrors("")
                setEmailServerErrors("")
            } catch(err) {
                console.log(err)
                // alert(err.message)
                setEmailServerErrors(err.response.data.errors)
                console.log(setEmailServerErrors)
                setEmailFormErrors("")
            }
        } else {
            setEmailFormErrors(emailErrors)
            setEmailServerErrors("")
        }
    }

    const handleChangePhone = async (e) => {
        // console.log(username)
        e.preventDefault()
        if(Object.keys(phoneErrors).length === 0) {
            try {
                const response = await axios.post("http://localhost:5000/api/user/changePhoneSendOTP", {phone}, {
                    headers : {
                        Authorization: localStorage.getItem("token")
                    }
                })
                console.log(response.data)
                alert("OTP sent Successfully")
                togglePhone()
                toggleOTP()
                // setPhone("")
                setPhoneServerErrors("")
                setPhoneFormErrors("")
            } catch(err) {
                console.log(err)
                // alert(err.message)
                toggleOTP()
                if(err.response.data.message){
                    setPhoneServerErrors(err.response.data)
                } else {
                    setPhoneServerErrors(err.response.data.errors)
                }
                console.log(phoneServerErrors)
                setPhoneFormErrors("")
            }
        } else {
            setPhoneFormErrors(phoneErrors)
            setPhoneServerErrors("")
        }
    }

    const handleVerifyPhoneOTP = async(e)=>{
        console.log(OTP)
        e.preventDefault()
        if(Object.keys(otpErrors).length === 0) {
            try {
                const response = await axios.post("http://localhost:5000/api/user/changePhoneVerifyOTP", {OTP,phone}, {
                    headers : {
                        Authorization: localStorage.getItem("token")
                    }
                })
                console.log(response.data)
                alert("Phone Number Successfully Changed")
                user.phone.number = phone
                setUser(user)
                toggleOTP()
                setPhone("")
                setOTP("")
                setOtpFormErrors("")
                setOtpServerErrors("")
            } catch(err) {
                console.log(err)
                // alert(err.message)
                setOtpServerErrors(err.response.data.message)
                console.log(otpServerErrors)
                setOtpFormErrors("")
            }
        } else {
            setOtpFormErrors(otpErrors)
            setOtpServerErrors("")
        }
    }

    const handleChangePassword = async (e) => {
        e.preventDefault()
        // console.log(currentPassword, newPassword)
        if(Object.keys(passwordErrors).length === 0) {
            try {
                const response = await axios.post("http://localhost:5000/api/user/changePassword",{currentPassword, newPassword}, {
                    headers : {
                        Authorization: localStorage.getItem("token")
                    }
                })
                console.log(response.data)
                alert(response.data.message)
                setPasswordFormErrors("")
                setPasswordServerErrors("")
                setCurrentPassword("")
                setNewPassword("")
                setConfirmPassword("")
                toggleChangePassword("")
            } catch(err) {
                setPasswordFormErrors("")
                setPasswordServerErrors(err.response.data.message)
                console.log(passwordServerErrors)
                // alert(err.message)
            }
        } else {
            setPasswordFormErrors(passwordErrors)
            // console.log(passwordFormErrors)
            setPasswordServerErrors("")
        }
    }

  return (
    <div>
        <NavBar />
        <h2 style={{ marginTop : '20px' }}>Your Profile</h2>
        <div className='account-card'>
            <div className='card'>
              <div className='card-body'>
                    <span> Username : {user.username}</span><br/>
                    <Link className="link-style" onClick={() => {
                        toggleUsername()
                    }}>Change Username</Link>
                </div>
            </div>
            <div className='card'>
                <div className='card-body'>
                    <span> Email : {user.email}</span> {user.isVerified ? <FaCheck style={{color: "green"}}/> : <FaXmark style={{color: "red"}}/>}<br/>
                    <Link className="link-style" onClick={() => {
                        toggleEmail()
                    }}> Change Email </Link> | 
                    <Link className="link-style" onClick={handleVerifyEmail} > Verify Email </Link>
                </div>
                
            </div>
            {verifyMssg && !user.isVerified  && <Alert color="danger" style={{ width : "104%" }}>{verifyMssg}</Alert>}
            <div className='card'>
                <div className='card-body'>
                    <span> Phone : {user.phone.countryCode}-{user.phone.number}</span> {user.phone.isVerified ? <FaCheck style={{color: "green"}}/> : <FaXmark style={{color: "red"}}/>}<br/>
                    <Link className="link-style" onClick={() => {
                        togglePhone()
                    }}> Change Phone </Link> | 
                    <Link className="link-style" to="/verify-number"> Verify Phone </Link>
                </div>
            </div>
        </div>
        <div>
            <Link 
                className="link-style" 
                style={{display: "flex", justifyContent: "right", marginRight : "380px"}}
                onClick={() => {
                    toggleChangePassword()
                }}
            > Change Password </Link>
        </div>
        <div>
        <Modal isOpen={usernameModal} toggle={toggleUsername}>
            <ModalHeader toggle={toggleUsername}>Change Username</ModalHeader>
            <ModalBody>
            <form>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="username"
                    >Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => {setUsername(e.target.value)}}
                        id="username"
                        name="username"
                        className="form-control"
                    />
                </div>
                {usernameFormErrors.username && <Alert color="danger" style={{marginTop : "10px"}}>{usernameFormErrors.username}</Alert>}
                {usernameServerErrors && usernameServerErrors.findErrors("username") && <Alert color="danger" style={{marginTop : "10px"}}>{usernameServerErrors.findErrors("username")}</Alert>}
                <input type="submit" onClick={handleChangeUsername}  className="button-style btn btn-primary" style={{ width: "20%", marginTop: "10px" }}/>
            </form>
            </ModalBody>
        </Modal>

        <Modal isOpen={emailModal} toggle={toggleEmail}>
            <ModalHeader toggle={toggleEmail}>Change Email</ModalHeader>
            <ModalBody>
            <form>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="email"
                    >Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}}
                        id="email"
                        name="email"
                        className="form-control"
                    />
                </div>
                {emailFormErrors.email && <Alert color="danger" style={{marginTop : "10px"}}>{emailFormErrors.email}</Alert>}
                {emailServerErrors && emailServerErrors.findErrors("email") && <Alert color="danger" style={{marginTop : "10px"}}>{emailServerErrors.findErrors("email")}</Alert>}
                <input type="submit" onClick={handleChangeEmail}  className="button-style btn btn-primary" style={{ width: "20%", marginTop: "10px" }}/>
            </form>
            </ModalBody>
        </Modal>

        <Modal isOpen={phoneModal} toggle={togglePhone}>
            <ModalHeader toggle={togglePhone}>Change Phone</ModalHeader>
            <ModalBody>
            <form>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="phone"
                    >Phone</label>
                    <input
                        type="text"
                        value={phone.number}
                        onChange={(e) => {setPhone(e.target.value)}}
                        id="phone"
                        name="phone"
                        className="form-control"
                    />
                </div>
                {/* {phoneFormErrors.phone ? (
                    phoneFormErrors.phone && <Alert color="danger" style={{marginTop : "10px"}}>{phoneFormErrors.phone}</Alert>
                ) : (
                    phoneServerErrors.message ? <Alert color="danger" style={{marginTop : "10px"}}>{phoneServerErrors.message}</Alert> : (phoneServerErrors && phoneServerErrors?.findErrors("phone") && (<Alert color="danger" style={{marginTop : "10px"}}>{phoneServerErrors?.findErrors("phone")}</Alert>))
                )} */}
                {phoneFormErrors.phone && <Alert color="danger" style={{marginTop : "10px"}}>{phoneFormErrors.phone}</Alert>}
                {phoneServerErrors.message ? <Alert color="danger" style={{marginTop : "10px"}}>{phoneServerErrors.message}</Alert> : (phoneServerErrors && phoneServerErrors?.findErrors("phone") && (<Alert color="danger" style={{marginTop : "10px"}}>{phoneServerErrors?.findErrors("phone")}</Alert>))}
                <input type="button" value="Sent Otp" onClick={handleChangePhone}  className="button-style btn btn-primary" style={{ width: "20%", marginTop: "10px" }}/>
            </form>
            </ModalBody>
        </Modal>
        <Modal isOpen={OTPModal} toggle={toggleOTP}>
            <ModalHeader toggle={toggleOTP}>Verify OTP</ModalHeader>
            <ModalBody>
            <form>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="sentOTP"
                    >OTP</label>
                    <input
                        type="text"
                        value={OTP.sentOTP}
                        onChange={(e) => {setOTP(e.target.value)}}
                        id="sentOTP"
                        name="sentOTP"
                        className="form-control"
                    />
                </div>
                {otpFormErrors.otp && <Alert color="danger" style={{marginTop : "10px"}}>{otpFormErrors.otp}</Alert>}
                {otpServerErrors && <Alert color="danger" style={{marginTop : "10px"}}>{otpServerErrors}</Alert>}
                <input type="submit" onClick={handleVerifyPhoneOTP}  className="button-style btn btn-primary" style={{ width: "20%", marginTop: "10px" }}/>
            </form>
            </ModalBody>
        </Modal>
        <Modal isOpen={passwordModal} toggle={toggleChangePassword}>
            <ModalHeader toggle={toggleChangePassword}>Change Password</ModalHeader>
            <ModalBody>
                {passwordServerErrors && <Alert color="danger" style={{marginTop : "10px"}}>{passwordServerErrors}</Alert>}
                <form onSubmit={handleChangePassword}>
                    <div className="form-group">
                        <label className="form-label">Current Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={currentPassword}
                            onChange={(e) => {setCurrentPassword(e.target.value)}}
                            id="currentPassword"
                            name="currentPassword"
                        />
                    </div>
                    {passwordFormErrors.currentPassword && <Alert color="danger" style={{marginTop : "10px"}}>{passwordFormErrors.currentPassword}</Alert>}
                    <div className="form-group">
                        <label className="form-label">New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={newPassword}
                            onChange={(e) => {setNewPassword(e.target.value)}}
                            id="newPassword"
                            name="newPassword"
                        />
                    </div>
                    {passwordFormErrors.newPassword && <Alert color="danger" style={{marginTop : "10px"}}>{passwordFormErrors.newPassword}</Alert>}
                    <div className="form-group">
                        <label className="form-label">Confirm new Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => {setConfirmPassword(e.target.value)}}
                            id="confirmPassword"
                            name="confirmPassword"
                        />
                    </div>
                    {passwordFormErrors.confirmPassword && <Alert color="danger" style={{marginTop : "10px"}}>{passwordFormErrors.confirmPassword}</Alert>}
                    <input className="button-style-changePassword btn btn-primary" type="submit" value="Change"/> 
                </form>
            </ModalBody>
        </Modal>
        </div>
    </div>
  );
}
