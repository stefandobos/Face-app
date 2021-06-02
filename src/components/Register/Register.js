import { useState } from "react/cjs/react.development";

function Register ({onRouteChange, loadUser}) {
    const [RegisterInEmail,  setEmail] = useState('');
    const [RegisterInPassword, setPassword] = useState('');
    const [name, setName] = useState('');

    const onEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const onNameChange = (event) => {
        setName(event.target.value)
    }

    const onSubmitRegister = () =>{
        fetch('http://localhost:3001/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                email: RegisterInEmail,
                password: RegisterInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user){
                    loadUser(user);
                    onRouteChange('home');
                }
            })
    }

    return(
        <article className="br4 ba dark-gray b--dark-pink mv4 w-100 w-50-m w-25-l mw6 center">
            <main className="pa4 light-pink">
            <form className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                        <input onChange={onNameChange} className="b pa2 input-reset ba bg-white-60 hover-bg-white-90 hover-dark-pink w-100" type="text" name="name"  id="name " />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input onChange={onEmailChange} className="b pa2 input-reset ba bg-white-60 hover-bg-white-90 hover-dark-pink w-100" type="email" name="email-address"  id="email-address" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input onChange={onPasswordChange} className="pa2 input-reset ba bg-white-60 hover-bg-white-90 hover-dark-pink w-100" type="password" name="password"  id="password" />
                    </div>
                </fieldset>
                <div className="">
                    <button type="button" onClick={onSubmitRegister} className="b light-pink ph3 pv2 input-reset ba b--dark-pink bg-transparent grow pointer f6 dib" value="Register" > Register </button>
                </div>
            </form>
            </main>
        </article>
    );
}

export default Register;