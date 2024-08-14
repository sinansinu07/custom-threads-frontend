import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { Alert, Modal, ModalBody, ModalHeader } from "reactstrap"

export default function ForgotPassword() {

    const navigate = useNavigate()

    const [phone, setPhone] = useState("")
    const [sentOtp, setSentOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [modal, setModal] = useState(false)

    const [otpServerErrors, setOtpServerErrors] = useState("")
    const [otpFormErrors, setOtpFormErrors] = useState("")
    const [passwordServerErrors, setPasswordServerErrors] = useState("")
    const [passwordFormErrors, setPasswordFormErrors] = useState("")
    const otpErrors = {}
    const passwordErrors = {}

    const validateErrors = () => {
        if(phone.trim().length === 0){
            otpErrors.phone = "Phone Number is required"
        }
    }
    validateErrors()

    const validatePasswordErrors = () => {
        if(sentOtp.trim().length === 0){
            passwordErrors.sentOtp = "Otp is required"
        }
        if(newPassword.trim().length === 0){
            passwordErrors.newPassword = "New Password is required"
        }
        if(newPassword !== confirmPassword) {
            passwordErrors.confirmPassword = "Passwords do not match"
        }
    }
    validatePasswordErrors()

    const toggleChangePassword = () => {
        setModal(!modal)
        setOtpFormErrors("")
        setOtpServerErrors("")
        setNewPassword("")
        setConfirmPassword("")
    }

    const handleForgotPassword = async (e) => {
        e.preventDefault()
        if(Object.keys(otpErrors).length === 0) {
            try {
                const response = await axios.post("http://localhost:5000/api/user/forgotPassword", {phone})
                console.log(response)
                setPhone("")
                setOtpFormErrors("")
                setOtpServerErrors("")
                toggleChangePassword()
            } catch(err) {
                setOtpServerErrors(err.response.data.message)
                console.log(otpServerErrors)
                setOtpFormErrors("")
                // toggleChangePassword()
            }
        }
        else {
            setOtpFormErrors(otpErrors)
            setOtpServerErrors("")
        }
    }

    const handleChangePassword = async (e) => {
        e.preventDefault()
        // console.log(currentPassword, newPassword)
        if(Object.keys(passwordErrors).length === 0) {
            try {
                const response = await axios.post("http://localhost:5000/api/user/newPassword",{sentOtp, newPassword})
                console.log(response.data)
                alert(response.data.message)
                navigate("/")
                setPasswordFormErrors("")
                setPasswordServerErrors("")
                setSentOtp("")
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
            <form onSubmit={handleForgotPassword}>
                <div className="form-group" style={{marginTop : "20px"}}>
                    <label className="form-label" style={{fontSize : "20px"}}>Enter the Registered Phone Number</label>
                    <input
                        className="form-control"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        id="phone"
                        name="phone"
                        style={{width: "20%",
                            display: "block",
                            margin: "0 auto",
                            marginTop: "5px"}}
                    />
                </div>
                <div style={{marginTop: "10px"}}>
                    {otpFormErrors.phone && <Alert color="danger" style={{width: "20%", display: "block", margin: "0 auto"}}>{otpFormErrors.phone}</Alert>}
                    {otpServerErrors && <Alert color="danger" style={{width: "20%", display: "block", margin: "0 auto"}}>{otpServerErrors}</Alert>}
                </div>
                <input className="button-style btn btn-primary" style={{width: "10%", marginTop : "5px"}} type="submit" value="Sent Otp"/> 
            </form>
            <p style={{marginTop : "20px"}}>go to <Link className="link-style" to="/">Login</Link> if password is already known</p>
            <Modal isOpen={modal} toggle={toggleChangePassword}>
            <ModalHeader toggle={toggleChangePassword}>Change Password</ModalHeader>
            <ModalBody>
                {passwordServerErrors && <Alert color="danger" style={{marginTop : "10px"}}>{passwordServerErrors}</Alert>}
                <form onSubmit={handleChangePassword}>
                    <div className="form-group">
                        <label className="form-label">Validate Otp</label>
                        <input
                            type="text"
                            className="form-control"
                            value={sentOtp}
                            onChange={(e) => {setSentOtp(e.target.value)}}
                            id="sentOtp"
                            name="sentOtp"
                        />
                    </div>
                    {passwordFormErrors.sentOtp && <Alert color="danger" style={{marginTop : "10px"}}>{passwordFormErrors.sentOtp}</Alert>}
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
                        <label className="form-label">Confirm Password</label>
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
    )
}