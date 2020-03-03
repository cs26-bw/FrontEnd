import React, {useState} from 'react'
import {Form, Field, withFormik} from 'formik'
import * as Yup from 'yup'
import BeatLoader from "react-spinners/BeatLoader";
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'

const LoginShape = ( props ) => {

    const { isSubmitting, touched, errors } = props

    const requestErr = errors.requestErr

    const history = useHistory()
    
    return (
        <div className = 'auth'>
            <h1>Sign In</h1>
            <Form >
                <div className = "field">
                    <label htmlFor = "username">
                        USERNAME
                    </label>
                    <Field name = "username" type = 'text'/>
                    { touched.username && errors.username ? 
                        <p className = 'error show'>{touched.username && errors.username}</p>
                    : <p className = 'error hide'>{touched.username && errors.username}</p> }
                </div>
                <div className = "field">
                    <label htmlFor = "password">
                        PASSWORD
                    </label>
                    <Field name = "password" type='password' />
                    { touched.password && errors.password ? 
                        <p className = 'error show' >{touched.password && errors.password}</p>
                    : <p className = 'error hide' >{touched.password && errors.password}</p> }
                </div>
                <button type = 'submit'>{ isSubmitting ? 
                        <BeatLoader 
                        size = {8}
                        color = {"#313131"}
                        /> 
                        : "LOG IN"}
                </button>
                <p className = 'auth-link'>Don't have an account yet? <Link to ='/register'>Register here</Link></p>
                {Boolean(requestErr) ?
                    Object.values(requestErr.response.data).map(item => {
                        return <p className = "error response" key = {Date.now()}>{item}</p>
                    })
                    : null}
            </Form>
        </div>
    )
}

const Login = withFormik({
    mapPropsToValues({username, password, confirmPassword}){
        return {
            username: username || '',
            password: password || '',
        }
    },
    validationSchema: Yup.object().shape({
        username: Yup
            .string()
            .required('Required'),
        password: Yup
            .string()
            .required("Required")
    }),
    handleSubmit(values, props){

        const { history } = props.props

        const packet = {
            username: values.username,
            password: values.password,
        }

        props.setSubmitting(true)
        
        axios.post(`https://ferrari-mud.herokuapp.com/api/login/`, packet)
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
    
})(LoginShape)

export default Login