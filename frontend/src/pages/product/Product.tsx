import { useParams } from "react-router-dom";
import Single from "../../components/single/Single"
import "./product.scss"
import { useProduct } from "../../api/useProduct";

const Product = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useProduct(id!);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Product not found</p>;

  return (
    <div className="product">
      <Single {...data} />
    </div>
  )
}

export default Product