import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthLayout from '../../components/Layout/authlayout';
import logo from "../../logo.png";
import client from "../../api";
import swal from 'sweetalert';

function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isMatched, setIsMatched] = useState(true);
    const history = useHistory();

    const onChangeEmail = e => {
        setEmail(e.target.value);
    }
    const onChangePassword = e => {
        setPassword(e.target.value);
    }
    const onChangeConfirmPassword = e => {
        const confirmPassword = e.target.value;
        setConfirmPassword(e.target.value);
        const isMatched = password === confirmPassword;
        setIsMatched(isMatched)
    }
    const onChangeUsername = e => {
        setUsername(e.target.value);
    }
    const onHandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await client({
                url: 'api/auth/signup',
                method: 'POST',
                data: {
                    email,
                    password,
                    name : username
                }
            })
            if (res.data.success) {
                swal({
                    title: "Đăng kí thành công",
                    text: "",
                    icon: "success",
                    button: "Aww yiss!",
                  });
                history.push("/login");
            }
        } catch (err) {
            return swal("Oops!", "Something went wrong!", "error");
        }
    }

    return (
        <AuthLayout>
            <div className="logo-navbar">
                <img className="logo-image" src={logo} alt="logo" />
            </div>
            <div className="form-wrapper">
                <h3 className="status-text">Đăng kí FR</h3>
                <Form onSubmit={onHandleSubmit} >
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Tên tài khoản email của bạn" value={email} onChange={onChangeEmail} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Mật khẩu" value={password} onChange={onChangePassword} />
                    </Form.Group>
                    <Form.Group controlId="formConfirmPassword">
                        <Form.Control type="password" placeholder="Xác nhận mật khẩu" value={confirmPassword} onChange={onChangeConfirmPassword} />
                    </Form.Group>
                    <Form.Group controlId="formBasicName">
                        <Form.Control type="text" placeholder="Tên tài khoản" value={username} onChange={onChangeUsername} />
                        {!isMatched
                            && <span style={{ color: 'red' }}> Xác nhận mật khẩu không đúng, xin hãy nhập lại ! </span>
                        }
                    </Form.Group>
                    <Button variant="primary" type="submit" block onSubmit={onHandleSubmit} disabled={!isMatched}>
                        Đăng kí
                    </Button>
                </Form>
                <div className="navigate mt-2">
                    Bạn đã có tài khoản ? <Link to="/login">Đăng Nhập</Link>
                </div>
            </div>
        </AuthLayout>
    );
};

export default Signup;