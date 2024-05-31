import React, { useState } from "react";
import axios from "axios";
import "./style.css";

const GrammarCheck = () => {
    const [text, setText] = useState("");
    const [corrections, setCorrections] = useState([]);

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const encodedParams = new URLSearchParams();
    console.log("encodedParams: ", encodedParams);

    const checkGrammarAndSpell = async () => {
        console.log("Text: ", text);
        encodedParams.set("query", text);
        // const options = {
        //     method: "POST",
        //     url: "https://grammar-and-spellcheck.p.rapidapi.com/grammarandspellcheck", // Replace with the actual API endpoint
        //     headers: {
        //         "content-type": "application/x-www-form-urlencoded",
        //         "X-RapidAPI-Key": "6cdfe034cbmsh3b644f88dcfdb41p139fb4jsn86842ed6f7ba", // Replace with your RapidAPI Key
        //         "X-RapidAPI-Host": "grammar-and-spellcheck.p.rapidapi.com", // Replace with the RapidAPI Host
        //     },
        //     data: encodedParams,
        // };

        // axios
        //     .request(options)
        //     .then(function (response) {
        //         console.log("Corrections: ", response.data.matches);
        //         setCorrections(response.data.matches); // Assuming 'matches' contains the corrections
        //     })
        //     .catch(function (error) {
        //         // console.log("Error finding corrections");
        //         console.error(error);
        //     });

        // try {
        //     const response = await axios.request(options);
        //     console.log("Corrections: ", response.data.matches);
        //     setCorrections(response.data.matches); // Assuming 'matches' contains the corrections
        // } catch (error) {
        //     // console.log("Error finding corrections");
        //     console.error(error);
        // }

        const options = {
            method: "POST",
            url: "https://grammar-and-spellcheck.p.rapidapi.com/grammarandspellcheck",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "X-RapidAPI-Key":
                    "6cdfe034cbmsh3b644f88dcfdb41p139fb4jsn86842ed6f7ba",
                "X-RapidAPI-Host": "grammar-and-spellcheck.p.rapidapi.com",
            },
            data: encodedParams,
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            //   console.log(response.data[0].message);

            // response.data.identified_mistakes.forEach((mistake, index) => {
            //     console.log(`Mistake ${index + 1}:`);
            //     console.log("Category:", mistake.category);
            //     console.log("Context:", mistake.context);
            //     console.log("Error Length:", mistake.errorLength);
            //     console.log("Message:", mistake.message);
            //     console.log("Offset:", mistake.offset);
            //     // Log other properties as needed
            // });

            console.log(response.data.identified_mistakes[0].message);

            setCorrections(response.data.identified_mistakes);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <textarea
                value={text}
                onChange={handleTextChange}
                placeholder="Check here"
            ></textarea>
            <button className="myButton" onClick={checkGrammarAndSpell}>
                Check Text
            </button>
            <div>
                {corrections.map((correction, index) => (
                    <p key={index}>{correction.message}</p>
                ))}
            </div>
        </div>
    );
};

export default GrammarCheck;

// import React, { useState } from 'react';
// import axios from 'axios';

// const GrammarCheck = () => {
//     const [text, setText] = useState('');
//     const [corrections, setCorrections] = useState([]);

//     const checkGrammar = async () => {
//         console.log(text);
//         try {
//             const response = await axios.post('https://api.grammarcheck.com/check', {
//                 text: text,
//                 // Other necessary parameters as required by the API
//             });

//             // Assuming the API returns a list of issues and suggestions
//             setCorrections(response.data.corrections || []);
//         } catch (error) {
//             console.error('Error checking grammar:', error);
//         }
//     };

//     return (
//         <div>
//             <textarea
//                 value={text}
//                 onChange={(e) => {
//                     setText(e.target.value);
//                     // checkGrammar();
//                 }}
//                 placeholder="Type or paste text here to check grammar..."
//             />
//             <button onClick={checkGrammar}>Check Grammar</button>

//             {corrections.length > 0 && (
//                 <div>
//                     <h2>Corrections</h2>
//                     <ul>
//                         {corrections.map((correction, index) => (
//                             <li key={index}>{correction.message}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default GrammarCheck;
