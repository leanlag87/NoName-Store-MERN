import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import MetaData from "../../components/ui/MetaData/MetaData";
import * as ContactFormStyles from "./Styles/ContactFormStyles";
import { FormControl } from "@mui/material";

const ContactForm = () => {
  const navigate = useNavigate();
  const handleCall = () => {
    window.location.href = "tel:+549XXXXXXXXXX";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Tu mensaje ha sido enviado exitosamente");
    navigate("/");
  };

  return (
    <ContactFormStyles.Root>
      <MetaData title={"Contact Us"} />
      <ContactFormStyles.ContactContainer>
        <ContactFormStyles.Title variant="h2">
          Contacta con nosotros
        </ContactFormStyles.Title>

        <ContactFormStyles.StyledDivider />

        <ContactFormStyles.HelpTitle variant="h4">
          ¿Necesitas ayuda?
        </ContactFormStyles.HelpTitle>

        <ContactFormStyles.Para variant="body2">
          Tenemos chat en vivo disponible, busca el ícono de chat en la parte
          inferior derecha esquina de esta página. Si no está allí, llámenos al{" "}
          <strong
            style={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={handleCall}
          >
            +549XXXXXXXXXX
          </strong>
          .
        </ContactFormStyles.Para>

        <ContactFormStyles.Para variant="body2">
          <span>7:00-18:00 Lunes-Viernes</span>
          <br />
          <span>9:00-16:00 Sábado</span>
          <br />
          <span>Domingo cerrado</span>
        </ContactFormStyles.Para>

        <ContactFormStyles.Para variant="body2">
          ¿Nos encuentras fuera de este horario? Completa nuestro formulario de
          soporte a continuación y nos comunicaremos contigo en breve.
        </ContactFormStyles.Para>

        <ContactFormStyles.Address variant="body2">
          <span style={{ fontWeight: "500", paddingBottom: "0.5rem" }}>
            NoName-Store.
          </span>
          <br />
          Calle SN 400
          <br />
          Tucuman CP: 4000
          <br />
          Argentina
        </ContactFormStyles.Address>

        <ContactFormStyles.ButtonGroup>
          <a href="#issue-select" style={{ textDecoration: "none" }}>
            <ContactFormStyles.SupportButton variant="contained">
              Formulario de soporte
            </ContactFormStyles.SupportButton>
          </a>

          <ContactFormStyles.CallButton
            variant="contained"
            onClick={handleCall}
          >
            Llámanos
          </ContactFormStyles.CallButton>
        </ContactFormStyles.ButtonGroup>

        <ContactFormStyles.StyledDivider />
        <ContactFormStyles.SupportForm>
          <ContactFormStyles.Title
            variant="h4"
            style={{ paddingBottom: "1rem" }}
          >
            Formulario de soporte
          </ContactFormStyles.Title>

          <ContactFormStyles.Para variant="body2">
            ¿Necesita una respuesta más rápida? Busque nuestro ícono de chat en
            el lado derecho de esta página.
          </ContactFormStyles.Para>

          <ContactFormStyles.FormContainer onSubmit={handleSubmit}>
            <ContactFormStyles.SelectOption>
              <ContactFormStyles.LabelText variant="body2">
                ASUNTO *
              </ContactFormStyles.LabelText>
              <FormControl>
                <ContactFormStyles.StyledSelect
                  labelId="issue-label"
                  id="issue-select"
                  defaultValue="e-commerce"
                >
                  <ContactFormStyles.StyledMenuItem value="e-commerce">
                    E-Commerce
                  </ContactFormStyles.StyledMenuItem>
                  <ContactFormStyles.StyledMenuItem value="app">
                    App
                  </ContactFormStyles.StyledMenuItem>
                </ContactFormStyles.StyledSelect>
              </FormControl>
            </ContactFormStyles.SelectOption>

            <ContactFormStyles.SelectOption>
              <ContactFormStyles.LabelText variant="body2">
                DETALLE *
              </ContactFormStyles.LabelText>
              <ContactFormStyles.FormField>
                <ContactFormStyles.StyledSelect
                  labelId="detail-label"
                  id="detail-select"
                  defaultValue="others"
                >
                  <ContactFormStyles.StyledMenuItem value="availability">
                    Disponibilidad
                  </ContactFormStyles.StyledMenuItem>
                  <ContactFormStyles.StyledMenuItem value="return/exchange">
                    Devolución/Cambio
                  </ContactFormStyles.StyledMenuItem>
                  <ContactFormStyles.StyledMenuItem value="technical-support">
                    Soporte técnico
                  </ContactFormStyles.StyledMenuItem>
                  <ContactFormStyles.StyledMenuItem value="invoicing">
                    Facturación
                  </ContactFormStyles.StyledMenuItem>
                  <ContactFormStyles.StyledMenuItem value="tracking-info">
                    Información de seguimiento
                  </ContactFormStyles.StyledMenuItem>
                  <ContactFormStyles.StyledMenuItem value="others">
                    Otros
                  </ContactFormStyles.StyledMenuItem>
                </ContactFormStyles.StyledSelect>
              </ContactFormStyles.FormField>
            </ContactFormStyles.SelectOption>

            <ContactFormStyles.SelectOption>
              <ContactFormStyles.LabelText variant="body2">
                Language *
              </ContactFormStyles.LabelText>
              <ContactFormStyles.FormField>
                <ContactFormStyles.StyledSelect
                  labelId="language-label"
                  id="language-select"
                  defaultValue="spanish"
                >
                  <ContactFormStyles.StyledMenuItem value="spanish">
                    Español
                  </ContactFormStyles.StyledMenuItem>
                  <ContactFormStyles.StyledMenuItem value="english">
                    Ingles
                  </ContactFormStyles.StyledMenuItem>
                  <ContactFormStyles.StyledMenuItem value="italian">
                    Italiano
                  </ContactFormStyles.StyledMenuItem>
                  <ContactFormStyles.StyledMenuItem value="french">
                    Frances
                  </ContactFormStyles.StyledMenuItem>
                  <ContactFormStyles.StyledMenuItem value="german">
                    Aleman
                  </ContactFormStyles.StyledMenuItem>
                </ContactFormStyles.StyledSelect>
              </ContactFormStyles.FormField>
            </ContactFormStyles.SelectOption>

            <ContactFormStyles.SelectOption>
              <ContactFormStyles.LabelText variant="body2">
                {" "}
                EMAIL *
              </ContactFormStyles.LabelText>
              <ContactFormStyles.FormField>
                <ContactFormStyles.StyledTextField
                  placeholder="Ingrese Su Correo  *"
                  id="email-input"
                  type="email"
                />
              </ContactFormStyles.FormField>
            </ContactFormStyles.SelectOption>

            <ContactFormStyles.SelectOption>
              <ContactFormStyles.LabelText variant="body2">
                {" "}
                MENSAJE *
              </ContactFormStyles.LabelText>
              <ContactFormStyles.FormField>
                <ContactFormStyles.StyledTextField
                  id="message-textarea"
                  multiline
                  rows={6}
                  variant="outlined"
                  placeholder="Ingrese Su Mensaje *"
                />
              </ContactFormStyles.FormField>
            </ContactFormStyles.SelectOption>
            <ContactFormStyles.SubmitButton type="submit" variant="contained">
              Enviar
            </ContactFormStyles.SubmitButton>
          </ContactFormStyles.FormContainer>
        </ContactFormStyles.SupportForm>
      </ContactFormStyles.ContactContainer>
    </ContactFormStyles.Root>
  );
};

export default ContactForm;
