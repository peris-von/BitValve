import { Loader } from "lucide-react";
import Landing from "./Landing";
import ProcessingFee from "./Processingfee";
import GrantPurpose from "./Purpose";
import { PageLoader, PurposePageSkeleton } from "./Loader";
import App from "./App";

const Routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Something went wrong.</h1>,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/processing",
        element: <ProcessingFee />,
      },
      {
        path: "/reason",
        element: <GrantPurpose />,
      },
    ],
  },
];

export default Routes;
