import { useNavigate } from "react-router-dom";

const Navigator = (path) => {
  const navigate = useNavigate();

  navigate(path);
};
export default Navigator;
