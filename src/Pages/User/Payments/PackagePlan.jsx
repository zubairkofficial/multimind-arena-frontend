import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetAllBundlesQuery } from "../../../features/api/bundleApi"; // Import the query hook
import { useGetSubscriptionsByUserIdQuery } from "../../../features/api/subscriptionApi"; // Import the query hook
import _ from "lodash";
import "./PackagePlain.css";
const PackagePlan = () => {
  const navigate = useNavigate();
  const { data: bundlesData, error, isLoading } = useGetAllBundlesQuery(); // Use the API to fetch bundles
  const user = useSelector((state) => state.user.user);
  const userId = user?.id;
  const {
    data: subscriptionsData,
    error: subscriptionsError,
    isLoading: subscriptionsLoading,
  } = useGetSubscriptionsByUserIdQuery(userId);

  console.log("subscriptionsData", subscriptionsData);
  const handlePurchase = async (item) => {
    navigate("/existing-card", {
      state: { coins: item.coins, price: item.price, packageId: item.id },
    });
  };

  if (isLoading) {
    return <div>Loading bundles...</div>; // Show loading state
  }

  if (error) {
    return <div>Error loading bundles: {error.message}</div>; // Handle error state
  }

  const subscribedPackageIds = subscriptionsData?.map(
    (subscription) => subscription.packageBundle.id
  );

  return (
    <>
      <section className="pricing-section rounded-circle">
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-6 col-md-8">
              <div className="fs-5 font-bold">
                <h2 className="fs-3">Available Plans</h2>
              </div>
            </div>
          </div>

          <div className="row">
            {bundlesData?.map((item) => {
              const isSubscribed = subscribedPackageIds?.includes(item.id);

              return (
                <div className="col-md-4 mt-4" key={item.id}>
                  <div className="price-card">
                    <h2>{item.name}</h2>
                    <p className="price">
                      <span className="fs-1">
                        ${parseFloat(item.price).toFixed(2)}
                      </span>
                      / Month
                    </p>
                    <p className="coins">
                      <strong>{item.coins}</strong> Coins Included
                    </p>
                    <p className="duration">
                      <strong>{item.durationInDays}</strong> Days Access
                    </p>
                    <ul className="pricing-offers">
                      {item.featureNames?.map((feature, index) => {
                        // Parse the JSON string
                        const parsedFeature = JSON.parse(feature);

                        return (
                          <li key={index} className="fs-6 font-bold">
                            <span className="fs-4">✔{" "}{" "}
                            {parsedFeature.label}{" "}</span>
                          </li>
                        );
                      })}
                    </ul>

                    <button
                      onClick={() => handlePurchase(item)}
                      className={`package-btn p-3 fs-3 font-bold ${
                        isSubscribed ? "disabled" : ""
                      }`}
                      disabled={isSubscribed} // Disable if already subscribed
                    >
                      {isSubscribed ? "Subscribed" : "Buy Now"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

const styles = {
  shopContainer: {
    color: "#00FF00",
    padding: "20px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  itemList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    width: "100%",
    maxWidth: "800px",
  },
  itemCard: {
    backgroundColor: "#0a3d0c",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 255, 0, 0.2)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between", // Ensure spacing between content and button
    width: "100%",
    maxWidth: "250px",
    height: "350px", // Fixed height for all cards to ensure uniformity
  },

  itemLabel: {
    fontSize: "1.2rem",
    marginTop: "10px",
  },
  itemCost: {
    fontSize: "1rem",
    marginTop: "5px",
    marginBottom: "15px",
  },
  purchaseButton: {
    backgroundColor: "#00FF00",
    color: "#000",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background 0.3s ease",
    alignSelf: "center", // Center align the button
  },
  featureList: {
    padding: "10px 0",
    textAlign: "left",
    width: "100%",
    marginBottom: "15px",
  },
  featureListOrdered: {
    paddingLeft: "20px",
  },
  featureItem: {
    color: "#bbb",
    fontSize: "0.9rem",
    marginBottom: "8px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  iconContainer: {
    marginBottom: "10px",
  },
};

export default PackagePlan;
