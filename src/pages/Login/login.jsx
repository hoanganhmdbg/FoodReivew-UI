import { Form, Button } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from "../../logo.png";
import AuthLayout from '../../components/Layout/authlayout';
import client from "../../api";
import { AuthContext } from '../../App';
import swal from 'sweetalert';
function Login() {
    const { setUser } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const onChangeEmail = e => {
        setEmail(e.target.value);
    }
    const onChangePassword = e => {
        setPassword(e.target.value);
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await client({
                url: '/api/auth/login',
                method: 'POST',
                data: {
                    email,
                    password
                },
            })
            if (res.data.success) {
                swal({
                    title: "Đăng nhập thành công",
                    text: "",
                    icon: "success",
                    button: "Aww yiss!",
                }).then(() => {
                    const { user, token } = res.data.data;
                    //ghi nhớ token(cookie)
                    localStorage.setItem('token', token)
                    setUser(user);
                    //chuyến sang trang home
                    history.push('/');
                });

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
                <h3 className="status-text">Đăng nhập FR</h3>
                <Form onSubmit={onHandleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Tên tài khoản email của bạn" value={email} onChange={onChangeEmail} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Mật khẩu" value={password} onChange={onChangePassword} />
                    </Form.Group>
                    <Button variant="primary" type="submit" block onSubmit={onHandleSubmit} >
                        Đăng nhập
                    </Button>
                </Form>
                <div className="navigate mt-2">
                    Chưa có tài khoản ? <Link to="/signup">Đăng kí ngay</Link>
                </div>
            </div>
        </AuthLayout>
    );
};

export default Login;