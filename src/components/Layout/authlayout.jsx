import './authlayout.css';

function AuthLayout(props){
    return(
        <div className="auth-layout">
            {props.children}
        </div>
    )
};

export default AuthLayout;

