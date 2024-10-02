import React, {useState} from 'react';
import './App.css';
import {execHaloCmdWeb} from "@arx-research/libhalo/api/web.js";
import {haloConvertSignature, SECP256k1_ORDER} from '@arx-research/libhalo/api/common.js';

function App() {
    const [statusText, setStatusText] = useState('Click on the button');

    async function btnClick() {
        let command = {
            name: "sign",
            keyNo: 1,
            message: "010203",
            /* uncomment the line below if you get an error about setting "command.legacySignCommand = true" */
            // legacySignCommand: true,
        };

        const KEY_NO = 1;
        console.log("START")

        let pkeysRes = await execHaloCmdWeb({"name": "get_pkeys"});
        console.log("END")
        // let signRes = await execHaloCmdWeb({
        //     "name": "sign",
        //     "message": "010203",
        //     "keyNo": KEY_NO,
        //     "legacySignCommand": true
        // });
        let publicKey = pkeysRes.publicKeys[KEY_NO];

        // let res = haloConvertSignature(signRes.input.digest, signRes.signature.der, publicKey, SECP256k1_ORDER);

        // Ethereum-style signature (string)
        // console.log('ether', res.ether);
        console.log('publicKey', publicKey);
        // Raw point-format signature with recovery param
        // console.log('raw', res.raw);

        // let res;

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
