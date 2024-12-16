import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetAllBundlesQuery } from "../../../features/api/bundleApi";
import { useGetSubscriptionsByUserIdQuery } from "../../../features/api/subscriptionApi";
import "./PackagePlain.css";

const PackagePlan = () => {
  const navigate = useNavigate();
  const { data: bundlesData, error, isLoading } = useGetAllBundlesQuery();
  const user = useSelector((state) => state.user.user);
  const userId = user?.id;
  const { data: subscriptionsData } = useGetSubscriptionsByUserIdQuery(userId);
  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);
  const handlePurchase = async (item) => {
    navigate("/existing-card", {
      state: { coins: item.coins, price: item.price, packageId: item.id },
    });
  };

  if (isLoading) {
    return <div className="loading-spinner">Loading packages...</div>;
  }

  if (error) {
    return <div className="error-message">Error loading packages: {error.message}</div>;
  }

  const subscribedPackageIds = subscriptionsData?.map(
    (subscription) => subscription.packageBundle.id
  );

  return (
    <div className="package-plan-container" style={{marginLeft: `${!sidebarOpen?"5.5rem":"0rem"}`}}>
      <div className="package-header">
        <h2>Available Plans</h2>
        <p className="subtitle">Choose the perfect plan for your needs</p>
      </div>

      <div className="packages-grid">
        {bundlesData?.map((item) => {
          const isSubscribed = subscribedPackageIds?.includes(item.id);
          const period = item.durationInDays >= 30 ? "/Month" : `/ ${item.durationInDays} Days`;

          return (
            <div className="package-card" key={item.id}>
              <div className="package-card-header">
                <h3 className="package-name">{item.name}</h3>
                <div className="package-price">
                  <span className="currency">$</span>
                  <span className="amount">{parseFloat(item.price).toFixed(2)}</span>
                  <span className="period">{period}</span>
                </div>
              </div>

              <div className="package-highlights">
                <div className="highlight-item">
                  <i className="fas fa-coins"></i>
                  <span>{item.coins.toLocaleString()} Coins</span>
                </div>
                <div className="highlight-item">
                  <i className="fas fa-calendar-alt"></i>
                  <span>{item.durationInDays} Days Access</span>
                </div>
              </div>

              <div className="package-features">
                {item.featureNames?.map((feature, index) => {
                  const parsedFeature = JSON.parse(feature);
                  return (
                    <div className="feature-item" key={index}>
                      <i className="fas fa-check"></i>
                      <span>{parsedFeature.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="package-description">
                <p className="fs-6 text-success" style={{whiteSpace:"break-spaces"}}>{item.description}</p>
              </div>

              <button
                onClick={() => handlePurchase(item)}
                className={`package-button ${isSubscribed ? 'subscribed' : ''}`}
                disabled={isSubscribed}
              >
                <i className={isSubscribed ? 'fas fa-check-circle' : 'fas fa-shopping-cart'}></i>
                {isSubscribed ? 'Current Plan' : 'Select Plan'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PackagePlan;
