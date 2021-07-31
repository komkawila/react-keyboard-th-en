import React, { Component } from "react";
import { render } from "react-dom";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./index.css";

class App extends Component {
  state = {
    layoutName: "default",
    input: ""
  };

  commonKeyboardOptions = {
    onChange: input => this.onChange(input),
    onKeyPress: button => this.onKeyPress(button),
    theme: "simple-keyboard hg-theme-default hg-layout-default",
    physicalKeyboardHighlight: true,
    syncInstanceInputs: true,
    mergeDisplay: true,
    debug: true
  };

  keyboardOptions = {
    ...this.commonKeyboardOptions,
    layout: {
      default: [
        "\u005F \u0E45 \u002F \u002D \u0E20 \u0E16 \u0E38 \u0E36 \u0E04 \u0E05 \u0E08 \u0E02 \u0E0A {bksp}",
            "{tab} \u0E46 \u0E44 \u0E33 \u0E1E \u0E30 \u0E31 \u0E35 \u0E23 \u0E19 \u0E22 \u0E1A \u0E25 \u0E03",
            "{lock} \u0E1F \u0E2B \u0E01 \u0E14 \u0E40 \u0E49 \u0E48 \u0E32 \u0E2A \u0E27 \u0E07 {enter}",
            "{shift} \u0E1C \u0E1B \u0E41 \u0E2D \u0E34 \u0E37 \u0E17 \u0E21 \u0E43 \u0E1D {shift}",
            ".com @ {space}",
      ],
      shift: [
        "% + \u0E51 \u0E52 \u0E53 \u0E54 \u0E39 \u0E3F \u0E55 \u0E56 \u0E57 \u0E58 \u0E59 {bksp}",
            "{tab} \u0E50 \u0022 \u0E0E \u0E11 \u0E18 \u0E4D \u0E4A \u0E13 \u0E2F \u0E0D \u0E10 \u002C \u0E05",
            "{lock} \u0E24 \u0E06 \u0E0F \u0E42 \u0E0C \u0E47 \u0E4B \u0E29 \u0E28 \u0E0B \u002E {enter}",
            "{shift} ( ) \u0E09 \u0E2E \u0E3A \u0E4C \u003F \u0E12 \u0E2C \u0E26 {shift}",
            ".com @ {space}",
      ]
    },
    display: {
      "{escape}": "esc ⎋",
      "{tab}": "tab ⇥",
      "{backspace}": "backspace ⌫",
      "{enter}": "enter ↵",
      "{capslock}": "caps lock ⇪",
      "{shiftleft}": "shift ⇧",
      "{shiftright}": "shift ⇧",
      "{controlleft}": "ctrl ⌃",
      "{controlright}": "ctrl ⌃",
      "{altleft}": "alt ⌥",
      "{altright}": "alt ⌥",
      "{metaleft}": "cmd ⌘",
      "{metaright}": "cmd ⌘"
    }
  };

  keyboardControlPadOptions = {
    ...this.commonKeyboardOptions,
    layout: {
      default: [
        "{prtscr} {scrolllock} {pause}",
        "{insert} {home} {pageup}",
        "{delete} {end} {pagedown}"
      ]
    }
  };

  keyboardArrowsOptions = {
    ...this.commonKeyboardOptions,
    layout: {
      default: ["{arrowup}", "{arrowleft} {arrowdown} {arrowright}"]
    }
  };

  keyboardNumPadOptions = {
    ...this.commonKeyboardOptions,
    layout: {
      default: [
        "{numlock} {numpaddivide} {numpadmultiply}",
        "{numpad7} {numpad8} {numpad9}",
        "{numpad4} {numpad5} {numpad6}",
        "{numpad1} {numpad2} {numpad3}",
        "{numpad0} {numpaddecimal}"
      ]
    }
  };

  keyboardNumPadEndOptions = {
    ...this.commonKeyboardOptions,
    layout: {
      default: ["{numpadsubtract}", "{numpadadd}", "{numpadenter}"]
    }
  };

  onChange = input => {
    this.setState({
      input: input
    });
    console.log("Input changed", input);
  };

  onKeyPress = button => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (
      button === "{shift}" ||
      button === "{shiftleft}" ||
      button === "{shiftright}" ||
      button === "{capslock}"
    ) {
      this.handleShift();
    }
  };

  handleShift = () => {
    let layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default"
    });
  };

  onChangeInput = event => {
    let input = event.target.value;
    this.setState(
      {
        input: input
      },
      () => {
        this.keyboard.setInput(input);
      }
    );
  };

  render() {
    return (
      <div>
        <input
          value={this.state.input}
          placeholder={"Tap on the virtual keyboard to start"}
          onChange={e => this.onChangeInput(e)}
        />
        <div className={"keyboardContainer"}>
          <Keyboard
            baseClass={"simple-keyboard-main"}
            keyboardRef={r => (this.keyboard = r)}
            layoutName={this.state.layoutName}
            {...this.keyboardOptions}
          />

          <div className="controlArrows">
            <Keyboard
              baseClass={"simple-keyboard-control"}
              {...this.keyboardControlPadOptions}
            />
            <Keyboard
              baseClass={"simple-keyboard-arrows"}
              {...this.keyboardArrowsOptions}
            />
          </div>

          <div className="numPad">
            <Keyboard
              baseClass={"simple-keyboard-numpad"}
              {...this.keyboardNumPadOptions}
            />
            <Keyboard
              baseClass={"simple-keyboard-numpadEnd"}
              {...this.keyboardNumPadEndOptions}
            />
          </div>
        </div>
      </div>
    );
  }
}

// render(<App />, document.getElementById("root"));

export default App;
