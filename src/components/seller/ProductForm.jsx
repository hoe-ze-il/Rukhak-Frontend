import Thumbnail from "./Thumbnail";
import ImagesUpload from "./ImagesUpload";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material//Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import Editor from "./Editor";
import "react-image-crop/dist/ReactCrop.css";
import Autocomplete from "@mui/material/Autocomplete";
import { ProductFormContext } from "@/contexts/seller/ProductFormContext";
import { useContext, useEffect, useState } from "react";
import DiscardModal from "./DiscardModal";
import { useNavigate } from "react-router-dom";
import { markdownToHtml, htmlToMarkdown } from "@/utils/admin/htmlParser";
import dayjs from "dayjs";
import Loading from "@/components/admin/product/Loading";
import {
  useEditOwnProductMutation,
  useCreateOwnProductMutation,
} from "@/features/seller/sellerProductSlice";
import { newProductToFormData } from "@/utils/admin/createProductFormData";
import { editProductToFormData } from "@/utils/admin/editProductFormData";
import { useSelector } from "react-redux";

function ProductForm({ mode, product, setEdit }) {
  const isEditMode = mode === "edit";
  const navigate = useNavigate();
  const { file, files, description, setFile, setFiles, setDescription } =
    useContext(ProductFormContext);

  const categories = useSelector(
    (state) => state.api.queries["getCategory(undefined)"]?.data
  );

  console.log(categories);

  useEffect(() => {
    if (isEditMode) {
      setFile(product?.imgCover || "");
      setFiles(product?.media || []);
      setDescription(markdownToHtml(product?.description) || "");
    }
  }, [mode, product, setFile, setFiles, setDescription]);

  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const [title, setTitle] = useState(isEditMode ? product?.title : "");
  const [selectedCategories, setSelectedCategories] = useState(
    isEditMode ? product?.categories : []
  );
  const [visibility, setVisibility] = useState(
    isEditMode ? product?.status : "Public"
  );
  const [unit, setUnit] = useState(isEditMode ? product.unit : "");
  const [stock, setStock] = useState(isEditMode ? product?.availableStock : "");
  const [stockAlert, setStockAlert] = useState(
    isEditMode ? product?.stockAlert : ""
  );
  const [dimension, setDimension] = useState(
    isEditMode ? product?.dimension : ""
  );
  // const [sellerId, setSellerId] = useState(isEditMode ? product?.sellerId : "");
  const [price, setPrice] = useState(isEditMode ? product?.basePrice : "");
  const [expirationDate, setExpirationDate] = useState(
    isEditMode ? dayjs(product.expirationDate) : dayjs()
  );

  // validators
  const [validTitle, setValidTitle] = useState(true);
  const [validCategory, setValidCategory] = useState(true);
  const [validStock, setValidStock] = useState(true);
  const [validUnit, setValidUnit] = useState(true);
  const [validPrice, setValidPrice] = useState(true);
  const [validStockAlert, setValidStockAlert] = useState(true);
  const [validDescription, setValidDescription] = useState(true);
  const [validThumbnail, setValidThumbnail] = useState(true);
  const [validPhoto, setValidPhoto] = useState(true);
  const [signedImgCover, setSignedImgCover] = useState(
    isEditMode ? product?.signedImgCover : ""
  );
  const [signedMedia, setSignedMedia] = useState(
    isEditMode ? product?.signedMedia : []
  );

  // Initialize hooks
  const [createOwnProduct, { isLoading: isCreatingProduct }] =
    useCreateOwnProductMutation();

  const [editProduct, { isLoading: isEditingProduct }] =
    useEditOwnProductMutation();

  async function validateFieldsAndSubmit() {
    const fieldsToValidate = {
      file: { value: file, setter: setValidThumbnail },
      files: { value: !(files.length === 0), setter: setValidPhoto },
      title: { value: title, setter: setValidTitle },
      description: {
        value: description && description !== "<p><br></p>",
        setter: setValidDescription,
      },
      selectedCategories: {
        value: !(selectedCategories.length === 0),
        setter: setValidCategory,
      },
      stock: { value: stock, setter: setValidStock },
      unit: { value: unit, setter: setValidUnit },
      price: { value: price, setter: setValidPrice },
      stockAlert: { value: stockAlert, setter: setValidStockAlert },
    };

    setAttemptedSubmit(true);
    let cnt = 0;
    for (const field in fieldsToValidate) {
      const { value, setter } = fieldsToValidate[field];
      setter(!!value);
      if (!value) {
        cnt++;
      }
    }

    if (cnt > 0) {
      return;
    }
    return formSubmit();
  }

  async function formSubmit() {
    const inputData = {
      imgCover: file,
      media: files,
      title,
      description: isEditMode ? htmlToMarkdown(description) : description,
      categories: selectedCategories,
      availableStock: stock,
      unit,
      basePrice: parseFloat(price),
      dimension,
      stockAlert,
      status: visibility,
      expirationDate,
    };

    if (!isEditMode) {
      const newProduct = await newProductToFormData(inputData);
      await createOwnProduct(newProduct).unwrap();
      discardNewForm();
      resetAllState();
      navigate(-1);
    } else {
      const editedProduct = await editProductToFormData(product, inputData);
      if (editedProduct) {
        await editProduct({
          productId: product._id,
          inputData: editedProduct,
        }).unwrap();
        setEdit(false);
      }
    }
  }

  function validateField(value, setValid) {
    const isValid = !!value;
    if (attemptedSubmit) {
      setValid(isValid);
    }
    return isValid;
  }

  function resetAllState() {
    setTitle("");
    setDescription("");
    setPrice("");
    setUnit("");
    setSelectedCategories([]);
    setStock("");
    setStockAlert("");
    setExpirationDate("");
    setFile("");
    setFiles([]);
    setDimension("");
    setAttemptedSubmit(false);
  }

  function discardEditForm() {
    resetAllState();
    setEdit(false);
  }

  function discardNewForm() {
    resetAllState();
    navigate(-1);
  }

  const isLoading = isCreatingProduct || isEditingProduct;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header className="content-header">
            <div>
              {isEditMode ? <h1>Edit Product</h1> : <h1>New Product</h1>}
            </div>
            <div className="action-buttons">
              <DiscardModal
                discardForm={isEditMode ? discardEditForm : discardNewForm}
              />
              <Button
                size="large"
                variant="contained"
                onClick={validateFieldsAndSubmit}
              >
                Save
              </Button>
            </div>
          </header>
          <main>
            <form className="product-form">
              <div className="product-desc">
                <div className="card">
                  <section className="images-section">
                    <h3>Product Image</h3>
                    <div className="images-upload">
                      <div className="thumbnail">
                        <div className="preview">
                          <Thumbnail
                            attemptedSubmit={attemptedSubmit}
                            validThumbnail={validThumbnail}
                            setValidThumbnail={setValidThumbnail}
                            mode={mode}
                            signedImgCover={signedImgCover}
                            setSignedImgCover={setSignedImgCover}
                          />
                        </div>
                        {attemptedSubmit && !validThumbnail && (
                          <span className="helper-text">
                            Thumbnail is required
                          </span>
                        )}
                      </div>
                      <div className="other-images">
                        <ImagesUpload
                          attemptedSubmit={attemptedSubmit}
                          validPhoto={validPhoto}
                          setValidPhoto={setValidPhoto}
                          mode={mode}
                          signedMedia={signedMedia}
                          setSignedMedia={setSignedMedia}
                        />
                        {attemptedSubmit && !validPhoto && (
                          <span className="helper-text">Photo is required</span>
                        )}
                      </div>
                    </div>
                  </section>
                  <br />
                  <section className="description-section">
                    <div className="product-title">
                      <h3>Product Title</h3>
                      <TextField
                        variant="standard"
                        value={title}
                        placeholder="Add the title of your product *"
                        sx={{ width: "50%" }}
                        onChange={(event) => {
                          setTitle(event.target.value);
                          validateField(event.target.value, setValidTitle);
                        }}
                        error={attemptedSubmit && !validTitle}
                        helperText={
                          attemptedSubmit && !validTitle
                            ? "Title is required"
                            : ""
                        }
                      />
                    </div>
                    <div className="product-description">
                      <h3>Description</h3>
                      <Editor
                        attemptedSubmit={attemptedSubmit}
                        validDescription={validDescription}
                        setValidDescription={setValidDescription}
                      />
                      {attemptedSubmit && !validDescription && (
                        <span className="helper-text">
                          Description is required
                        </span>
                      )}
                    </div>
                  </section>
                </div>
              </div>
              <aside className="product-info">
                <div className="info-container card">
                  <section>
                    <h3>Category</h3>
                    <Autocomplete
                      multiple
                      options={categories}
                      getOptionLabel={(category) => category.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          error={attemptedSubmit && !validCategory}
                          placeholder="Select category *"
                          helperText={
                            attemptedSubmit && !validCategory
                              ? "Category is required"
                              : ""
                          }
                        />
                      )}
                      isOptionEqualToValue={(option, value) =>
                        value === undefined ||
                        value === "" ||
                        option.name === value.name
                      }
                      onChange={(event, values) => {
                        setSelectedCategories(
                          values.map((value) => value.name)
                        );
                        if (attemptedSubmit) {
                          setValidCategory(!(values.length === 0));
                        }
                      }}
                      value={categories.filter((category) =>
                        selectedCategories.includes(category.name)
                      )}
                    />
                  </section>
                  <section>
                    <h3>Stock</h3>
                    <TextField
                      fullWidth
                      variant="standard"
                      value={stock}
                      placeholder="Available Stock *"
                      type="number"
                      inputProps={{ min: 1 }}
                      onChange={(event) => {
                        setStock(parseInt(event.target.value));
                        validateField(
                          parseInt(event.target.value),
                          setValidStock
                        );
                      }}
                      error={attemptedSubmit && !validStock}
                      helperText={
                        attemptedSubmit && !validStock
                          ? "Product stock is required"
                          : ""
                      }
                    />
                  </section>
                  <section>
                    <h3>Unit</h3>
                    <TextField
                      fullWidth
                      variant="standard"
                      value={unit}
                      placeholder="Product unit *"
                      onChange={(event) => {
                        setUnit(event.target.value);
                        validateField(event.target.value, setValidUnit);
                      }}
                      error={attemptedSubmit && !validUnit}
                      helperText={
                        attemptedSubmit && !validUnit
                          ? "Unit is required (ex: kg, item...)"
                          : ""
                      }
                    />
                  </section>
                  <section>
                    <h3>Base Price</h3>
                    <TextField
                      fullWidth
                      variant="standard"
                      value={price}
                      type="number"
                      placeholder="Price per unit *"
                      onChange={(event) => {
                        // cannot use parseFloat here
                        setPrice(event.target.value);
                        validateField(
                          parseFloat(event.target.value),
                          setValidPrice
                        );
                      }}
                      error={attemptedSubmit && !validPrice}
                      helperText={
                        attemptedSubmit && !validPrice
                          ? "Price is required (in USD)"
                          : "Price in USD"
                      }
                    />
                  </section>
                  <section>
                    <h3>Expiration Date</h3>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        variant="standard"
                        sx={{ width: "100%" }}
                        value={expirationDate}
                        slotProps={{
                          actionBar: {
                            actions: ["clear", "cancel", "accept"],
                          },
                          textField: {
                            error: false,
                          },
                          field: {
                            clearable: true,
                          },
                        }}
                        onAccept={(date) => setExpirationDate(dayjs(date.$d))}
                      />
                    </LocalizationProvider>
                  </section>
                  <section>
                    <h3>Stock Alert</h3>
                    <TextField
                      fullWidth
                      variant="standard"
                      value={stockAlert}
                      placeholder="Set stock alert *"
                      type="number"
                      onChange={(event) => {
                        setStockAlert(parseInt(event.target.value));
                        validateField(
                          parseInt(event.target.value),
                          setValidStockAlert
                        );
                      }}
                      error={attemptedSubmit && !validStockAlert}
                      helperText={
                        attemptedSubmit && !validStockAlert
                          ? "Stock alert is required"
                          : ""
                      }
                    />
                  </section>
                  <section>
                    <h3>Dimension</h3>
                    <TextField
                      fullWidth
                      variant="standard"
                      placeholder="Product dimension *"
                      onChange={(event) => {
                        setDimension(event.target.value);
                      }}
                    />
                  </section>
                  <section>
                    <h3>Visibility</h3>
                    <Select
                      fullWidth
                      required
                      variant="standard"
                      defaultValue={visibility}
                      value={visibility}
                      onChange={(event) => setVisibility(event.target.value)}
                    >
                      <MenuItem value="Public">Public</MenuItem>
                      <MenuItem value="Private">Private</MenuItem>
                    </Select>
                  </section>
                </div>
              </aside>
            </form>
          </main>
        </>
      )}
    </>
  );
}

export default ProductForm;

// export const categories = [
//   { _id: 1, name: "Creeper" },
//   { _id: 2, name: "Tree" },
//   { _id: 3, name: "Tool" },
//   { _id: 4, name: "Vegetable" },
//   { _id: 5, name: "Indoor" },
//   { _id: 6, name: "Outdoor" },
//   { _id: 7, name: "Climber" },
//   { _id: 8, name: "Herb" },
//   { _id: 9, name: "Shrub" },
// ];
