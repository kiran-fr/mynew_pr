import { Typography,TextField,Button } from "@material-ui/core";

export const renderText = ({label,color,align,variant,component}) =>(
     <Typography
        color={color ? color:"primary"}
        align={align ? align:"center"}
        variant={variant?variant:"h6"}
     >{label}</Typography>
);

export const renderError = ({label,color,className,variant,component}) =>(
   <Typography
      color={color ? color:"secondary"}
      className={className?className:null}
      variant={variant?variant:"subtitle"}
   >{label}</Typography>
);
export const renderField = ({
         palceholder,
         state,
         name,
         handleChange,
         handleFocus,
         type
         }) =>{
         const {data,errors} = state
      return  <input 
                  type={type?type:'text'}
                  onFocus={handleFocus}
                  placeholder={palceholder}
                  size="small"
                  name={name}
                  value={data[name]}
                  className="input-field" 
                  onChange={handleChange}
            />
}

export const renderButton = ({variant,label,color,handleClick,type}) =>{
   return <Button
      variant={variant?variant:'outlined'}
      color={color?color:'primary'}
      onClick={handleClick}
      type={type}
   >
      {label}
   </Button>
}


