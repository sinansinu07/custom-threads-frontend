import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Container, Row, Col, Form, FormGroup, Button, Alert } from "reactstrap";
import axios from "axios";
import { useState } from "react";

import OtpInput from "otp-input-react"
import NavBar from "./NavBar";

const render = process.env.RENDER_LINK
const localhost = process.env.LOCALHOST_LINK

export default function VerifyNumber() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(null);

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(`${render}/api/user/sendOtp`, {}, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      alert(response.data.message);
    } catch (err) {
      setOtpError(err.response.data.message);
      console.log(err);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const formData = {
      sentOtp: otp,
    };

    try {
      const response = await axios.post(`${render}/api/user/verifyOtp`, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      })
      alert(response.data.message);
      navigate("/customer-container");
    } catch (err) {
        console.log(err);
        setOtpError(err.response.data.message);
    }
  };

  return (
    <div>
      <NavBar />
        {user.phone.isVerified ? (
            <div>
                <h3 style={{marginTop: '20px'}}>Your Number is Aleady Verified</h3>
                <Link className="link-style" to="/customer-profile">Go to Profile Settings</Link>
            </div>
        ) : (
            <div>
                <Container>
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <h1 className="content-center" style={{marginTop : "20px"}}>Verify Number</h1>
                        {!(user.phone.isVerified) && !(user.phone.otp) && (
                            <div>
                            <h3>Your Phone Number is {user.phone.number}</h3>
                            <Button className="button-style" style={{ width : "20%" }} onClick={handleSendOtp}>
                                Send OTP
                            </Button>
                            </div>
                        )}
                        {!(user.phone.isVerified) && user.phone.otp && (
                            <Form onSubmit={handleVerifyOtp}>
                            <FormGroup className="text-center">
                                <label className="content-center" for="otp">Enter OTP</label>
                                <OtpInput
                                  className ="otp-input-box content-center"
                                  style={{ marginTop: "20px" }}
                                  OTPLength="6"
                                  OtpType="number"
                                  name="otp"
                                  id="otp"
                                  value={otp}
                                  onChange={setOtp}
                                />
                            </FormGroup>
                            {otpError && (
                                <Alert color="danger">{otpError}</Alert>
                            )}
                            <Button className="button-style">
                              Verify
                            </Button>
                            </Form>
                        )}
                        </Col>
                    </Row>
                </Container>
                <div style={{marginTop : "10px"}}>
                  <Link className="link-style" to="/customer-container">Verify Later</Link>
                </div>
            </div>
        )}
    </div>
  );
}