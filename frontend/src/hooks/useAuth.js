import { useState, useCallback } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const signup = async (data) => {
    try {
      await axios.post("/auth/signup", data);
      await getUser();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (data) => {
    try {
      await axios.post("/auth/login", data);
      await getUser();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const logout = useCallback(() => {
    setUser(null);
    axios.delete("/auth/revoke_token");
    navigate("/login");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 依存配列にnavigateを設定するとページを移動する度にgetUser関数が実行されるようになるためここではeslint-disable-next-lineでWARNINGを抑えています。

  // useCallback Hookを設定しない場合には
  // useEffectの依存配列に設定したgetUser関数が、
  // 再描写毎に異なるオブジェクトとみなされ無限ループが発生する
  const getUser = useCallback(async () => {
    try {
      const response = await axios.get("/auth/user");
      const user = response.data.user;
      setUser(user);
    } catch (error) {
      console.log(error);
      logout(); //追加
    }
  }, [logout]);

  return { user, signup, login, getUser, logout };
};

export default useAuth;
