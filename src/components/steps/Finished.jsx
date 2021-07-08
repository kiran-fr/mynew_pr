import React from 'react'
import {Paper,Box, Grid} from '@material-ui/core'
import { renderButton, renderField, renderText } from '../common/displayComponent'
import { useEffect } from 'react'
import axios from 'axios'



export default function Finished({state}) {

    useEffect( async()=>{
        const displayData = await axios.get('http://localhost:5000/api/get')
         const {data} = displayData
        console.log(displayData)
    })
    
    return (
        <Paper style={{backgroundColor:"#ccc",textAlign:'center'}} >
                
                <Box mt={1} p={2}  >
                    {/* {JSON.stringify(state,null,4)} */}
                    {/* {data.map((e)=>{
                        return <Grid >

                        </Grid>
                    })} */}

                    <img src ='./assets/success.png' width="20%" />

                </Box>
                <Box mt={1} >
                    {renderText({label:"Data submitted succesfully...",variant:'h6'})}
                </Box>
        </Paper>
    )
}
