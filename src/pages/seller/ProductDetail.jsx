import { useState } from "react";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import DeleteModal from "@/components/seller/DeleteModal";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Loading from "@/components/admin/product/Loading";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useGetOwnProductDetailQuery } from "@/features/seller/sellerProductSlice";
import EditProduct from "./EditProduct";

function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [edit, setEdit] = useState(false);

  const {
    data: product,
    isLoading,
    isFetching,
  } = useGetOwnProductDetailQuery(id);

  let content;
  if (edit) {
    content = <EditProduct productData={product} setEdit={setEdit} />;
  } else {
    content = (
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
            <DeleteModal
              title="Delete this product?"
              text={"Are you sure you want to DELETE this product?"}
              productId={id}
            />
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
                    <h3>Base Price</h3>
                    <p>&#36; {product.basePrice}</p>
                  </section>
                  <section>
                    <h3>Unit Price</h3>
                    <p>&#36; {product.unitPrice}</p>
                  </section>
                  <section>
                    <h3>Unit</h3>
                    <p>{product.unit}</p>
                  </section>

                  {product.expirationDate && (
                    <section>
                      <h3>Expiration Date</h3>
                      <p>
                        {dayjs(product.expirationDate).format("DD/MM/YYYY")}
                      </p>
                    </section>
                  )}

                  <section>
                    <h3>Stock Alert</h3>
                    <p>{product.stockAlert}</p>
                  </section>

                  <section>
                    <h3>Dimension</h3>
                    {product.dimension || "N/A"}
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
    );
  }

  return <>{isLoading || isFetching ? <Loading /> : content}</>;
}

export default ProductDetail;
