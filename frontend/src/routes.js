import { useContext } from "react";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import { USER_TYPE } from "./constants/userTypes";
import AuthContext from "./contexts/AuthContext";

/*CUSTOMER*/
import CustomerAccount from "./pages/customer/CustomerAccount";

import CustomerSignUp from "./pages/customer/CustomerSignUp";

import CustomerDashboard from "./pages/customer/CustomerDashboard";

import CustomerCreateNewRequest from "./pages/customer/CustomerCreateNewRequest";

import CustomerServiceBoardRequest from "./pages/customer/CustomerServiceBoardRequest";
import CustomerServiceBoardRequestOfferDetail from "./pages/customer/CustomerServiceBoardRequestOfferDetail";

import CustomerServiceBoardActiveService from "./pages/customer/CustomerServiceBoardActiveService";
import CustomerRatingAndReview from "./pages/customer/CustomerRatingAndReview";

import CustomerServiceBoardPastService from "./pages/customer/CustomerServiceBoardPastService";

import CustomerMembership from "./pages/customer/CustomerMembership";

import CustomerPaymentTransaction from "./pages/customer/CustomerPaymentTransaction";

/*PROFESSIONAL*/
import ProfessionalAccount from "./pages/professional/ProfessionalAccount";

import ProfessionalSignUp from "./pages/professional/ProfessionalSignUp";

import ProfessionalDashboard from "./pages/professional/ProfessionalDashboard";

import ProfessionalServiceBoardRequest from "./pages/professional/ProfessionalServiceBoardRequest";
import ProfessionalServiceBoardRequestDetail from "./pages/professional/ProfessionalServiceBoardRequestDetail";
import ProfessionalServiceBoardOffer from "./pages/professional/ProfessionalServiceBoardOffer";
import ProfessionalServiceBoardActiveService from "./pages/professional/ProfessionalServiceBoardActiveService";
import ProfessionalServiceBoardPastService from "./pages/professional/ProfessionalServiceBoardPastService";

import ProfessionalMembership from "./pages/professional/ProfessionalMembership";

import ProfessionalPaymentTransaction from "./pages/professional/ProfessionalPaymentTransaction";

/*HACKQUACK*/
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import PaymentMethod from "./pages/PaymentMethod";

import Receipt from "./pages/Receipt";

const AuthorizedRoute = ({ userTypes }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  let authorized = false;
  for (let i = 0; i < userTypes.length; i++) {
    if (userTypes[i] === user.userType) {
      authorized = true;
      break;
    }
  }

  if (!authorized) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

const GuestRoute = () => {
  const { user } = useContext(AuthContext);

  // If user is logged in, redirect them to their respective home pages
  if (user) {
    let location;

    switch (user.userType) {
      case USER_TYPE.PROFESSIONAL:
        location = "/professional-dashboard";
        break;
      default:
        location = "/customer-dashboard";
    }

    return <Navigate to={location} replace />;
  }

  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        element: <GuestRoute />,
        children: [
          {
            index: true,
            element: <Welcome />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "customer-sign-up",
            element: <CustomerSignUp />,
          },
          {
            path: "professional-sign-up",
            element: <ProfessionalSignUp />,
          },
        ],
      },
      {
        children: [
          {
            path: "receipt",
            element: <Receipt />,
          },
          {
            path: "payment-method",
            element: <PaymentMethod />,
          },
        ],
      },

      {
        element: <AuthorizedRoute userTypes={[USER_TYPE.PROFESSIONAL]} />,

        children: [
          // Dashboard
          {
            path: "professional-dashboard",
            element: <ProfessionalDashboard />,
          },
          // Account
          {
            path: "professional-account",
            element: <ProfessionalAccount />,
          },
          {
            path: "professional-membership",
            element: <ProfessionalMembership />,
          },
          // Service Board
          {
            path: "professional-service-board-request",
            element: <ProfessionalServiceBoardRequest />,
          },
          {
            path: "professional-service-board-request-detail",
            element: <ProfessionalServiceBoardRequestDetail />,
          },
          {
            path: "professional-service-board-offer",
            element: <ProfessionalServiceBoardOffer />,
          },
          {
            path: "professional-service-board-active-service",
            element: <ProfessionalServiceBoardActiveService />,
          },
          {
            path: "professional-service-board-past-service",
            element: <ProfessionalServiceBoardPastService />,
          },
          {
            path: "professional-payment-transaction",
            element: <ProfessionalPaymentTransaction />,
          },
        ],
      },

      {
        element: <AuthorizedRoute userTypes={[USER_TYPE.CUSTOMER]} />,
        children: [
          // Dashboard
          {
            path: "customer-dashboard",
            element: <CustomerDashboard />,
          },
          // Account
          {
            path: "customer-account",
            element: <CustomerAccount />,
          },
          {
            path: "customer-membership",
            element: <CustomerMembership />,
          },
          // Create New Request
          {
            path: "customer-create-new-request",
            element: <CustomerCreateNewRequest />,
          },
          // Service Board
          {
            path: "customer-service-board-request",
            element: <CustomerServiceBoardRequest />,
          },
          {
            path: "customer-service-board-active-service",
            element: <CustomerServiceBoardActiveService />,
          },
          {
            path: "customer-service-board-past-service",
            element: <CustomerServiceBoardPastService />,
          },
          {
            path: "customer-service-board-request-offer-detail",
            element: <CustomerServiceBoardRequestOfferDetail />,
          },
          {
            path: "customer-rating-and-review",
            element: <CustomerRatingAndReview />,
          },
          {
            path: "customer-payment-transaction",
            element: <CustomerPaymentTransaction />,
          },
        ],
      },
    ],
  },
]);

export default router;
