import React from "react";
import * as ServicesStyles from "./Styles/ServicesStyles";

const servicesData = [
  {
    id: 1,
    icon: <ServicesStyles.StyledLocalShipping fontSize="large" />,
    title: "Envio Express",
    info: "Envío en 24 horas",
  },
  {
    id: 2,
    icon: <ServicesStyles.StyledSecurity fontSize="large" />,
    title: "Garantía de marca",
    info: "Productos 100% originales",
  },
  {
    id: 3,
    icon: <ServicesStyles.StyledLocalOffer fontSize="large" />,
    title: "Ofertas Impactantes",
    info: "En todos los pedidos prepagos",
  },
  {
    id: 4,
    icon: <ServicesStyles.StyledCreditCard fontSize="large" />,
    title: "Pagos seguros",
    info: "SSL / Certificado Seguro",
  },
];

const Services = () => {
  return (
    <>
      <ServicesStyles.ServicesSection>
        <ServicesStyles.ServicesWrapper>
          {servicesData.map((item) => {
            return (
              <ServicesStyles.ServicesCard key={item.id}>
                <ServicesStyles.ServicesIcon>
                  {item.icon}
                </ServicesStyles.ServicesIcon>
                <div>
                  <ServicesStyles.ServicesCardTitle>
                    {item.title}
                  </ServicesStyles.ServicesCardTitle>
                  <ServicesStyles.ServicesCardInfo>
                    {item.info}
                  </ServicesStyles.ServicesCardInfo>
                </div>
              </ServicesStyles.ServicesCard>
            );
          })}
        </ServicesStyles.ServicesWrapper>
      </ServicesStyles.ServicesSection>
    </>
  );
};

export default Services;
