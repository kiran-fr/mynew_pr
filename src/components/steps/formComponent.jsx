import { Grid, withStyles,Box,Paper,Step, Stepper,StepLabel,Button,Card, makeStyles,LinearProgress, StepConnector} from '@material-ui/core'
import React, { Component } from 'react'
import  PropTypes  from 'prop-types'
import {Styles} from "../common/stykes"
import { renderButton, renderField, renderText } from '../common/displayComponent'
import * as yup from 'yup'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Finished from './Finished'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
// import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import HomeIcon from '@material-ui/icons/Home';
import clsx from 'clsx'

const schema = yup.object().shape({
    email:yup.string().required("Enter Valid Email"),
    username:yup.string().required("Username  field minum fivecharacter length"),
    password:yup.string().required("Password  minum eight character length"),
    firstname:yup.string().required("Enter valid First name"),
    lastname:yup.string().required('Enter valid Last name'),
    mobile:yup.number().required("Enter tend digits mobile number"),
    address:yup.string().required('Enter Valid Address'),
    pincode:yup.string().required('Enter Valid Pincode')
})

const ColorlibConnector = withStyles({
    alternativeLabel: {
      top: 15,
    },
    active: {
      '& $line': {
      backgroundColor:"#6752dd"
  },
    },
    completed: {
      '& $line': {
          backgroundColor:"#6752dd"
      },
    },
    line: {
      height: 1,
      border: 0,
      backgroundColor: '#eaeaf0',
      borderRadius: 1,
    },
  })(StepConnector);
  

function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%"  >
          <LinearProgress variant="determinate" {...props} style={{height:14,borderRadius:2,color:'pink',marginRight:'13%',marginLeft:'15%'}}/>
        </Box>
        {/* <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box> */}
      </Box>
    );
  }

const StepperSteps = [
    {label:"Personal"},
    {label:"Account"},
    {label:"Address"}
]
const useColorlibStepIconStyles = makeStyles({
    root: {
      backgroundColor: '#ccc',
      zIndex: 1,
      color: '#fff',
      width: 35,
      height: 35,
      display: 'flex',
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    active: {
      backgroundColor:'#6752dd'
    },
    completed: {
          backgroundColor:'#6752dd'
    },
  });
function ColorlibStepIcon(props) {
    const classNamees = useColorlibStepIconStyles();
    const { active, completed } = props;
  
    const icons = {
      1: <img src='./assets/lock.png' width='45%' height='auto' alt="" />,
      2: <img src ='./assets/person.png' width='48%' height='auto' alt=""/>,
      3: <HomeIcon />,
    };
  
    return (
      <div
        className={clsx(classNamees.root, {
          [classNamees.active]: active,
          [classNamees.completed]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
  }
class FormComponent extends Component {

    state ={
        data:{
            email:"",
            username:"",
            password:"",

            firstname:"",
            lastname:"",
            mobile:"",

            address:"",
            pincode:""
        },
        errors:{
            // email:"Email Field is required"
        },  
        currentState:0,
        progress:33.3,
        activeStep:1,
        stepinc:1
    }

    dataSave = () =>{
         axios.post('http://localhost:5000/api/add',this.state.data)
         .then((res)=>{
            console.log("data send succesfully")
         }).catch(err=>console.log('Data fail to send',err))
        
         let {currentState} = this.state
            currentState=3
         this.setState({currentState})
    }
    
    render() {
        
       const handleChange = ({target}) =>{
            const {data,errors} = this.state;
    
            target.value.length <=3 
            ? errors[target.name] = `${target.name} have at least three characters`
            : errors[target.name]="";
    


            data[target.name]=target.value
            this.setState({data,errors})
        }
        const handleFocus= ({target}) =>{
            const {data,errors} = this.state;
    
            target.value.length <=3 
            ? errors[target.name] = `${target.name} have at least three characters`
            : errors[target.name]="";
        }
       const handleNext = () =>{
                let {progress,currentState,data,stepinc} = this.state
                
                    currentState = currentState+1
                    this.setState({currentState})

                    progress = progress+33.3
                    this.setState({progress})

                    stepinc = stepinc+1
                    this.setState({stepinc})
            
        }
        const {classes} = this.props

        

        const getStesItem = (steps)=>{
            switch (steps) {
                case 0: return  <Step1 
                        schema ={schema}
                        state={this.state} 
                        handleChange={handleChange} 
                        handleNext={handleNext} 
                        handleFocus={handleFocus}/>;
                case 1: return <Step2
                        schema ={schema}
                        state={this.state} 
                        handleChange={handleChange} 
                        handleNext={handleNext} 
                        handleFocus={handleFocus}            
                    />;
                case 2: return <Step3 
                        schema={schema}
                        state={this.state} 
                        handleChange={handleChange} 
                        handleNext={this.dataSave} 
                        handleFocus={handleFocus}
                    /> ;
                default: return <Finished
                        state={this.state} 
                        handleChange={handleChange} 
                        handleNext={handleNext} 
                        handleFocus={handleFocus}/> ;
            }
        }

        return (
            

            <>
                <Card className='cardWidth'>
                    <h1>SIGN UP YOUR ACCOUNT</h1>
                    <h1 className='textDecoration'>Fill all form field to go next</h1>
                        <Stepper activeStep={this.state.currentState} alternativeLabel connector={<ColorlibConnector/>}  >
                            {StepperSteps.map((step,indx)=>{
                                return <Step key={indx}>
                                            <StepLabel StepIconComponent={ColorlibStepIcon}>{step.label}</StepLabel>
                                        </Step>
                                        })}
                        </Stepper>
                        <div className="root" >
                            <LinearProgressWithLabel value={this.state.progress}   />

                            <Grid container direction='row' justify='space-between' style={{paddingLeft:'15%',paddingRight:'13%'}} >
                                <Grid >
                                    {this.state.currentState===0 &&(<h2>Personal details</h2>)}
                                    {this.state.currentState===1 &&(<h2>Personal Information</h2>)}
                                    {this.state.currentState===2 &&(<h2>Final Submit</h2>)}
                                </Grid>
                            <Grid><h2>Step {this.state.stepinc} - 3</h2></Grid>
                            </Grid>
                            <Grid style={{paddingRight:'13%',paddingLeft:'15%',textAlign:'left'}} >
                                {getStesItem(this.state.currentState)}
                            </Grid>
                        </div>
                </Card>




       
        </>  
        )
    }
}

FormComponent.propTypes = {
    classes:PropTypes.object.isRequired
}

export default withStyles(Styles)(FormComponent)