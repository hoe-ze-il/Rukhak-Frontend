import ProductForm from "@/components/seller/ProductForm";

function EditProduct({ productData, setEdit }) {
  return (
    <div className="edit-product overflow-a">
      <ProductForm mode={"edit"} product={productData} setEdit={setEdit} />
    </div>
  );
}

export default EditProduct;
