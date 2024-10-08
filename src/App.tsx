import { RouterProvider } from "react-router-dom";
import Fallback from "./pages/Fallback";
import router from "./routes/Index";
import { Suspense } from "react";

const App = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
