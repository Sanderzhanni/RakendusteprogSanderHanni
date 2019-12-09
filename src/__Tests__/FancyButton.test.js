import React from "react";
import renderer from "react-test-renderer";
import FancyButton from "../components/FancyButton.jsx";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

describe("FancyButton component", () =>{
    test("snapshot", () =>{
        const component = renderer.create(
            <FancyButton onClick={() => 0}>
                Hello
            </FancyButton>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

it("callback functionality test", () =>{
    let x = 0;
    const component = shallow(
        <button onClick={() => x++}>add</button>
    );
    component.find("button").simulate("click");
    expect(x).toBe(1);
});