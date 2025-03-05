import React, { useState, useEffect } from "react";
import "./styles.css";

// Authentic Bingo calls for numbers 1-100
const bingoCalls = {
  1: "KELLY'S EYE",
  2: "ONE LITTLE DUCK",
  3: "CUP OF TEA",
  4: "KNOCK AT THE DOOR",
  5: "MAN ALIVE",
  6: "HALF A DOZEN",
  7: "LUCKY SEVEN",
  8: "GARDEN GATE",
  9: "DOCTOR'S ORDERS",
  10: "BORIS'S DEN",
  11: "LEGS ELEVEN",
  12: "ONE DOZEN",
  13: "UNLUCKY FOR SOME",
  14: "VALENTINE'S DAY",
  15: "YOUNG AND KEEN",
  16: "SWEET SIXTEEN",
  17: "DANCING QUEEN",
  18: "COMING OF AGE",
  19: "GOODBYE TEENS",
  20: "ONE SCORE",
  21: "KEY OF THE DOOR",
  22: "TWO LITTLE DUCKS",
  23: "THEE AND ME",
  24: "TWO DOZEN",
  25: "DUCK AND DIVE",
  26: "PICK AND MIX",
  27: "GATEWAY TO HEAVEN",
  28: "OVERWEIGHT",
  29: "RISE AND SHINE",
  30: "DIRTY GERTIE",
  31: "GET UP AND RUN",
  32: "BUCKLE MY SHOE",
  33: "ALL THE THREES",
  34: "ASK FOR MORE",
  35: "JUMP AND JIVE",
  36: "THREE DOZEN",
  37: "MORE THAN ELEVEN",
  38: "CHRISTMAS CAKE",
  39: "STEPS",
  40: "LIFE BEGINS",
  41: "TIME FOR FUN",
  42: "WINNIE THE POOH",
  43: "DOWN ON YOUR KNEES",
  44: "DROOPY DRAWERS",
  45: "HALFWAY THERE",
  46: "UP TO TRICKS",
  47: "FOUR AND SEVEN",
  48: "FOUR DOZEN",
  49: "PC",
  50: "HALF A CENTURY",
  51: "TWEAK OF THE THUMB",
  52: "DANNY LA RUE",
  53: "HERE COMES HERBIE",
  54: "CLEAN THE FLOOR",
  55: "SNAKES ALIVE",
  56: "WAS SHE WORTH IT?",
  57: "HEINZ VARIETIES",
  58: "MAKE THEM WAIT",
  59: "BRIGHTON LINE",
  60: "FIVE DOZEN",
  61: "BAKER'S BUN",
  62: "TURN THE SCREW",
  63: "TICKLE ME",
  64: "RED RAW",
  65: "OLD AGE PENSION",
  66: "CLICKETY CLICK",
  67: "STAIRWAY TO HEAVEN",
  68: "PICK A MATE",
  69: "ANYWAY UP",
  70: "THREE SCORE AND TEN",
  71: "BANG ON THE DRUM",
  72: "SIX DOZEN",
  73: "QUEEN BEE",
  74: "HIT THE FLOOR",
  75: "STRIVE AND STRIVE",
  76: "TROMBONES",
  77: "SUNSET STRIP",
  78: "HEAVEN'S GATE",
  79: "ONE MORE TIME",
  80: "EIGHT AND BLANK",
  81: "STOP AND RUN",
  82: "STRAIGHT ON THROUGH",
  83: "TIME FOR TEA",
  84: "SEVEN DOZEN",
  85: "STAYING ALIVE",
  86: "BETWEEN THE STICKS",
  87: "TORQUAY IN DEVON",
  88: "TWO FAT LADIES",
  89: "NEARLY THERE",
  90: "TOP OF THE SHOP",
  // Generic calls for numbers 91-100
  91: "Number 91",
  92: "Number 92",
  93: "Number 93",
  94: "Number 94",
  95: "Number 95",
  96: "Number 96",
  97: "Number 97",
  98: "Number 98",
  99: "Number 99",
  100: "Number 100",
};

// Function to generate a consistent color for each number
const getBallColor = (number) => {
  const colors = [
    "#3498db",
    "#2ecc71",
    "#e74c3c",
    "#f39c12",
    "#9b59b6",
    "#e91e63",
  ];
  return colors[number % colors.length];
};

