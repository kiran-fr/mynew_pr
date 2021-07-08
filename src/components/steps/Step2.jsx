import React from 'react'
import {Paper,Box} from '@material-ui/core'
import { renderButton, renderField, renderText } from '../common/displayComponent'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';

export default function Step2({state,handleChange,handleNext,handleFocus,schema}) {

    const {handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema)
    })

    const handleClick = () =>{
        if( state.data.firstname.length>=5 && state.data.lastname.length>=5 && state.data.mobile.match(/^[0][1-9]\d{9}$|^[1-9]\d{9}$/)){
            return renderButton({
                label:"next",
                type:"submit",
                handleClick:handleNext
            })
        }
        else {
            return renderButton({
                label:"next",
                type:"submit",
            })
        }
    }
    return (
        < >
            <form onSubmit={handleSubmit()}>
                {/* <Box mt={1} mb={2} >
                    {renderText({label:"Account details"})}
                </Box> */}
                
                <section className="box">
                    {renderText({
                        variant:"caption",
                        className:"heading",
                        label:"Firstname *"
                    })}
                    <div className="input-container">
                        <PersonRoundedIcon className="icon"  style={{fontSize:16}}/>
                        {renderField({
                        state,
                        handleChange,
                        palceholder:"Firstname",
                        handleFocus,
                        name:"firstname"
                        })}
                    </div>
                    
                    {renderText({
                            variant:"caption",
                            color:"secondary",
                            label:state.data.firstname.length>=5?null:errors['firstname']?.message
                        })}
                </section>
                
                <section className="box">
                    {renderText({
                        variant:"caption",
                        className:"heading",
                        label:"Lastname *"
                    })}
                    <div className="input-container">
                        <PersonRoundedIcon className="icon"  style={{fontSize:16}}/>
                        {renderField({
                        state,
                        handleChange,
                        palceholder:"Lastname",
                        handleFocus,
                        name:"lastname"
                        })}
                    </div>
                    
                    {renderText({
                            variant:"caption",
                            color:"secondary",
                            label:state.data.lastname.length>=5?null:errors['lastname']?.message
                        })}
                </section>
                <section className="box">
                    {renderText({
                        variant:"caption",
                        className:"heading",
                        label:"Mobile *"
                    })}
                    <div className="input-container">
                        <PhoneAndroidIcon className="icon"  style={{fontSize:16}}/>
                        {renderField({
                        state,
                        handleChange,
                        palceholder:"Mobile",
                        handleFocus,
                        name:"mobile"
                        })}
                    </div>
                    
                    {renderText({
                            variant:"caption",
                            color:"secondary",
                            label:state.data.mobile.match(/^[0][1-9]\d{9}$|^[1-9]\d{9}$/)?null:errors['mobile']?.message
                        })}
                </section>
                <Box ml={0.78}>
                        {handleClick()}
                </Box>
            </form>
        </>
    )
}
