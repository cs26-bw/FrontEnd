import React, {useState} from 'react'
import {Form, Field, withFormik} from 'formik'
import * as Yup from 'yup'
import BeatLoader from "react-spinners/BeatLoader";
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const RegisterShape = ( props ) => {

    const { isSubmitting, touched, errors } = props

    // console.log(props)

    const requestErr = errors.requestErr

    const history = useHistory()
    // console.log(Boolean(requestErr))
    return (
        <div>
            <h1>Sign Up</h1>
            <Form >
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
                        size = {10}
                        color = {"#1a1a1a"}
                        /> 
                        : "GET STARTED"}
                </button>
                {Boolean(requestErr) ?
                    Object.values(requestErr.response.data).map(item => {
                        return <p className = "error">{item}</p>
                    })
                    : "NO ERRORS" }
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

        const { history } = props.props

        const packet = {
            username: values.username,
            password1: values.password,
            password2: values.confirmPassword
        }

        props.setSubmitting(true)
        
        axios.post(`https://ferrari-mud.herokuapp.com/api/registration/`, packet)
        .then(res => {
            localStorage.setItem("key", res.data.key)
            props.setSubmitting(false)
            history.push("/play")
        })
        .catch(err => { 
            props.setSubmitting(false)
            props.setErrors({requestErr: err})
        })
        
        
    }
    
})(RegisterShape)

export default Register