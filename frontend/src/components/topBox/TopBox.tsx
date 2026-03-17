import "./topBox.scss"
import { useTopDealUsers } from "../../api/topDeals.ts";

const TopBox = () => {
  const { data: users, isLoading, isError } = useTopDealUsers();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;

  return (
    <div className="topBox">
      <h1>Top Deals</h1>
      <div className="list">
        {users?.map(user => (
          <div className="listItem" key={user._id}>
            <div className="user">
              <img src={user.img} alt="" />
              <div className="userTexts">
                <span className="username">{user.username}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>
            <span className="amount">${user.amount}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopBox