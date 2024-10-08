import React, {useState} from 'react';
import './App.css';
import {execHaloCmdWeb} from "@arx-research/libhalo/api/web.js";

function App() {
    const [statusText, setStatusText] = useState('Click on the button 9');

    async function btnClick() {
        // let command = {
        //     name: "sign",
        //     keyNo: 1,
        //     message: "010203",
        //     /* uncomment the line below if you get an error about setting "command.legacySignCommand = true" */
        //     legacySignCommand: true,
        // };

        // let command = {
        //     "name": "gen_key",
        //     "keyNo": 3,
        //     "entropy": "3c825af7d2e1b02b6a00c257ebe883260b4aa6302c9878d412046d10141b261d"
        // };

        // Get public key
        const KEY_NO = 1;
        console.log("START")
        let pkeysRes = await execHaloCmdWeb({"name": "get_pkeys"});
        let publicKey = pkeysRes.publicKeys[KEY_NO];
        console.log('publicKey', publicKey);
        console.log('publicKey 0', pkeysRes.publicKeys[0]);
        console.log('publicKey 1', pkeysRes.publicKeys[1]);
        console.log("END")

        // let res;
        setStatusText("Init")

        // try {
        //     // --- request NFC command execution ---
        //     res = await execHaloCmdWeb(command, {
        //         statusCallback: (cause) => {
        //             if (cause === "init") {
        //                 setStatusText("Please tap the tag to the back of your smartphone and hold it...");
        //             } else if (cause === "retry") {
        //                 setStatusText("Something went wrong, please try to tap the tag again...");
        //             } else if (cause === "scanned") {
        //                 setStatusText("Tag scanned successfully, post-processing the result...");
        //             } else {
        //                 setStatusText(cause);
        //             }
        //         }
        //     });
        //     // the command has succeeded, display the result to the user
        //     setStatusText(JSON.stringify(res, null, 4));
        // } catch (e) {
        //     // the command has failed, display error to the user
        //     setStatusText('Scanning failed, click on the button again to retry. Details: ' + String(e));
        // }
    }

    return (
        <div className="App">
            <pre style={{fontSize: 12, textAlign: "left", whiteSpace: "pre-wrap", wordWrap: "break-word"}}>
                {statusText}
            </pre>
            <button onClick={() => btnClick()}>Sign message 010203 using key #1</button>
        </div>
    );
}

export default App;