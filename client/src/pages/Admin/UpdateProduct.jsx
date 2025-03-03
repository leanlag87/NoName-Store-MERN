import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../../components/ui/MetaData/MetaData";
import Loader from "../../components/ui/Loader/Loader";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import {
  updateProduct,
  clearErrors,
  getProductDetails,
  resetUpdateProduct,
} from "../../store/reducers/productSlice";
import { toast } from "react-toastify";

// Material UI
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";

// Iconos
import StorageIcon from "@mui/icons-material/Storage";
import DescriptionIcon from "@mui/icons-material/Description";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CollectionsIcon from "@mui/icons-material/Collections";
import InfoIcon from "@mui/icons-material/Info";

// Estilos y datos
import * as LoginFromStyle from "../../components/user/Styles/LoginFromStyle";
import { categories } from "../utils/categories";

function UpdateProduct() {
  // Redux y React Router
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: productId } = useParams();

  // Estados de Redux
  const {
    error,
    product,
    loading: producLoading,
  } = useSelector((state) => state.product);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  // Estados del formulario
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [info, setInfo] = useState("");

  // Estados para imágenes
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const fileInputRef = useRef();

  // Estados UI
  const [toggle, setToggle] = useState(false);
  const [isCategory, setIsCategory] = useState(false);

  //Maneja el cambio de categoria
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setIsCategory(true);
  };

  //Muestra/ocuta el sidebar
  const toggleHandler = () => {
    setToggle(!toggle);
  };

  //Activa el selector de archivos
  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  //Actualiza las imágenes del producto y las muestra en el formulario
  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
    setOldImages([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((prev) => [...prev, reader.result]);
          setImages((prev) => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  //Manejador de envío del formulario con
  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    // Añadir todos los campos al FormData
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    myForm.set("info", info);

    // Añadir imágenes si hay nuevas
    images.forEach((currImg) => {
      myForm.append("images", currImg);
    });

    dispatch(updateProduct({ id: productId, productData: myForm }));
  };

  useEffect(() => {
    // Primero cargar los detalles del producto si no existen o no coincide con el ID
    if (!product || (product && product._id !== productId)) {
      dispatch(getProductDetails(productId));
    }
    // Solo setear los valores cuando el producto tenga datos
    else if (product && product.name) {
      setName(product.name || "");
      setDescription(product.description || "");
      setPrice(product.price || 0);
      setCategory(product.category || "");
      setInfo(product.info || "");
      setStock(product.Stock || 0);
      setOldImages(product.images || []);
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
      toast.success("Producto actualizado correctamente");
      navigate("/admin/products");
      dispatch(resetUpdateProduct());
    }
  }, [dispatch, navigate, error, isUpdated, productId, product, updateError]);

  return (
    <>
      {loading || producLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Actualizar Producto" />
          <LoginFromStyle.UpdateProduct>
            {/* Barra lateral */}
            <LoginFromStyle.SidebarContainer
              className={!toggle ? "firstBox" : "toggleBox"}
            >
              <Sidebar />
            </LoginFromStyle.SidebarContainer>

            {/* Contenedor principal */}
            <Box
              sx={{
                width: "75%",
                backgroundColor: "#f1f1f1",
                height: "fit-content",
                display: "flex",
                flexDirection: "column",
                margin: "-0.5rem 0 0 0",
                gap: "10px",
                justifyContent: "center",
                "@media (max-width: 999px)": {
                  width: "100%",
                },
              }}
            >
              {/* Barra de navegación */}
              <Box sx={{ margin: "0rem" }}>
                <Navbar toggleHandler={toggleHandler} />
              </Box>
              {/* Formulario */}
              <LoginFromStyle.FormContainer sx={{ marginTop: "-6rem" }}>
                <LoginFromStyle.Form onSubmit={updateProductSubmitHandler}>
                  <LoginFromStyle.StyledAvatar>
                    <AddCircleOutlineIcon />
                  </LoginFromStyle.StyledAvatar>
                  <LoginFromStyle.Heading>
                    Crear Producto
                  </LoginFromStyle.Heading>
                  <LoginFromStyle.NameInput
                    variant="outlined"
                    fullWidth
                    label="Nombre del producto"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <ShoppingCartOutlinedIcon
                            sx={{
                              fontSize: 20,
                              color: "#414141",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {/* Precio */}
                  <LoginFromStyle.NameInput
                    variant="outlined"
                    label="Precio"
                    value={price}
                    required
                    fullWidth
                    onChange={(e) => setPrice(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          sx={{
                            fontSize: 20,
                            color: "#414141",
                          }}
                        >
                          <AttachMoneyIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {/* Stock */}
                  <LoginFromStyle.NameInput
                    variant="outlined"
                    label="Stock"
                    value={Stock}
                    required
                    onChange={(e) => setStock(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          sx={{
                            fontSize: 20,
                            color: "#414141",
                          }}
                        >
                          <StorageIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {/* Información adicional */}
                  <LoginFromStyle.NameInput
                    variant="outlined"
                    label="Información del producto"
                    value={info}
                    required
                    onChange={(e) => setInfo(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          sx={{
                            fontSize: 20,
                            color: "#414141",
                          }}
                        >
                          <InfoIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {/* Selector de categoría */}
                  <LoginFromStyle.SelectOption>
                    {!isCategory && (
                      <LoginFromStyle.LabelText category={category}>
                        Elija una categoría
                      </LoginFromStyle.LabelText>
                    )}
                    <LoginFromStyle.StyledFormControl>
                      <LoginFromStyle.StyledSelect
                        variant="outlined"
                        fullWidth
                        value={category}
                        onChange={handleCategoryChange}
                        inputProps={{
                          name: "category",
                          id: "category-select",
                        }}
                        MenuProps={{
                          classes: {
                            paper: "MuiPaper-root",
                          },
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                          },
                          transformOrigin: {
                            vertical: "top",
                            horizontal: "left",
                          },
                          getContentAnchorEl: null,
                        }}
                      >
                        {!category && (
                          <MenuItem value="">
                            <em>Elija una categoría</em>
                          </MenuItem>
                        )}
                        {categories.map((cate) => (
                          <MenuItem key={cate} value={cate}>
                            {cate}
                          </MenuItem>
                        ))}
                      </LoginFromStyle.StyledSelect>
                    </LoginFromStyle.StyledFormControl>
                  </LoginFromStyle.SelectOption>
                  {/* Descripción */}
                  <LoginFromStyle.DescriptionInput
                    variant="outlined"
                    fullWidth
                    label="Descripción del producto"
                    multiline
                    rows={1}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <DescriptionIcon
                            sx={{
                              marginRight: 1,
                              color: "text.secondary",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {/* Sección de carga de imágenes */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "3.5rem",
                    }}
                  >
                    <Box
                      sx={{
                        width: "auto",
                        marginLeft: "1rem",
                        alignSelf: "center",
                        "& svg": {
                          color: "#414141",
                          fontSize: "2.5rem !important",
                          boxShadow: `0px 4px 10px rgba(0, 0, 0, 0.3)`,
                        },
                      }}
                    >
                      <CollectionsIcon fontSize="large" />
                    </Box>
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={updateProductImagesChange}
                      multiple
                      style={{ display: "none" }}
                      ref={fileInputRef}
                    />
                    {/* Botón para activar selector de archivos */}
                    <label htmlFor="avatar-input">
                      <LoginFromStyle.UploadAvatarButton
                        variant="contained"
                        color="inherit"
                        onClick={handleImageUpload}
                        startIcon={
                          <CloudUploadIcon
                            sx={{
                              color: "#FFFFFF",
                            }}
                          />
                        }
                      >
                        <LoginFromStyle.UploadAvatarText>
                          Subir imágenes
                        </LoginFromStyle.UploadAvatarText>
                      </LoginFromStyle.UploadAvatarButton>
                    </label>
                  </Box>
                  {/* Área de vista previa de imágenes */}
                  <LoginFromStyle.ImageArea>
                    {imagesPreview.length > 0
                      ? imagesPreview.map((image, index) => (
                          <LoginFromStyle.Image
                            key={index}
                            src={image}
                            alt="Vista previa del producto"
                          />
                        ))
                      : oldImages.map((image, index) => (
                          <LoginFromStyle.Image
                            key={index}
                            src={image.url}
                            alt="Imagen anterior del producto"
                          />
                        ))}
                  </LoginFromStyle.ImageArea>
                  {/* Botón de enviar */}
                  <LoginFromStyle.LoginButton
                    variant="contained"
                    fullWidth
                    type="submit"
                    disabled={loading}
                  >
                    Actualizar
                  </LoginFromStyle.LoginButton>
                </LoginFromStyle.Form>
              </LoginFromStyle.FormContainer>
            </Box>
          </LoginFromStyle.UpdateProduct>
        </>
      )}
    </>
  );
}

export default UpdateProduct;
