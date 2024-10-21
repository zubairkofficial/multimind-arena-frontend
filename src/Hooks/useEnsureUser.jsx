import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetUserByIdQuery } from "../features/api/apiSlice";
import { setUser } from "../features/userSlice";

const useEnsureUser = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  // Get userId from Redux or localStorage if available
  const userId = user?.id || JSON.parse(localStorage.getItem("user"))?.id;

  // Fetch user data by ID
  const { data, isLoading, error } = useGetUserByIdQuery(userId, {
    skip: !!user || !userId, // Skip fetching if the user is already present or if userId is not available
  });

  useEffect(() => {
    if (data && !user) {
      // Set the user in the Redux store
      dispatch(setUser(data));

      // Store the user in localStorage
      localStorage.setItem("user", JSON.stringify(data));
    }
  }, [data, dispatch, user]);

  return { user, isLoading, error };
};

export default useEnsureUser;
