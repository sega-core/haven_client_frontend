import { useState } from "react";
import { ProgressLine } from "./components/ProgressLine/ProgressLine";
import { Layout } from "./components/Layout";
import { TabBar } from "./components/TabBar";
import { Header } from "./components/Header";
import { Block } from "./components/Block";
import { Blagodarnost, VoprosDnya } from "./components/NavigationBlock";
import { Nastroenie } from "./components/NavigationBlock/Nastroenie";

function App() {
  const [goal, setGoal] = useState<"0" | "1" | "2" | "3" | "4">("0");
  return (
    <Layout>
      {/* <div>
        <ProgressLine goal={goal} />
        <fieldset>
          <legend>Select a maintenance drone:</legend>

          <div>
            <input
              type="radio"
              id="huey"
              name="drone"
              value="huey"
              onClick={() => setGoal("0")}
            />
            <label htmlFor="huey">goal0</label>
          </div>

          <div>
            <input
              type="radio"
              id="dewey"
              name="drone"
              value="dewey"
              onClick={() => setGoal("1")}
            />
            <label htmlFor="dewey">goal1</label>
          </div>

          <div>
            <input
              type="radio"
              id="louie"
              name="drone"
              value="louie"
              onClick={() => setGoal("2")}
            />
            <label htmlFor="louie">goal2</label>
          </div>
          <div>
            <input
              type="radio"
              id="louie"
              name="drone"
              value="louie"
              onClick={() => setGoal("3")}
            />
            <label htmlFor="louie">goal3</label>
          </div>
          <div>
            <input
              type="radio"
              id="louie"
              name="drone"
              value="louie"
              onClick={() => setGoal("4")}
            />
            <label htmlFor="louie">goal4</label>
          </div>
        </fieldset>
      </div> */}
      <Header />
      <Nastroenie />
      <Blagodarnost />
      <VoprosDnya />
      <TabBar />
    </Layout>
  );
}

export default App;
