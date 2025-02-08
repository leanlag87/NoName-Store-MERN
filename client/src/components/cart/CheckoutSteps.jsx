import React from "react";
import { Stepper, Step } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as CheckoutStepsStyles from "./Styles/CheckoutStepsStyles";

const ColorlibStepIcon = ({ active, completed, icon, onClick }) => {
  return (
    <CheckoutStepsStyles.ColorlibStepIconRoot
      active={active}
      completed={completed}
      onClick={onClick}
    >
      {icon}
    </CheckoutStepsStyles.ColorlibStepIconRoot>
  );
};

const CheckoutSteps = ({ activeStep }) => {
  const navigate = useNavigate();
  const steps = [
    { label: "CARRITO", icon: "1", link: "/cart" },
    { label: "ENVIO", icon: "2", link: "/shipping" },
    { label: "PAGO", icon: "3", link: "/process/payment" },
    { label: "PEDIDO COMPLETO", icon: "4", link: "/success" },
  ];

  const handleStepClick = (stepIndex) => {
    if (stepIndex < activeStep) {
      navigate(steps[stepIndex].link);
    }
  };

  return (
    <CheckoutStepsStyles.StepReader>
      <CheckoutStepsStyles.Root>
        <Stepper
          activeStep={activeStep}
          connector={<CheckoutStepsStyles.ColorlibConnector />}
        >
          {steps.map((step, index) => (
            <Step key={step.label}>
              <CheckoutStepsStyles.StepLabelStyled
                StepIconComponent={({ active, completed, icon }) => (
                  <ColorlibStepIcon
                    active={active}
                    completed={completed}
                    icon={icon}
                    onClick={() => handleStepClick(index)}
                  />
                )}
              >
                {step.label}
              </CheckoutStepsStyles.StepLabelStyled>
            </Step>
          ))}
        </Stepper>
      </CheckoutStepsStyles.Root>
    </CheckoutStepsStyles.StepReader>
  );
};

export default CheckoutSteps;
