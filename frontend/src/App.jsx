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
// import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AdminLayout from "./pages/admin/AdminLayout";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";
import CourseDetail from "./pages/student/CourseDetail";
import CourseProgress from "./pages/student/CourseProgress";
import SearchPage from "./pages/student/SearchPage";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HeroSection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-learning" element={<MyLearning />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/course-detail/:courseId" element={<CourseDetail />} />
          <Route path="/course-progress/:courseId" element={<CourseProgress />} />
          <Route path="/course/search" element={<SearchPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout/>}>
         <Route index element={<Dashboard/>}/>
         <Route path="course" element={<CourseTable/>} />
         <Route path="course/create" element={<AddCourse/>} />
         <Route path="course/:courseId" element={<EditCourse/>} />
         <Route path="course/:courseId/lecture" element={<CreateLecture/>} />
         <Route path="course/:courseId/lecture/:lectureId" element={<EditLecture/>} />
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
