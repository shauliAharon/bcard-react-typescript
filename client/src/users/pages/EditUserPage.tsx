import React, { useEffect,useState } from "react";
import { Navigate, useActionData, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../providers/UserProvider";
import useForm from "../../forms/hooks/useForm";
import ROUTES from "../../routes/routesModel";
import useHandleUsers from "../hooks/useHandleUsers";
import initialSignupForm from "../helpers/initialForms/initialSignupForm";
import EditUserSchema from "../models/Joi/userEditSchema";
import mapUserToModel from "../helpers/normalization/mapUserToModel";
import UserForm from "../components/UserForm";
import { Container } from "@mui/material";
import initialEdit from "../helpers/initialForms/initialEdit";
import { GetUser } from "../service/userApi";
import { log } from "console";




const EditUserPage = () => {
 
  const { userId } = useParams();
  // console.log('userid',userId)
  const navigate = useNavigate();
  const { user } = useUser();
  const { handelEditUser,handelGetUser} = useHandleUsers();
  const { value, ...rest } = useForm(
    initialSignupForm,
    EditUserSchema,
    handelEditUser
  );
// console.log(initialSignupForm);
// console.log(EditUserSchema);
// console.log(handelEditUser);

  const { data, errors } = value;
// console.log(value);

  const { handleInputChange, handleReset, onSubmit, validateForm, setData } = rest;
  // console.log('validate', validateForm)
  /*   useEffect(() => {
    console.log(user?._id);
    console.log(userId);

    if (user?._id !== userId) return navigate(ROUTES.ROOT);
    handelGetUser(user);
    if (userData) setData(userData);
    console.log(data);
  }, []); */
console.log(rest);

  useEffect(() => {
    if (userId)
      handelGetUser(userId).then((userFromClient) => {


        if (user?._id !== userFromClient!._id) return navigate(ROUTES.ROOT);
        const modeledUser = mapUserToModel(userFromClient!);
        setData(modeledUser);console.log(modeledUser);
      });
  }, []);



// useEffect(()=>{
// const getUserData =async(userId:"") =>{
//   const response = await GetUser(userId );
//   getUserData(response);
// }
// getUserData()
// },[userId])
// console.log(userData);
// console.log(onSubmit);

  //  if (!user) return <Navigate replace to={ROUTES.ROOT} />; 
  return (

    <Container
    sx={{
      paddingTop: 8,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
    <UserForm
      data={data}
      errors={errors}
      onFormChange={validateForm}
      onInputChange={handleInputChange}
      onReset={handleReset}
      onSubmit={onSubmit}
      title="Edit account"
      setData={setData}
    ></UserForm> 
    </Container>
  
  );
};

export default EditUserPage;
