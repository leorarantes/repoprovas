import { Box } from "@mui/material";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import { ReactComponent as SignOutIcon } from "../../assets/images/signout.svg";
import useAuth from "../../hooks/useAuth";

interface Props {
  redirectPath?: string;
}

export function MainApp({ redirectPath = "/" }: Props) {
  const navigate = useNavigate();
  const { token, signOut } = useAuth();
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  function handleSignOut() {
    navigate("/");
    signOut();
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px 50px 35px 50px",
        }}
      >
        <Logo />
        <SignOutIcon style={{ cursor: "pointer" }} onClick={handleSignOut} />
      </Box>
      <Outlet />
    </Box>
  );
}
