import "./login.css";
import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { logIn } from "../../redux/actions/login";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import * as Yup from "yup";

class Login extends Component {
  constructor(props) {
    super(props);
    this.getLogin = this.getLogin.bind(this);
  }
  //Authentication
  getLogin = (values) => {
    this.props.logIn(values).then((response) => {
      if (this.props.authentication) {
        this.props.history.push("/menu");
      }
    });
  };
  render() {
    return (
      <div className="loginContainer">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={this.getLogin}
          //Formik validation
          validationSchema={Yup.object().shape({
            email: Yup.string().min(2).required("Required"),
            password: Yup.string().min(2).required("Required"),
          })}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="containerLogin">
                <h5> Sign in to NotesApp</h5>
                <div className="login">
                  <Field
                    type="email"
                    id="emailLogin"
                    name="email"
                    placeholder="Email"
                  />
                  <Field
                    type="password"
                    id="passwordLogin"
                    name="password"
                    placeholder="Password"
                  />
                  {!this.props.isLoading ? (
                    <button type="submit" className="btnLogin">
                      Sign In
                    </button>
                  ) : (
                    //Loading bar
                    <ClipLoader size={25} color={"white"} loading />
                  )}
                  <div>
                    {this.props.failedLogin ? (
                      <div className="loginError"></div>
                    ) : null}
                  </div>
                </div>
                <div className="btnLinks">
                  <p>
                    <Link className="btnCreateAccount" to="/register">
                      Create Account
                    </Link>
                  </p>
                  <p>
                    <Link className="btnHome" to="/home">
                      Back to home
                    </Link>
                  </p>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default connect()(Login);