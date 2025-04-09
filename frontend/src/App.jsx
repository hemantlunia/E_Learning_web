import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router";
import "./App.css";
import HeroSection from "./pages/student/HeroSection";
import MainLayout from "./layout/MainLayout";
import NotFound from "./components/NotFound";
import Login from "./pages/Login";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HeroSection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-learning" element={<MyLearning />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
