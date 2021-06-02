import { useState } from "react/cjs/react.development";

function Signin ({onRouteChange, loadUser}) {
    const [SignInEmail,  setEmail] = useState('');
    const [SignInPassword, setPassword] = useState('');

    const onEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const onSubmitSignIn = () =>{
        fetch('http://localhost:3001/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: SignInEmail,
                password: SignInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id){
                    loadUser(user)
                    onRouteChange('home');
                }
            })
    }

    return(
        <div className='flex center '>
            <article className="br4 ba dark-gray b--dark-pink mv4 w-25 pa3 ml7 mr3">
                <main className="pa4 light-pink">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
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
                            <button type="button" onClick={onSubmitSignIn} className="b light-pink ph3 pv2 input-reset ba b--dark-pink bg-transparent grow pointer f6 dib" > Sign In </button> 
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')} className="f6 link dim light-pink db pointer">Sign up</p>
                        </div>
                    </form>
                </main>
            </article>
            <article className='br4 ba dark-gray b--dark-pink mv4 h-50 w5 w-20 mw6 ma0 fr'>
                <main className='pa3'>
                    <p className="db f4">In register you don't need to use a real email, but if you don't want to register connect with: </p>
                    <p className='db f5'>Email: costica@gmail.com</p>
                    <p className='db f5'>Password: manele</p>
                </main>
            </article>
        </div>
    );
}

export default Signin;