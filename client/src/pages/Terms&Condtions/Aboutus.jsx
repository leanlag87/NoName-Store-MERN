import React from "react";
import { Grid } from "@mui/material";
import MetaData from "../../components/ui/MetaData/MetaData";
import TermsImage from "../../assets/about/open24hs.JPG";
import * as AboutUsPageStyles from "./Styles/AboutUsPageStyles";

const About_UsPage = () => {
  return (
    <>
      <AboutUsPageStyles.AboutUsSection>
        <MetaData title={"About Us"} />
        <AboutUsPageStyles.StyledContainer>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <AboutUsPageStyles.AboutImage
                src={TermsImage}
                alt="NoName-Store"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AboutUsPageStyles.AboutTitle variant="h2" component="h1">
                Sobre nosotros
              </AboutUsPageStyles.AboutTitle>
              <AboutUsPageStyles.IntroText variant="body1">
                NoName-Store es una empresa emergente de venta de artículos en
                línea. Hemos atendido a más de 20 000 clientes a través de las
                redes sociales y otras plataformas. Estamos orgullosos de
                ofrecer nuestros propios productos.
              </AboutUsPageStyles.IntroText>
              <AboutUsPageStyles.IntroText variant="body1">
                NoName-Store fue fundada por Leandro Gonzalez, un estudiante
                Universitario de Programacion, Leandro Gonzalez inició este
                Proyecto para ir ganando experiencia en el sector IT.
              </AboutUsPageStyles.IntroText>
            </Grid>
          </Grid>
        </AboutUsPageStyles.StyledContainer>
        <AboutUsPageStyles.StyledContainer>
          <AboutUsPageStyles.AboutHeading variant="h3" component="h1">
            Quienes somos
          </AboutUsPageStyles.AboutHeading>
          <AboutUsPageStyles.InfoText variant="body1">
            NoName-Store se dedica a proporcionar productos de de alta calidad a
            todos nuestros clientes. Con un enfoque en la innovación, la
            artesanía y la satisfacción del cliente, nos hemos convertido en una
            marca confiable.
          </AboutUsPageStyles.InfoText>
          <AboutUsPageStyles.InfoText variant="body1">
            Desde nuestros inicios, hemos creado una sólida base de clientes y
            ampliado nuestra gama de productos para satisfacer las diversas
            necesidades de los cliente. Nos enorgullecemos de ofrecer productos
            genuinos que son cuidadosamente seleccionados y probados para
            garantizar su calidad y rendimiento. Nuestro equipo de expertos
            trabaja en estrecha colaboración con los fabricantes para garantizar
            que nuestros clientes reciban productos de primera calidad.
          </AboutUsPageStyles.InfoText>
          <AboutUsPageStyles.InfoText variant="body1">
            En NoName-Store, creemos en fomentar relaciones a largo plazo con
            nuestros clientes. Brindamos un excelente servicio al cliente y nos
            esforzamos por superar las expectativas en cada paso. Nos
            comprometemos a brindar una experiencia de compra en línea perfecta
            y garantizar la satisfacción del cliente. Únase a nosotros en este
            emocionante viaje mientras seguimos creciendo y ampliando nuestro
            alcance.
          </AboutUsPageStyles.InfoText>
        </AboutUsPageStyles.StyledContainer>
        <AboutUsPageStyles.StyledContainer>
          <AboutUsPageStyles.AboutHeading variant="h3" component="h1">
            Nuestra Misión
          </AboutUsPageStyles.AboutHeading>
          <AboutUsPageStyles.InfoText variant="body1">
            En NoName-Store nuestra pasión es brindarte productos de alta
            calidad a precios accesibles. Nos impulsa el compromiso de apoyar a
            personas de todo el pais, ofreciéndote productos que cumplen con los
            más altos estándares de calidad y rendimiento.También sabemos lo
            importante que es contar con un servicio cercano y eficiente. Por
            eso, nuestro equipo está siempre listo para atender tus consultas,
            recibir tus sugerencias y ayudarte en todo lo que necesites. No
            dudes en contactarnos: estamos aquí para asegurarnos de que
            disfrutes de la mejor experiencia, tanto en nuestros productos como
            en la atención que mereces.
          </AboutUsPageStyles.InfoText>
          <AboutUsPageStyles.InfoText variant="body1">
            En NoName-Store sabemos que tu experiencia es lo más importante. Por
            eso, nos esforzamos día a día por ofrecerte un servicio excepcional
            y estar siempre listos para atender tus inquietudes. Nuestro equipo
            de atención al cliente está a tu disposición para responder
            cualquier consulta, recibir tus sugerencias o ayudarte a resolver
            cualquier inconveniente que puedas tener. Creemos firmemente que una
            comunicación cercana y eficiente es la clave para mejorar
            continuamente, por lo que valoramos cada mensaje que nos envías. No
            dudes en contactarnos: estamos aquí para asegurarnos de que tu
            experiencia de compra sea siempre positiva.
          </AboutUsPageStyles.InfoText>

          <AboutUsPageStyles.ButtonContainer>
            <AboutUsPageStyles.StyledLink to="/products">
              <AboutUsPageStyles.ProductButton variant="contained">
                Nuestros productos
              </AboutUsPageStyles.ProductButton>
            </AboutUsPageStyles.StyledLink>
            <AboutUsPageStyles.StyledLink to="/contact">
              <AboutUsPageStyles.ContactButton variant="contained">
                Contacta con nosotros
              </AboutUsPageStyles.ContactButton>
            </AboutUsPageStyles.StyledLink>
          </AboutUsPageStyles.ButtonContainer>
        </AboutUsPageStyles.StyledContainer>
      </AboutUsPageStyles.AboutUsSection>
    </>
  );
};

export default About_UsPage;
