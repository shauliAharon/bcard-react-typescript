import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../providers/UserProvider";
import useForm from "../../forms/hooks/useForm";
import ROUTES from "../../routes/routesModel";
import useHandleUsers from "../hooks/useHandleUsers";
import initialSignupForm from "../helpers/initialForms/initialSignupForm";
import EditUserSchema from "../models/Joi/userEditSchema";
import mapUserToModel from "../helpers/normalization/mapUserToModel";
import UserForm from "../components/UserForm";
import { Container } from "@mui/material";

const EditUserPage = () => {
 
  const { userId } = useParams();
 
  const navigate = useNavigate();
  const { user } = useUser();
  const { handelEditUser,handelGetUser} = useHandleUsers();
  const { value, ...rest } = useForm(
    initialSignupForm,
    EditUserSchema,
    handelEditUser
  );

  const { data, errors } = value;

  const { handleInputChange, handleReset, onSubmit, validateForm, setData } = rest;

  useEffect(() => {
    if (userId)
      handelGetUser(userId).then((userFromClient) => {


        if (user?._id !== userFromClient!._id) return navigate(ROUTES.ROOT);
        const modeledUser = mapUserToModel(userFromClient!);
        setData(modeledUser);
        // console.log(modeledUser);
      });
  }, []);


 
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