export default function App() {
  const [email, setEmail] = useState("");
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [isSettingsSubmitted, setIsSettingsSubmitted] = useState(false);
  const [numberRange, setNumberRange] = useState("1-90");
  const [customRange, setCustomRange] = useState("");
  const [callOption, setCallOption] = useState("numbers-and-calls");
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [calledNumbers, setCalledNumbers] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  // Speak the current number and call
  const speakNumber = (number) => {
    if (!isVoiceEnabled) return;

    const speech = new SpeechSynthesisUtterance();
    speech.text =
      callOption === "numbers-only"
        ? `Number ${number}`
        : `Number ${number}, ${bingoCalls[number] || "No call available"}`;
    speech.lang = "en";
    speech.rate = 0.9; // Slower rate
    speech.pitch = 1.2; // Slightly higher pitch

    window.speechSynthesis.speak(speech);
  };

  // Replay the last number and call
  const replayLastCall = () => {
    if (currentNumber) {
      speakNumber(currentNumber);
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsEmailSubmitted(true);
    }
  };

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    setIsSettingsSubmitted(true);
    setShowSettings(false); // Hide settings after submission
  };

  const generateNumber = () => {
    let maxNumber;
    if (numberRange === "custom") {
      maxNumber = parseInt(customRange, 10);
    } else {
      maxNumber = parseInt(numberRange.split("-")[1], 10);
    }

    let newNumber;
    do {
      newNumber = Math.floor(Math.random() * maxNumber) + 1;
    } while (calledNumbers.includes(newNumber));

    setCurrentNumber(newNumber);
    setCalledNumbers([...calledNumbers, newNumber]);
    speakNumber(newNumber);
  };

  const resetGame = () => {
    setCalledNumbers([]);
    setCurrentNumber(null);
  };

  if (!isEmailSubmitted) {
    return (
      <div className="email-capture">
        <img
          src="https://cdn.shopify.com/s/files/1/0912/1064/5891/files/1.png?v=1741101410"
          alt="Logo"
          className="logo"
        />
        <h1>Enter your email to access our FREE bingo caller!</h1>
        <form onSubmit={handleEmailSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    );
  }

  if (!isSettingsSubmitted || showSettings) {
    return (
      <div className="game-settings">
        <img
          src="https://cdn.shopify.com/s/files/1/0912/1064/5891/files/1.png?v=1741101410"
          alt="Logo"
          className="logo"
        />
        <h1>CHOOSE YOUR GAME SETTINGS</h1>
        <form onSubmit={handleSettingsSubmit}>
          <div className="setting">
            <label>Number Range:</label>
            <select
              value={numberRange}
              onChange={(e) => setNumberRange(e.target.value)}
            >
              <option value="1-90">1-90 (Standard Bingo)</option>
              <option value="1-75">1-75 (US Bingo)</option>
              <option value="custom">Custom Range</option>
            </select>
            {numberRange === "custom" && (
              <input
                type="number"
                placeholder="Enter max number (up to 100)"
                value={customRange}
                onChange={(e) => setCustomRange(e.target.value)}
                min="1"
                max="100"
                required
              />
            )}
          </div>

          <div className="setting">
            <label>Call Options:</label>
            <select
              value={callOption}
              onChange={(e) => setCallOption(e.target.value)}
            >
              <option value="numbers-only">Numbers Only</option>
              <option value="numbers-and-calls">
                Numbers and Authentic Calls
              </option>
            </select>
          </div>

          <button type="submit">START GAME</button>
        </form>
      </div>
    );
  }

  return (
    <div className="App">
      <img
        src="https://cdn.shopify.com/s/files/1/0912/1064/5891/files/1.png?v=1741101410"
        alt="Logo"
        className="logo"
      />
      <h1>BINGO NUMBER CALLER</h1>
      <button onClick={() => setShowSettings(true)}>Game Settings</button>
      <button onClick={resetGame}>
        {calledNumbers.length === 0 ? "Start Game" : "New Game"}
      </button>
      <button
        onClick={generateNumber}
        disabled={
          calledNumbers.length ===
          (numberRange === "custom" ? customRange : numberRange.split("-")[1])
        }
      >
        CALL NEXT NUMBER
      </button>
      <button onClick={replayLastCall} disabled={!currentNumber}>
        LISTEN TO LAST CALL AGAIN
      </button>
      <button onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}>
        {isVoiceEnabled ? "Sound On" : "Sound Off"}
      </button>
      {currentNumber && (
        <div className="current-number">
          <div
            className="bingo-ball animate"
            style={{ borderColor: getBallColor(currentNumber) }}
          >
            <h2>{currentNumber}</h2>
          </div>
          {callOption === "numbers-and-calls" && (
            <h3 className="bingo-call">
              {bingoCalls[currentNumber] || "No call available"}
            </h3>
          )}
        </div>
      )}
      <div>
        <h3>CALLED NUMBERS:</h3>
        <div className="called-numbers">
          {calledNumbers.map((number) => (
            <div
              key={number}
              className="bingo-ball small"
              style={{ borderColor: getBallColor(number) }}
            >
              {number}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
