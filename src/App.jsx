import { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [shift, setShift] = useState(0);
  const [cipherText, setCipherText] = useState('');
  const [plainText, setPlainText] = useState('');

  const caesarCipher = (text, shift) => {
    return text.split('').map(char => {
      if (char.match(/[a-z]/i)) { // Check if character is a letter
        const code = char.charCodeAt();
        let base = char.charCodeAt(0) < 91 ? 65 : 97; // Determine base (A=65, a=97)
        return String.fromCharCode(((code - base + shift) % 26) + base);
      }
      return char; // Return non-letter characters unchanged
    }).join('');
  };

  const encode = () => {
    setCipherText(caesarCipher(inputText, shift));
  };

  const decode = () => {
    setPlainText(caesarCipher(cipherText, 26 - (shift % 26))); // To decode, shift by (26 - shift)
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold mb-4">Caesar Cipher Encoder/Decoder</h1>

      <div className="mb-4">
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Enter text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <input
          type="number"
          className="border p-2 rounded"
          placeholder="Shift (k)"
          value={shift}
          onChange={(e) => setShift(Number(e.target.value))}
        />
      </div>

      <button
        className="bg-blue-500 text-white p-2 rounded mb-2"
        onClick={encode}
      >
        Encode
      </button>
      <button
        className="bg-green-500 text-white p-2 rounded mb-2"
        onClick={decode}
      >
        Decode
      </button>

      <div className="mt-4">
        <p className="font-bold">Cipher Text: {cipherText}</p>
        <p className="font-bold">Plain Text: {plainText}</p>
      </div>
    </div>
  );
}

export default App;
