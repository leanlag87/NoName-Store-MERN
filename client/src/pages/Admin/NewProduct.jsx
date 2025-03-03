import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Componentes UI personalizados
import MetaData from "../../components/ui/MetaData/MetaData";
import Loader from "../../components/ui/Loader/Loader";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import * as LoginFromStyle from "../../components/user/Styles/LoginFromStyle";

// Material UI
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";

// Iconos
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CollectionsIcon from "@mui/icons-material/Collections";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import InfoIcon from "@mui/icons-material/Info";

// Redux actions
import {
  newProduct,
  clearErrors,
  resetNewProduct,
} from "../../store/reducers/productSlice";

// Categorías
import { categories } from "../utils/categories";

function NewProduct() {
  // Redux y React Router
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.product);

  // Estado del formulario
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [info, setInfo] = useState("");
  // Estado para manejo de imágenes
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const fileInputRef = useRef();
  // Estado UI
  const [isCategory, setIsCategory] = useState(false);
  const [toggle, setToggle] = useState(false);

  //Manejadores de eventos
  const toggleHandler = () => {
    setToggle(!toggle);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setIsCategory(true);
  };

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  //Procesa las imágenes seleccionadas y crea una vista previa
  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  //Manejador de envío de formulario
  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    // Agregar datos básicos del producto
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    myForm.set("info", info);
    // Agregar todas las imágenes
    images.forEach((currImg) => {
      myForm.append("images", currImg);
    });

    dispatch(newProduct(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Producto creado con éxito");
      navigate("/admin/dashboard");
      dispatch(resetNewProduct());
    }
  }, [dispatch, error, navigate, success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Nuevo Producto" />
          <LoginFromStyle.UpdateProduct>
            <LoginFromStyle.SidebarContainer
              className={!toggle ? "firstBox" : "toggleBox"}
            >
              <Sidebar />
            </LoginFromStyle.SidebarContainer>
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
              <Box sx={{ margin: "0rem" }}>
                <Navbar toggleHandler={toggleHandler} />
              </Box>

              <LoginFromStyle.FormContainer sx={{ marginTop: "-6rem" }}>
                <LoginFromStyle.Form
                  encType="multipart/form-data"
                  onSubmit={createProductSubmitHandler}
                >
                  <LoginFromStyle.StyledAvatar>
                    <AddCircleOutlineIcon />
                  </LoginFromStyle.StyledAvatar>
                  <LoginFromStyle.Heading>
                    Crear producto
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

                  <LoginFromStyle.SelectOption>
                    {!isCategory && (
                      <LoginFromStyle.LabelText category={category}>
                        Elija categoría
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
                            <em>Elija categoría</em>
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

                  <LoginFromStyle.DescriptionInput
                    variant="outlined"
                    fullWidth
                    label="Descripción de producto"
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
                      onChange={createProductImagesChange}
                      multiple
                      style={{ display: "none" }}
                      ref={fileInputRef}
                    />
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

                  <LoginFromStyle.ImageArea>
                    {imagesPreview &&
                      imagesPreview.map((image, index) => (
                        <LoginFromStyle.Image
                          key={index}
                          src={image}
                          alt="Product Preview"
                        />
                      ))}
                  </LoginFromStyle.ImageArea>

                  <LoginFromStyle.LoginButton
                    variant="contained"
                    fullWidth
                    type="submit"
                    disabled={loading}
                  >
                    Crear
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

export default NewProduct;
