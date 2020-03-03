import React, {useState} from 'react'
import {Form, Field, withFormik} from 'formik'
import * as Yup from 'yup'
import BeatLoader from "react-spinners/BeatLoader";

const RegisterShape = ( props ) => {

    const { isSubmitting, touched, errors } = props

    return (
        <div>
            <h1>Sign Up</h1>
            <Form>
                <div className = "username">
                    <label htmlFor = "username">
                        USERNAME
                    </label>
                    <Field name = "username"/>
                    { touched.username && errors.username ? 
                        <p>{touched.username && errors.username}</p>
                    : null }
                </div>
                <div>
                    <label htmlFor = "password">
                        PASSWORD
                    </label>
                    <Field name = "password" />
                    { touched.password && errors.password ? 
                        <p>{touched.password && errors.password}</p>
                    : null }
                </div>
                <div className = "confirm password">
                    <label htmlFor = "confirmPassword">
                        CONFIRM PASSWORD
                    </label>
                    <Field name = "confirmPassword" />
                    { touched.confirmPassword && errors.confirmPassword ? 
                        <p>{touched.confirmPassword && errors.confirmPassword}</p>
                    : null }
                </div>
                <button type = 'submit'>{ isSubmitting ? 
                        <BeatLoader 
                        size = {50}
                        color = {"#1a1a1a"}
                        /> 
                        : "GET STARTED"}
                </button>
            </Form>
        </div>
    )
}

const Register = withFormik({
    mapPropsToValues({username, password, confirmPassword}){
        return {
            username: username || '',
            password: password || '',
            confirmPassword: confirmPassword || ''
        }
    },
    validationSchema: Yup.object().shape({
        username: Yup
            .string()
            .required('Required'),
        password: Yup
            .string()
            .required("Required")
            .min(8, "Password must have 8 characters"),
        confirmPassword: Yup
            .string()
            .when("password", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("password")],
                "Passwords entered do not match"
            )
            .required("Required")
        })
    }),
    handleSubmit(values, props){

        const packet = {
            username: values.username,
            email: values.email,
            password: values.password
        }

        console.log(props)
        props.setSubmitting(true)
        
    }
    
})(RegisterShape)

export default Register