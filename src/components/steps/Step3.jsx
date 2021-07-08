import React from 'react'
import {Paper,Box} from '@material-ui/core'
import { renderButton, renderField, renderText } from '../common/displayComponent'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import HomeIcon from '@material-ui/icons/Home';


export default function Step3({state,handleChange,handleNext,handleFocus,schema}) {

    const {handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema)
    })
    
    const handleClick =() =>{
        if(state.data.address.match(/^\s*\S+(?:\s+\S+){2}/) && state.data.pincode.match(/^[0-9]{6}/)){
            return renderButton({
                label:"Submit",
                type:"submit",
                handleClick:handleNext
            })
        }else{
            return renderButton({
                label:"next",
                type:"submit"
            })
        }
    }
    return (
        <form onSubmit={handleSubmit()}>
                {/* <Box mt={1} mb={2} >
                    {renderText({label:"Account details"})}
                </Box> */}
                
                <section className="box">
                    {renderText({
                        variant:"caption",
                        className:"heading",
                        label:"Address *"
                    })}
                    <div className="input-container">
                        <HomeIcon className="icon"  style={{fontSize:16}}/>
                        {renderField({
                        state,
                        handleChange,
                        palceholder:"Address",
                        handleFocus,
                        name:"address"
                        })}
                    </div>
                    
                    {renderText({
                            variant:"caption",
                            color:"secondary",
                            label:state.data.address.match(/^\s*\S+(?:\s+\S+){2}/)?null:errors['address']?.message
                        })}
                </section>
                <section className="box">
                    {renderText({
                        variant:"caption",
                        className:"heading",
                        label:"Pincode *"
                    })}
                    <div className="input-container">
                        <HomeIcon className="icon"  style={{fontSize:16}}/>
                        {renderField({
                        state,
                        handleChange,
                        palceholder:"Pincode",
                        handleFocus,
                        name:"pincode"
                        })}
                    </div>
                    
                    {renderText({
                            variant:"caption",
                            color:"secondary",
                            label:state.data.pincode.match(/^[0-9]{6}/)?null:errors['pincode']?.message
                        })}
                </section>

                <Box ml={0.78}>
                        {handleClick()}
                </Box>
            
        </form>
    )
}
