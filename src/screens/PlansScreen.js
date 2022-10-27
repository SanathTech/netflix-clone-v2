import React, { useEffect, useState } from "react";
import db from "../firebase";
import {
  collection,
  query,
  where,
  doc,
  addDoc,
  setDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import "./PlansScreen.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";

const PlansScreen = ({ sendDataToParent }) => {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    getDocs(query(collection(db, "customers", user.uid, "subscriptions"))).then(
      (querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start:
              subscription.data().current_period_start.seconds,
          });
        });
      }
    );
  }, [user.uid]);

  useEffect(() => {
    getDocs(
      query(collection(db, "products"), where("active", "==", true))
    ).then((querySnapshot) => {
      const products = {};
      querySnapshot.forEach(async (productDoc) => {
        products[productDoc.id] = productDoc.data();
        const priceSnap = await getDocs(collection(productDoc.ref, "prices"));
        priceSnap.docs.forEach((price) => {
          products[productDoc.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
      });
      setProducts(products);
    });
  }, []);

  console.log(products);
  console.log(subscription);
  if (subscription) {
    sendDataToParent(subscription.role);
  }

  const loadCheckout = async (priceId) => {
    const docRef = await addDoc(
      collection(db, "customers", user.uid, "checkout_sessions"),
      {
        price: priceId,
        success_url: `${window.location.origin}/netflix-clone-v2`,
        cancel_url: `${window.location.origin}/netflix-clone-v2`,
      }
    );

    onSnapshot(docRef, async (snap) => {
      console.log(snap);
      const { error, sessionId } = snap.data();
      if (error) {
        alert(`An error occured: ${error.message}`);
      }
      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51LrN7HCRddRI07b1D2KOviPk7lPoeSqzoPE7aub5cxXWrYGEIxTIV5O4ITSPQ9AlzUdUtSzKeTNUS9H0bbq0DjQg001G4XWIhF"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="plansScreen">
      <br />
      {subscription && (
        <p>
          Renewal date:
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        // add some logic to check if the user's subscription is active...
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);
        return (
          <div
            key={productId}
            className={`${
              isCurrentPackage && "plansScreen_plan--disabled"
            } plansScreen_plan`}
          >
            <div className="plansScreen_info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PlansScreen;
