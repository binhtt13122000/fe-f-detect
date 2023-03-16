import { useNavigate } from "react-router";
import axios from "src/axios";
import { auth } from "src/configurations/firebase";

import useSnackbar from "src/components/Snackbar/useSnackbar";

import {
  AuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";
import LocalStorageUtil from "src/utils/LocalStorageUtil";

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

const useAuth = () => {
  const showSnackBar = useSnackbar();
  const navigate = useNavigate();

  const login = async (provider: AuthProvider) => {
    try {
      let response = await signInWithPopup(auth, provider);
      if (response) {
        let tokenId = await response.user.getIdToken();
        const responseAccount = await axios.post("api/v1/auth/login", {
          accessToken: tokenId,
        });
        console.log("success", responseAccount);
        if (responseAccount.status === 200) {
          showSnackBar({
            severity: "success",
            children: "Đăng nhập thành công",
          });
          await axios.get(`api/v1/auth/authorize?email=${responseAccount.data.email}`);
          LocalStorageUtil.setUser(responseAccount.data.accessToken);
          window.location.reload();
        }
      }
    } catch (exception) {
      if ((exception as any).response.status === 404)
        showSnackBar({
          severity: "error",
          children: "Tài khoản này chưa được đăng kí. Liên hệ admin",
        });
      else {
        showSnackBar({
          severity: "error",
          children: "Có lỗi xảy ra",
        });
      }
    }
  };

  return { login };
};

export default useAuth;
