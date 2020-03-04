import React, {useState} from 'react'
import {Form, Field, withFormik} from 'formik'
import * as Yup from 'yup'
import BeatLoader from "react-spinners/BeatLoader";
import axios from 'axios'
import {useHistory, Link} from 'react-router-dom'
import { Input, Icon } from 'semantic-ui-react';

const RegisterShape = ( props ) => {

    const { isSubmitting, touched, errors } = props


    const requestErr = errors.requestErr

    const history = useHistory()

    const [ showPassword, setShowPassword ] = useState(false)

    const [ showConfirm, setShowConfirm] = useState(false)
    

    return (
        <div className = 'auth'>
            <h1>Sign Up</h1>
            <Form >
                <Input className = "field">
                    <label htmlFor = "username">
                        USERNAME
                    </label>
                    <Field name = "username" type = 'text'/>
                    { touched.username && errors.username ? 
                        <p className = 'error show' >{touched.username && errors.username}</p>
                    : <p className = 'error hide' >{touched.username && errors.username}</p> }
                </Input>
                <Input className = "field">
                    <label htmlFor = "password">
                        PASSWORD
                    </label>
                    <Field name = "password" type={showPassword ? 'text' : 'password'} />
                    <Icon name = 'eye' onClick = {() => setShowPassword(!showPassword)} className = {showPassword ? "show" : "hide"}/>
                    { touched.password && errors.password ? 
                        <p className = 'error show' >{touched.password && errors.password}</p>
                        :  <p className = 'error hide' >{touched.password && errors.password}</p>
                    }
                </Input>
                <Input className = "confirm password field">
                    <label htmlFor = "confirmPassword">
                        CONFIRM PASSWORD
                    </label>
                    <Field name = "confirmPassword" type={showConfirm ? 'text' : 'password'}/>
                    <Icon name = 'eye' onClick = {() => setShowConfirm(!showConfirm)} className = {showConfirm ? "show" : "hide"}/>
                    { touched.confirmPassword && errors.confirmPassword ? 
                        <p className = 'error show' >{touched.confirmPassword && errors.confirmPassword}</p>
                    : <p className = 'error hide' >{touched.confirmPassword && errors.confirmPassword}</p> }
                </Input>
                <button type = 'submit'>{ isSubmitting ? 
                        <BeatLoader 
                        size = {8}
                        color = {"#1a1a1a"}
                        /> 
                        : "GET STARTED"}
                </button>
                <p className = 'auth-link'>Already have an account? <Link to ='/login'>Login here</Link></p>
                {Boolean(requestErr) ?
                    Object.values(requestErr.response.data).map(item => {
                        return <p className = "error response" key = {Date.now()}>{item}</p>
                    })
                    : null }
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