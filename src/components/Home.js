import LoginForm from "./LoginForm";
import customDesign1 from "../assets/customDesign1.png"

export default function Home() {
    return (
        <div className="row login">
            <div className="col-md-6">
                <img style={{ marginTop: "-50px" }} src={customDesign1} alt="Custom Design" />
                <h1 style={{ marginTop: "-80px" }}>Custom Threads</h1>
                <div>
                    <h2>create your own custom designed</h2>
                    <h3>t-shirts on demand</h3>
                </div>
            </div>
            <div style={{ marginRight: "-200px" }} className="col-md-6">
                <LoginForm />
            </div>
        </div>
    )
}