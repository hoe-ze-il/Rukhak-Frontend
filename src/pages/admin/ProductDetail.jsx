import { useState } from "react";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import DeleteModal from "@/components/admin/product/DeleteModal";
import Button from "@mui/material/Button";
import EditProduct from "./EditProduct";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Loading from "@/components/admin/product/Loading";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useGetInventoryByIdQuery } from "@/features/admin/inventorySlice";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";

function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [edit, setEdit] = useState(false);

  const { data: product, isFetching } = useGetInventoryByIdQuery(id);

  return (
    <>
      {isFetching ? (
        <Loading />
      ) : (
        <>
          {edit ? (
            <EditProduct productData={product} setEdit={setEdit} />
          ) : (
            <div className="product-detail overflow-a">
              <div className="px-10-pc back-button">
                <Button onClick={() => navigate(-1)}>
                  <KeyboardBackspaceIcon sx={{ marginRight: ".5rem" }} />
                  <p>Go back</p>
                </Button>
              </div>

              <header className="content-header">
                <div>
                  <h1>Product Detail</h1>
                </div>
                <div className="action-buttons">
                  <DeleteModal title="product" />
                  <Button
                    onClick={() => setEdit((prev) => !prev)}
                    variant="contained"
                  >
                    Edit
                  </Button>
                </div>
              </header>
              {product && (
                <main>
                  <form className="product-form">
                    <div className="product-desc">
                      <div className="card">
                        <section className="images-section">
                          <h3>Product Image</h3>
                          <div className="images-upload">
                            <div className="thumbnail">
                              <div className="preview">
                                <img
                                  src={product.signedImgCover}
                                  className="image"
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="other-images">
                              {product.signedMedia?.map((item) => (
                                <div className="preview" key={item}>
                                  <div className="preview-inner">
                                    <img src={item} className="image" alt="" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </section>
                        <br />
                        <section className="description-section">
                          <div className="product-title">
                            <h3>Product Title</h3>
                            <h2>{product.title}</h2>
                          </div>
                          <div className="product-description">
                            <h3>Description</h3>
                            <Markdown>{product.description}</Markdown>
                          </div>
                        </section>
                        <section className="seller-extra-info">
                          <h3>Seller Information</h3>
                          <p>
                            <PersonOutlineOutlinedIcon />
                            {product.sellerId?.firstName}{" "}
                            {product.sellerId?.lastName}
                          </p>
                          <p>
                            <StorefrontOutlinedIcon />
                            {product.sellerId?.storeName}
                          </p>
                          <p>
                            <EmailOutlinedIcon />
                            {product.sellerId?.email}
                          </p>
                          <p>
                            <LocalPhoneOutlinedIcon />
                            {product.sellerId?.phoneNumber}
                          </p>
                        </section>
                      </div>
                    </div>
                    <aside className="product-info">
                      <div className="info-container card">
                        <section>
                          <h3>Category</h3>
                          {product.categories?.map((item, index) => (
                            <span key={item}>
                              {item}
                              {index < product.categories.length - 1 && ", "}
                            </span>
                          ))}
                          <p>{product.category}</p>
                        </section>
                        <section>
                          <h3>Stock</h3>
                          <p>{product.availableStock}</p>
                        </section>
                        <section>
                          <h3>Unit</h3>
                          <p>{product.unit}</p>
                        </section>
                        <section>
                          <h3>Price</h3>
                          <p>&#36; {product.basePrice}</p>
                        </section>
                        {product.expirationDate && (
                          <section>
                            <h3>Expiration Date</h3>
                            <p>
                              {dayjs(product.expirationDate).format(
                                "DD/MM/YYYY"
                              )}
                            </p>
                          </section>
                        )}

                        <section>
                          <h3>Stock Alert</h3>
                          <p>{product.stockAlert}</p>
                        </section>
                        <section>
                          <h3>Dimension</h3>
                          {product.dimension}
                        </section>
                        <section>
                          <h3>Visibility</h3>
                          {product.status}
                        </section>
                      </div>
                    </aside>
                  </form>
                </main>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ProductDetail;
