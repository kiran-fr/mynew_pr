import React from 'react'
import {Paper,Box, makeStyles} from '@material-ui/core'
import { renderButton, renderField, renderText } from '../common/displayComponent'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import VpnKeySharpIcon from '@material-ui/icons/VpnKeySharp';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import MailIcon from '@material-ui/icons/Mail';

export default function Step1({state,handleChange,handleNext,handleFocus,schema}) {


    const {handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema)
    })
    const {data} = state

    const handleClick =() =>{
        if(state.data.email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/) && state.data.username.length>=5 && state.data.password.length>=8 ){
            return renderButton({
                label:"next",
                type:"submit",
                handleClick:handleNext
            })
             
        }else{
            return renderButton({
                label:"next",
                type:"submit",
            })
           
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit()}>
                {/* <Box mt={1} mb={2} >
                    {renderText({label:"Personal details"})}
                </Box> */}
            <section className="box">
                {renderText({
                    variant:"caption",
                    className:"heading",
                    label:"Email *"
                })}
                <div className="input-container">
                    <MailIcon className="icon"  style={{fontSize:16}}/>
                    {renderField({
                        state,
                        handleChange,
                        palceholder:"Email",
                        handleFocus,
                        name:"email"
                    })}
                </div>
                {renderText({
                            variant:"caption",
                            color:'secondary',
                            label:state.data.email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)?null:errors['email']?.message
                        })}
            </section>

                <section className="box">
                    {renderText({
                        variant:"caption",
                        className:"heading",
                        label:"Username *"
                    })}
                    <div className="input-container">
                        <PersonRoundedIcon className="icon"  style={{fontSize:16}}/>
                        {renderField({
                        state,
                        handleChange,
                        palceholder:"Username",
                        name:"username"
                        })}
                    </div>
                    
                    {renderText({
                            variant:"caption",
                            color:'secondary',
                            label:state.data.username.length>=5?null:errors['username']?.message
                        })}
                </section>

                <section className='box'>
                    {renderText({
                        variant:"caption",
                        className:"heading",
                        label:"Password *"
                    })}
                    <div className="input-container">
                        <VpnKeySharpIcon className="icon"  style={{fontSize:16}}/>
                        {renderField({
                            label:"password",
                            state,
                            type:"password",
                            handleChange,
                            palceholder:"Password",
                            handleFocus,
                            name:"password"
                        })}
                    </div>
                        {renderText({
                            variant:"caption",
                            color:'secondary',
                            label:state.data.password.length>=8?null:errors['password']?.message
                        })}
                </section>
                <Box ml={0}>
                    {handleClick()}
                </Box>
            </form>
            
        </>
    )
}
