import "./register.css";
import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { postUser } from "../../../../redux/actions/login";
import { Link } from "react-router-dom";
import * as Yup from "yup";

class Register extends Component {
  render() {
    return (
      <div className="registerContainer">
        <Formik
          initialValues={{ password: "", email: "" }}
          onSubmit={(values) => {
            this.props.postUser(values).then((res) => {
              this.props.history.push("/home");
            });
          }}
          //Formik validation
          validationSchema={Yup.object().shape({
            password: Yup.string().min(2).required("Required"),
            email: Yup.string().min(2).required("Required"),
          })}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="containerRegister">
                <h4> Sign up to Altas Notas</h4>

                <Field
                  type="text"
                  className="registerEmail"
                  name="email"
                  placeholder="Email"
                />
                <Field
                  type="text"
                  className="registerPassword"
                  name="password"
                  placeholder="Password"
                />
                <button className="btnSubmit" type="submit">
                  Sign Up
                </button>
                <div className="btnRegisterLinks">
                  <p>
                    <Link className="btnBackHome" to="/home">
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
const mapStateToProps = (state) => ({
  users: state.users,
  isLoading: state.isLoading,
});
export default connect(mapStateToProps, { postUser })(Register);