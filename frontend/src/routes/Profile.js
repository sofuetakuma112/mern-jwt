import { useAuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuthContext();
  return (
    <>
      <h2>Profile</h2>
      <ul>
        <li>Name: {user.name}</li>
        <li>Email: {user.email}</li>
      </ul>
    </>
  );
};

export default Profile;
