/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const Login = () => {
  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerLoading,
      isSuccess: registerSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginLoading,
      isSuccess: loginSuccess,
    
    },
  ] = useLoginUserMutation();
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    }
    if (type === "login") {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const HandleRegister = async (type) => {
    let inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (registerSuccess && registerData) {
      toast.success(registerData?.data?.message || "Signup Successfully.")
    }
    if (loginSuccess && loginData) {
      toast.success(loginData?.data?.message || "Login Successfully.")
      navigate("/")
    }
    if (registerError) {
      toast.error(registerError?.data?.message || "Signup Failed.")
    }
    if (loginError) {
      toast.error(loginError?.data?.message || "Login Failed.")
    }
  }, [
    loginData,
    loginLoading,
    registerData,
    registerError,
    registerLoading,
    loginError,
    registerSuccess,
    loginSuccess
  ]);
 
  return (
    <div className="flex mt-20 items-center justify-center w-full">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>Create A New Account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  onChange={(e) => changeInputHandler(e, "signup")}
                  name="name"
                  value={signupInput.name}
                  type="text"
                  placeholder="name"
                  required={true}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Email</Label>
                <Input
                  onChange={(e) => changeInputHandler(e, "signup")}
                  name="email"
                  value={signupInput.email}
                  type="email"
                  placeholder="email"
                  required={true}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Password</Label>
                <Input
                  onChange={(e) => changeInputHandler(e, "signup")}
                  name="password"
                  value={signupInput.password}
                  type="password"
                  placeholder="password"
                  required={true}
                />
              </div>
            </CardContent>
            <CardFooter>
              {/* <Button
                disabled={registerLoading}
                onClick={() => HandleRegister("signup")}
              >
                Signup
              </Button> */}
              {registerLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait!
                </>
              ) : (
                <Button
                  disabled={registerLoading}
                  onClick={() => HandleRegister("signup")}
                >
                  Signup
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login To Your Account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  value={loginInput.email}
                  type="email"
                  placeholder="email"
                  onChange={(e) => changeInputHandler(e, "login")}
                  required={true}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => changeInputHandler(e, "login")}
                  type="password"
                  placeholder="password"
                  required={true}
                />
              </div>
            </CardContent>
            <CardFooter>
              {/* <Button
                disabled={loginLoading}
                onClick={() => HandleRegister("login")}
              >
                Login
              </Button> */}
              {loginLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait!
                </>
              ) : (
                <Button
                  disabled={loginLoading}
                  onClick={() => HandleRegister("login")}
                >
                  Login
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
