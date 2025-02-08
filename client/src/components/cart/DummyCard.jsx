import React from "react";
import { toast } from "react-toastify";
import * as DummyCardStyles from "./Styles/DummyCardStyles";
import { DialogTitle, DialogActions } from "@mui/material";

const DummyCard = ({ onClose }) => {
  const handleValueCopy = (value) => {
    navigator.clipboard.writeText(value);
    toast.success("Número copiado");
  };

  return (
    <>
      <DummyCardStyles.StyledDialog open={true} onClose={onClose}>
        <DialogTitle disableTypography>Dummy Card</DialogTitle>
        <DummyCardStyles.StyledDialogContent>
          <DummyCardStyles.CreditCard>
            <DummyCardStyles.CloseButton onClick={onClose}>
              X
            </DummyCardStyles.CloseButton>
            <DummyCardStyles.Chip></DummyCardStyles.Chip>
            <DummyCardStyles.CreditCardText
              onClick={() => handleValueCopy("CREDIT CARD")}
            >
              TARJETA DE CRÉDITO
            </DummyCardStyles.CreditCardText>
            <DummyCardStyles.CardNumber
              onClick={() => handleValueCopy("4242 4242 4242 4242")}
            >
              4242 4242 4242 4242
            </DummyCardStyles.CardNumber>
            <DummyCardStyles.CardDetails>
              <div>
                <DummyCardStyles.Label>EXPIRY</DummyCardStyles.Label>
                <DummyCardStyles.Value onClick={() => handleValueCopy("12/23")}>
                  12/23
                </DummyCardStyles.Value>
              </div>
              <div>
                <DummyCardStyles.Label>CVV</DummyCardStyles.Label>
                <DummyCardStyles.Value onClick={() => handleValueCopy("123")}>
                  123
                </DummyCardStyles.Value>
              </div>
            </DummyCardStyles.CardDetails>
            <DummyCardStyles.Value
              onClick={() => handleValueCopy("Robert Downey Jr")}
            >
              Roberto Perez
            </DummyCardStyles.Value>
          </DummyCardStyles.CreditCard>
        </DummyCardStyles.StyledDialogContent>
        <DialogActions>
          <DummyCardStyles.HintButton
            onClick={() => handleValueCopy("4242 4242 4242 4242")}
          >
            Haga clic para copiar el número de tarjeta
          </DummyCardStyles.HintButton>
        </DialogActions>
      </DummyCardStyles.StyledDialog>
    </>
  );
};

export default DummyCard;
