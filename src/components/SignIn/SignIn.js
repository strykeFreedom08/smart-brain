import React, {Component} from "react";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }
    
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => { 
        fetch('https://smart-brain-api-zdnf.onrender.com/signin', {
            method: 'post',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.id){
                this.props.loadUser(data);
                this.props.onRouteChange('home');
            }
        }).catch(console.log)
    }

    render() {
        const {onRouteChange} = this.props;
        return (
            <div>
                <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
                    <main className="pa4 black-80 lightest-blue">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                            </div>
                            </fieldset>
                            <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib lightest-blue" type="submit" value="Sign in" 
                                onClick={this.onSubmitSignIn}
                            />
                            </div>
                            <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer lightest-blue">Register</p>
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        );
    }
}

export default SignIn;