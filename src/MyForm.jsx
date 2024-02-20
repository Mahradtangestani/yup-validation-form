import { ErrorMessage, FastField, Form, Formik } from "formik";
import React from "react";
import * as Yup from 'yup'
import PersonalError from "./components/PersonalError";
import PersonalLoader from "./components/PersonalLoader";

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
  return (
    <Formik 
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
    validateOnMount
    >
     {formik=>{
        console.log(formik);
            return (
                <div className="container-fluid w-100 h-100-vh p-0">
                <div className="d-flex w-100 justify-content-center align-items-center"> 
                   
                     <Form className="row col-11 col-md-8 col-lg-6 col-xl-4 mt-5">
                          <h3 className="text-center text-success">Validation & Yup</h3>
                         <div className="mt-4">
                            <label className="label-control text-center">Name:</label>
                            <FastField type="text" placeholder="type your name" className="form-control" name='name'/>
                            <ErrorMessage name="name" component={PersonalError}/>
                         </div>
        
                         <div className="mt-4">
                            <label className="label-control text-center">Email:</label>
                            <FastField type="text" placeholder="type your email" className="form-control" name='email'/>
                            <ErrorMessage name="email" component={PersonalError}/> 
                         </div>
        
                         <div className="mt-4">
                           <label className="label-control text-center">Password:</label>
                           <FastField type="text" placeholder="type your password" className="form-control" name='password'/>
                           <ErrorMessage name="password" component={PersonalError}/>
                         </div>
        
                         <div className="col-6 mt-4">
                            <label className="label-control text-center">City:</label>
                            <FastField type="text" placeholder="type your city" className="form-control" name='address.city'/>
                            <ErrorMessage name="address.city" component={PersonalError}/>
                         </div>
        
                         <div className="col-6 mt-4">
                            <label className="label-control text-center">Postal code:</label>
                            <FastField type="text" placeholder="type your postal code" className="form-control" name='address.postalcode'/>
                            <ErrorMessage name="address.postalcode" component={PersonalError}/>
                         </div>
        
                         
                            <div className="col-6 mt-4">
                               <label className="label-control text-center ">Telephone:</label>
                               <FastField type="number" placeholder="type your phone numbrer" className="form-control" name='phone[0]'/>
                               <ErrorMessage name="phone[0]" component={PersonalError}/>
                            </div>
                            <div className="col-6 mt-4">
                               <label className="label-control text-center">Mobile:</label>
                               <FastField type="number" placeholder="type your mobile number" className="form-control" name='phone[1]'/>
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
