import React, { useState } from "react";
import "./Styles/shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../store/reducers/cartSlice";
import MetaData from "../ui/MetaData/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import * as ShippingStyles from "./Styles/ShippingStyles";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [firstName, setFirstName] = useState(shippingInfo.firstName);
  const [lastName, setLastName] = useState(shippingInfo.lastName);
  const [city, setCity] = useState(shippingInfo.city);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country || "Argentina");
  const [phoneNo, setPhone] = useState(shippingInfo.phoneNo || "");
  const [email, setEmail] = useState(shippingInfo.email);
  const [saveAddress, setSaveAddress] = useState(false);
  const [sameBillingDelivery, setSameBillingDelivery] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isPhoneNoValid, setIsPhoneNoValid] = useState(true);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handlePincodeChange = (event) => {
    setPinCode(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleCountryChange = (value) => {
    setCountry(value.label);
  };

  const handlePhoneChange = (event) => {
    const newPhoneNo = event.target.value;
    setPhone(newPhoneNo);
    setIsPhoneNoValid(newPhoneNo !== "" && newPhoneNo.length === 10);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(
      newEmail === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
    );
  };

  const handleSaveAddressChange = (event) => {
    setSaveAddress(event.target.checked);
  };

  const handleSameBillingDeliveryChange = (event) => {
    setSameBillingDelivery(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      email === "" ||
      firstName === "" ||
      lastName === "" ||
      address === "" ||
      city === "" ||
      state === "" ||
      country === "" ||
      pinCode === "" ||
      phoneNo === ""
    ) {
      toast.error("Por favor rellene todos los campos");
      return;
    }

    if (phoneNo && phoneNo.length !== 10) {
      toast.error("El número de teléfono debe tener 10 dígitos.");
      return;
    }

    dispatch(
      saveShippingInfo({
        address,
        city,
        state,
        country,
        pinCode,
        phoneNo,
        email,
        firstName,
        lastName,
      })
    );
    navigate("/process/payment");
  };

  return (
    <>
      <ShippingStyles.ShippingPage>
        <MetaData title={"Shipping Info"} />
        <CheckoutSteps activeStep={1} />

        <ShippingStyles.ShippingPageContainer>
          <ShippingStyles.ShippingPageContainerLeft>
            <ShippingStyles.ShippingRoot>
              <form onSubmit={handleSubmit}>
                <ShippingStyles.Heading variant="h6">
                  DIRECCIÓN DE ENVÍO
                </ShippingStyles.Heading>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <ShippingStyles.OutlinedInput
                      label="Nombre"
                      variant="outlined"
                      fullWidth
                      value={firstName}
                      onChange={handleFirstNameChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ShippingStyles.OutlinedInput
                      label="Apellido"
                      variant="outlined"
                      fullWidth
                      value={lastName}
                      onChange={handleLastNameChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ShippingStyles.OutlinedInput
                      label="Direccion"
                      variant="outlined"
                      fullWidth
                      value={address}
                      onChange={handleAddressChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <ShippingStyles.OutlinedInput
                      label="Ciudad"
                      variant="outlined"
                      fullWidth
                      value={city}
                      onChange={handleCityChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <ShippingStyles.OutlinedInput
                      label="Codigo Postal"
                      variant="outlined"
                      fullWidth
                      value={pinCode}
                      onChange={handlePincodeChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <ShippingStyles.OutlinedInput
                      label="Provincia"
                      variant="outlined"
                      fullWidth
                      value={state}
                      onChange={handleStateChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <ShippingStyles.OutlinedInput
                      label="Pais"
                      variant="outlined"
                      fullWidth
                      value={country}
                      onChange={handleCountryChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <ShippingStyles.OutlinedInput
                      label="Telefono"
                      variant="outlined"
                      fullWidth
                      value={phoneNo}
                      onChange={handlePhoneChange}
                      error={!isPhoneNoValid && phoneNo !== ""}
                      helperText={
                        !isPhoneNoValid &&
                        phoneNo &&
                        "Por favor, introduzca un número de teléfono válido."
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ShippingStyles.OutlinedInput
                      label="Email"
                      variant="outlined"
                      fullWidth
                      value={email}
                      onChange={handleEmailChange}
                      error={!isValidEmail && email !== ""}
                      helperText={
                        !isValidEmail &&
                        email &&
                        "Por favor, introduce una dirección de correo electrónico válida."
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ShippingStyles.StyledFormControlLabel
                      control={
                        <ShippingStyles.StyledCheckBox
                          checked={saveAddress}
                          onChange={handleSaveAddressChange}
                        />
                      }
                      label="Guardar dirección en la libreta de direcciones"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ShippingStyles.StyledFormControlLabel
                      control={
                        <ShippingStyles.StyledCheckBox
                          checked={sameBillingDelivery}
                          onChange={handleSameBillingDeliveryChange}
                        />
                      }
                      label="Mi información de facturación y entrega son la misma."
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ShippingStyles.SubmitButton
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Continue
                    </ShippingStyles.SubmitButton>
                  </Grid>
                </Grid>
              </form>
            </ShippingStyles.ShippingRoot>
          </ShippingStyles.ShippingPageContainerLeft>
        </ShippingStyles.ShippingPageContainer>
      </ShippingStyles.ShippingPage>
    </>
  );
};

export default Shipping;
