import styled from "styled-components";
import tw from "twin.macro";
import Products from "./components/products";

const AppContainer = tw.div`
  w-full
  max-w-full
  flex
  flex-col
  items-center
  justify-center
  pt-6
  pb-10
  pl-10
  pr-10
`;

function App() {
  return (
    <AppContainer>
      <Products />
    </AppContainer>
  );
}

export default App;
