import { ErrorMessage, FastField, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from 'yup'
import PersonalError from "./components/PersonalError";
import PersonalLoader from "./components/PersonalLoader";
import FormikControl from "./components/formikElements/FormikControl";

const MyForm = () => {
  
  const initialValues = {
    name:"",
    email:"",
    password:"",
    address:{
        city:'',
        postalcode:''
    },
    phone:["" , ""]

  }    
  
  const onSubmit = (values, submitProps) =>{
      console.log(submitProps);
      setTimeout(()=>{
         submitProps.setSubmitting(false)
         submitProps.resetForm()
      },5000)
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter your name"),
    email: Yup.string().required("Please enter your email"),
    password: Yup.string().required("Please enter your password").min( 8 , "At least 8 Character"),
    address: Yup.object({
        city: Yup.string().required("Please enter your city"),
        postalcode: Yup.string().required("Please enter your postalCode").min(9 , 'At least 9 charater')
    }),
    phone: Yup.array().of(Yup.string().required("Please enter your number"))
  })

  
  const handleSaveData = (formik)=>{
      localStorage.setItem("savedData" , JSON.stringify(formik.values))
      
  }
  
  const handleGetSaveData = ()=>{
        setMyValue(savedData)
  }
  const [savedData , setSaveData] = useState(null)
  const [myValue , setMyValue] = useState(null)

  useEffect(()=>{
      const localSaveData = JSON.parse(localStorage.getItem("savedData"))
      setSaveData(localSaveData)
  },[])

  return (
    <Formik 
    initialValues={myValue || initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
    validateOnMount
    enableReinitialize
    >
     {formik=>{
        console.log(formik);
            return (
                <div className="container-fluid w-100 h-100-vh p-0">
                <div className="d-flex w-100 justify-content-center align-items-center"> 
                   
                     <Form className="row col-11 col-md-8 col-lg-6 col-xl-4 mt-5">
                          <h3 className="text-center text-white">Validation & Yup</h3>

                          <FormikControl 
                          control="input"
                          type="text"
                          name="name"
                          label="Name:"
                          placeholder="type your name"
                          />
                          
                          <FormikControl 
                          control="input"
                          type="text"
                          name="email"
                          label="Email:"
                          placeholder="type your email"
                          />

                          <FormikControl 
                          control="input"
                          type="text"
                          name="password"
                          label="Password:"
                          placeholder="type your password"
                          />
                        
        
                         <div className="col-6 mt-4">
                            <label className="label-control text-center text-white">City:</label>
                            <FastField type="text" placeholder="type your city" className="form-control" name='address.city'/>
                            <ErrorMessage name="address.city" component={PersonalError}/>
                         </div>
        
                         <div className="col-6 mt-4">
                            <label className="label-control text-center text-white">Postal code:</label>
                            <FastField type="text" placeholder="type your postal code" className="form-control" name='address.postalcode'/>
                            <ErrorMessage name="address.postalcode" component={PersonalError}/>
                         </div>
        
                         
                            <div className="col-6 mt-4">
                               <label className="label-control text-center text-white">Telephone:</label>
                               <FastField type="number" placeholder="type your phon telePhone" className="form-control" name='phone[0]'/>
                               <ErrorMessage name="phone[0]" component={PersonalError}/>
                            </div>
                            <div className="col-6 mt-4">
                               <label className="label-control text-center text-white">Mobile:</label>
                               <FastField type="number" placeholder="type your mobileNumber" className="form-control" name='phone[1]'/>
                               <ErrorMessage name="phone[1]" component={PersonalError}/>
                            </div>
                            <div className="mt-5 text-center">
                                <button type="submit" className="btn btn-success" disabled={!formik.isValid || formik.isSubmitting}>
                                    {
                                        formik.isSubmitting ? (
                                           <PersonalLoader/>
                                        ) : (
                                            'Confirm'
                                        )
                                    }
                                    
                                </button>

                                {
                                 (formik.isValid && formik.dirty) ? (
                                    <button type="button" className="btn btn-warning me-2" onClick={()=>handleSaveData(formik)}>
                                     setLocalStorage
                                    </button>
                                 ) : null
                                }
                                {
                                 savedData ? (
                                    <button type="button" className="btn btn-info me-2" onClick={handleGetSaveData}>
                                     getLocalStorage
                                    </button>
                                 ) : null
                                }
                            </div>
                       <div>
                 </div>
        
                     </Form>
                     </div> 
                  
                
              </div>
            )
        }
     }
    </Formik>
  );
};

export default MyForm;
