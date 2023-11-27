import { Container } from "postcss";
import { Login as LoginComponent } from "../components";
const login = () => {
  return (
    <div className="py-8 mx-4">
      <Container>
        <LoginComponent />
      </Container>
    </div>
  );
};

export default login;
