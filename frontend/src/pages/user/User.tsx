import { useParams } from "react-router-dom";
import Single from "../../components/single/Single"
import "./user.scss"
import { useUserId } from "../../api/useUsersAnalytics";

const User = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useUserId(id!);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>User not found</p>;

  return (
    <div className="user">
      <Single {...data} />
    </div>
  )
}

export default User