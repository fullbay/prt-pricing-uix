import "./App.css";
import LeftNavigationLocal from "./components/LocalInstance/LeftNavigationLocal";
import PartsPricingScales from "./entryPoints/PartsPricingScales.tsx";

const App = () => {
  return (
    <div id="main-div" className="flex w-full h-full">
      <LeftNavigationLocal />
      <div id="right-div" style={{ width: "calc(100% - 55px)" }}>
        <div id="contents-div" className="w-full h-full overflow-auto p-3">
          <PartsPricingScales />
        </div>
      </div>
    </div>
  );
};

export default App;
