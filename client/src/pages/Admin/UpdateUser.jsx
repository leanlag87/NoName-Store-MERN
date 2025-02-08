import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MetaData from "../../components/ui/MetaData/MetaData";
import Loader from "../../components/ui/Loader/Loader";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import {
  getUserAdmin,
  updateUser,
  clearErrors,
  resetUpdate,
} from "../../store/reducers/userSlice";
import * as UpdateUserStyles from "./Styles/UpdateUserStyles";
import { InputAdornment } from "@mui/material";

function UpdateUser() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profileData);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [toggle, setToggle] = useState(false);

  // togle handler =>
  const toggleHandler = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserAdmin(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Usuario actualizado con éxito");
      navigate("/admin/users");
      dispatch(resetUpdate());
    }
  }, [dispatch, error, navigate, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update User" />
          <UpdateUserStyles.UpdateUserContainer>
            <UpdateUserStyles.FirstBox className={!toggle ? "" : "toggle-box"}>
              <Sidebar />
            </UpdateUserStyles.FirstBox>

            <UpdateUserStyles.SecondBox>
              <UpdateUserStyles.NavBarContainer>
                <Navbar toggleHandler={toggleHandler} />
              </UpdateUserStyles.NavBarContainer>
              <UpdateUserStyles.FormSection>
                <UpdateUserStyles.Form onSubmit={updateUserSubmitHandler}>
                  <UpdateUserStyles.StyledAvatar>
                    <UpdateUserStyles.StyledAccountCircleIcon />
                  </UpdateUserStyles.StyledAvatar>
                  <UpdateUserStyles.Heading variant="h5" component="h1">
                    Actualizar Rol
                  </UpdateUserStyles.Heading>

                  <UpdateUserStyles.NameInput>
                    <UpdateUserStyles.StyledTextField
                      variant="outlined"
                      fullWidth
                      label="Product Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </UpdateUserStyles.NameInput>

                  <UpdateUserStyles.NameInput>
                    <UpdateUserStyles.StyledTextField
                      variant="outlined"
                      fullWidth
                      label="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <UpdateUserStyles.StyledMailOutlineIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </UpdateUserStyles.NameInput>

                  <div style={{ position: "relative" }}>
                    <label
                      htmlFor="role_field"
                      style={{
                        marginLeft: "10px",
                        fontSize: "12px",
                        width: "300px",
                        color: "#414141",
                      }}
                    >
                      Rol*
                    </label>
                    <UpdateUserStyles.StyledSelect
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      MenuProps={{
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                        getContentAnchorEl: null,
                      }}
                    >
                      <UpdateUserStyles.StyledMenuItem value="" disabled>
                        <em style={{ background: "inherit", color: "#414141" }}>
                          Elija un rol
                        </em>
                      </UpdateUserStyles.StyledMenuItem>
                      <UpdateUserStyles.StyledMenuItem value="admin">
                        Admin
                      </UpdateUserStyles.StyledMenuItem>
                      <UpdateUserStyles.StyledMenuItem value="user">
                        User
                      </UpdateUserStyles.StyledMenuItem>
                    </UpdateUserStyles.StyledSelect>
                  </div>

                  <UpdateUserStyles.LoginButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={updateLoading || role === ""}
                  >
                    Actualizar
                  </UpdateUserStyles.LoginButton>
                </UpdateUserStyles.Form>
              </UpdateUserStyles.FormSection>
            </UpdateUserStyles.SecondBox>
          </UpdateUserStyles.UpdateUserContainer>
        </>
      )}
    </>
  );
}

export default UpdateUser;
