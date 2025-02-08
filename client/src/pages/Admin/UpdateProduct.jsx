import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import MetaData from "../../components/ui/MetaData/MetaData";
import Loader from "../../components/ui/Loader/Loader";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import Sidebar from "./Sidebar";
import {
  updateProduct,
  clearErrors,
  getProductDetails,
  resetUpdateProduct,
} from "../../store/reducers/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CollectionsIcon from "@mui/icons-material/Collections";
import InfoIcon from "@mui/icons-material/Info";
import MenuItem from "@mui/material/MenuItem";
import Navbar from "./Navbar";
import * as LoginFromStyle from "../../components/user/Styles/LoginFromStyle";
import { categories } from "../utils/categories";

function UpdateProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productId = useParams().id;
  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.deleteUpdateProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isCategory, setIsCategory] = useState(false);
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [info, setInfo] = useState("");
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const fileInputRef = useRef();
  const [toggle, setToggle] = useState(false);
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setIsCategory(true);
  };

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory("");
      setInfo(product.info);
      setStock(product.Stock);
      setOldImages(product.images);
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
  }, [dispatch, error, navigate, isUpdated, productId, product, updateError]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    myForm.set("info", info);
    images.forEach((currImg) => {
      myForm.append("images", currImg);
    });

    dispatch(updateProduct(productId, myForm));
  };

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

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

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Create Product" />
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
                <LoginFromStyle.Form onSubmit={createProductSubmitHandler}>
                  <LoginFromStyle.StyledAvatar>
                    <AddCircleOutlineIcon />
                  </LoginFromStyle.StyledAvatar>
                  <LoginFromStyle.Heading>
                    Crear Producto
                  </LoginFromStyle.Heading>
                  <LoginFromStyle.NameInput
                    variant="outlined"
                    fullWidth
                    label="Product Name"
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
                    label="Price"
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
                    label="Product Info"
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
                  <LoginFromStyle.DescriptionInput
                    variant="outlined"
                    fullWidth
                    label="Product Description"
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
                      onChange={updateProductImagesChange}
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
                    {imagesPreview.length > 0
                      ? imagesPreview.map((image, index) => (
                          <LoginFromStyle.Image
                            key={index}
                            src={image}
                            alt="Product Preview"
                          />
                        ))
                      : oldImages.map((image, index) => (
                          <LoginFromStyle.Image
                            key={index}
                            src={image.url}
                            alt="Old Product Preview"
                          />
                        ))}
                  </LoginFromStyle.ImageArea>
                  <LoginFromStyle.LoginButton
                    variant="contained"
                    fullWidth
                    onClick={createProductSubmitHandler}
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

export default UpdateProduct;
