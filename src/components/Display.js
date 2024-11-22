import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;

    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log("Data Array from contract:", dataArray);
      } else {
        dataArray = await contract.display(account);
        console.log("Data Array from contract:", dataArray);
      }
    } catch (e) {
      console.error("Error fetching data:", e);
      alert("You don't have access");
      return;
    }

    if (dataArray && dataArray.length > 0) {
      setData(dataArray); // Use the URLs as they are
      setError(null); // Clear any existing error
    } else {
      alert("No image to display");
    }
  };

  return (
    <div>
      <div className="image-list-container">
        {data.length > 0 ? (
          data.map((url, i) => (
            <div key={i} className="image-container">
              <img
                src={url}
                alt={`Uploaded File ${i}`}
                className="image-item"
                onError={() => setError(`Failed to load image at ${url}`)}
              />
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          ))
        ) : (
          <p className="no-images">No images to display</p>
        )}
      </div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
    </div>
  );
};

export default Display;
