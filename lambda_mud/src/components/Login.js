import React, {useState} from 'react'
import {Form, Field, withFormik} from 'formik'
import * as Yup from 'yup'
import BeatLoader from "react-spinners/BeatLoader";
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const LoginShape = ( props ) => {

    const { isSubmitting, touched, errors } = props

    const requestErr = errors.requestErr

    const history = useHistory()
    
    return (
        <div>
            <h1>Sign In</h1>
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
                <button type = 'submit'>{ isSubmitting ? 
                        <BeatLoader 
                        size = {8}
                        color = {"#1a1a1a"}
                        /> 
                        : "GET STARTED"}
                </button>
                {Boolean(requestErr) ?
                    Object.values(requestErr.response.data).map(item => {
                        return <p className = "error" key = {Date.now()}>{item}</p>
                    })
                    : null }
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