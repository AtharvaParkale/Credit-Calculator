import React, { useState, useEffect } from 'react'
import './InputCalculator.css'
import { BiRupee } from 'react-icons/bi';

function InputCalculator() {
    const [showTable, setShowTable] = useState(false);
    const [tIgst, setTIgst] = useState(0);
    const [tCgst, setTCgst] = useState(0);
    const [tSgst, setTSgst] = useState(0);
    const [iIgst, setIIgst] = useState(0);
    const [iCgst, setICgst] = useState(0);
    const [iSgst, setISgst] = useState(0);

    const [credIgstC, setCredIgstC] = useState(0);
    const [credIgstS, setCredIgstS] = useState(0);

    const [credCgstC, setCredCgstC] = useState(0);
    const [credSgstC, setCredSgstC] = useState(0);

    const [carryGST, setCarryGST] = useState(0);

    const [carrySGST, setCarrySGST] = useState(0)
    const [carryCGST, setCarryCGST] = useState(0)

    const [netTaxIgst, setNetTaxIgst] = useState(0)
    const [netTaxCgst, setNetTaxCgst] = useState(0)
    const [netTaxSgst, setNetTaxSgst] = useState(0)

    const setAllValues = (tI, tC, tS, iI, iC, iS, credIC, credIS, credSgst, credCgst, carGST, carSGST, carCGST, nIgst, nCgst, nSgst) => {
      

        //Calculating credit of IGST used for cgst and sgst
        let igstCred = tI - iI;

        if (igstCred >= 0) {
            setCredIgstC(0);
            setCredIgstS(0);
        } else {
            let reqigstforcgst = tC - iC;
            if (reqigstforcgst <= 0) {
                setCredIgstC(0);
            } else {
                if (reqigstforcgst > Math.abs(igstCred)) {
                    setCredIgstC(Math.abs(igstCred));
                    igstCred = 0;
                }
                else {
                    setCredIgstC(reqigstforcgst);
                    igstCred = Math.abs(igstCred) - reqigstforcgst;
                }
            }
            let reqigstforsgst = tS - iS;
            if (reqigstforsgst <= 0) {
                setCredIgstS(0);
            }
            else {
                if (reqigstforsgst > Math.abs(igstCred)) {
                    setCredIgstS(Math.abs(igstCred));
                    igstCred = 0;
                }
                else {
                    setCredIgstS(reqigstforsgst);
                    igstCred = Math.abs(igstCred) - reqigstforsgst;
                }
            }
        }

        //Calculating credit of CGST and SGST used IGST
        let cgstsgstCred = tI - iI;
        let neededIgstTax = 0;

        if (cgstsgstCred >= 0) {
            setCredCgstC(0);
            setCredSgstC(0);
            neededIgstTax = Math.abs(cgstsgstCred);
        }
        //cgst required for igst
        let remainingCgst = iC - tC;
        if (remainingCgst <= 0) {
            setCredCgstC(0);
        }
        else {
            if (remainingCgst >= neededIgstTax) {
                setCredCgstC(neededIgstTax);
                remainingCgst = remainingCgst - neededIgstTax;
                neededIgstTax = 0
            }
            else {
                setCredCgstC(remainingCgst);
                neededIgstTax = neededIgstTax - remainingCgst;
                remainingCgst = 0;
            }

        }
        let remainingSgst = iS - tS;

        if (remainingSgst <= 0) {
            setCredSgstC(0);
        }
        else {
            if (remainingSgst >= neededIgstTax) {
                setCredSgstC(neededIgstTax);
                remainingSgst = remainingSgst - neededIgstTax;
                neededIgstTax = 0
            }
            else {
                setCredSgstC(remainingSgst);
                neededIgstTax = neededIgstTax - remainingSgst;
                remainingSgst = 0;
            }
        }
    }
    const setCarryValues = (carryigst, carrycgst, carrysgst, netigst, netcgst, netsgst) => {
        let remainingigst = iIgst - tIgst;
        let remainingcgst = iCgst - tCgst;
        let remainingsgst = iSgst - tSgst;

        console.log("======================")
        console.log("Remaining IGST : " + remainingigst);
        console.log("Remaining CGST : " + remainingcgst);
        console.log("Remaining SGST : " + remainingsgst);
        console.log("======================")

        //In this igst will pay for cgst
        if (remainingigst > 0 && remainingcgst < 0) {
            if ((remainingigst - Math.abs(remainingcgst)) > 0) {
                console.log("Igst can give to cgst  !");
                remainingigst = remainingigst - Math.abs(remainingcgst);
                remainingcgst = Math.abs(remainingcgst) + remainingcgst;
                console.log("Remaining IGST : " + remainingigst);
                console.log("Remaining CGST : " + remainingcgst);
            } else {
                console.log("Igst cannot give you money !")
                remainingcgst = remainingcgst + remainingigst;
                remainingigst = 0;
                console.log("Remaining IGST : " + remainingigst);
                console.log("Remaining CGST : " + remainingcgst);
            }
        }

        //In this igst will pay for sgst
        if (remainingigst > 0 && remainingsgst < 0) {
            if ((remainingigst - Math.abs(remainingsgst)) > 0) {
                console.log("Igst can give to sgst  !");
                remainingigst = remainingigst - Math.abs(remainingsgst);
                remainingsgst = Math.abs(remainingsgst) + remainingsgst;
                console.log("Remaining IGST : " + remainingigst);
                console.log("Remaining SGST : " + remainingsgst);
            } else {
                console.log("Igst cannot give you money !")
                remainingsgst = remainingsgst + remainingigst;
                remainingigst = 0;
                console.log("Remaining IGST : " + remainingigst);
                console.log("Remaining SGST : " + remainingsgst);
            }
        }

        //In this cgst will pay for igst

        if (remainingcgst > 0 && remainingigst < 0) {
            if ((remainingcgst - Math.abs(remainingigst)) > 0) {
                console.log("Cgst can give to igst  !");
                remainingcgst = remainingcgst - Math.abs(remainingigst);
                remainingigst = Math.abs(remainingigst) + remainingigst;
                console.log("Remaining IGST : " + remainingigst);
                console.log("Remaining CGST : " + remainingcgst);
            } else {
                console.log("Cgst cannot give you money !")
                remainingigst = remainingigst + remainingcgst;
                remainingcgst = 0;
                console.log("Remaining IGST : " + remainingigst);
                console.log("Remaining CGST : " + remainingcgst);
            }
        }

        //sgst will pay for igst

        if (remainingsgst > 0 && remainingigst < 0) {
            if ((remainingsgst - Math.abs(remainingigst)) > 0) {
                console.log("sgst can give to igst  !");
                remainingsgst = remainingsgst - Math.abs(remainingigst);
                remainingigst = Math.abs(remainingigst) + remainingigst;
                console.log("Remaining IGST : " + remainingigst);
                console.log("Remaining CGST : " + remainingsgst);
            } else {
                console.log("sgst cannot give you money !")
                remainingigst = remainingigst + remainingsgst;
                remainingsgst = 0;
                console.log("Remaining IGST : " + remainingigst);
                console.log("Remaining sGST : " + remainingsgst);
            }

        }


        if (remainingigst < 0) {
            setNetTaxIgst(Math.abs(remainingigst));
        } else {
            setNetTaxIgst(0);
        }
        if (remainingcgst < 0) {
            setNetTaxCgst(Math.abs(remainingcgst));
        } else {
            setNetTaxCgst(0);
        }
        if (remainingsgst < 0) {
            setNetTaxSgst(Math.abs(remainingsgst));
        } else {
            setNetTaxSgst(0);
        }

        

        if (remainingigst < 0) {
            setCarryGST(0);
        } else {
            setCarryGST(remainingigst)
        }

        if (remainingcgst < 0) {
            setCarryCGST(0);
        } else {
            setCarryCGST(remainingcgst)
        }

        if (remainingsgst < 0) {
            setCarrySGST(0);
        } else {
            setCarrySGST(remainingsgst)
        }


    }
    useEffect(() => {


        // setAllValues(tIgst, tCgst, tSgst, iIgst, iCgst, iSgst, credIgstC, credIgstS, credCgstC, credSgstC, carryGST, carrySGST, carryCGST, netTaxIgst, netTaxCgst, netTaxSgst);
        setAllValues(tIgst, tCgst, tSgst, iIgst, iCgst, iSgst, credIgstC, credIgstS, credCgstC, credSgstC);
        setCarryValues(carryGST, carrySGST, carryCGST, netTaxIgst, netTaxCgst, netTaxSgst);

    }, [tIgst, tCgst, tSgst, iIgst, iCgst, iSgst, credIgstC,
        credIgstS, credCgstC, credSgstC, carryGST, carrySGST, carryCGST,
        netTaxIgst, netTaxCgst, netTaxSgst
    ])


    return (
        <div className="calculator_container">

            <div className="calculator_body">
                <div className="calculator_header">
                    <h1>
                        GST Input Tax Credit Calculator
                    </h1>
                    <p>Enter tax payable and ITC credits available to calculate<br />
                        Input Tax credit under IGST, CGST & SGST</p>
                </div>
                <div className="input_level1">
                    <table className="input_table1">
                        <tr>
                            <th></th>
                            <th>IGST</th>
                            <th>CGST</th>
                            <th>SGST</th>
                        </tr>
                        <tr>
                            <td className="col_header">Tax Payable</td>
                            <td>
                                <div className="input_holder">
                                    <div className="input_box">
                                        <BiRupee size={20} />
                                        <input type="number"
                                            onChange={(e) => {
                                                setTIgst(e.target.value);
                                                setAllValues(tIgst, tCgst, tSgst, iIgst, iCgst, iSgst, credIgstC, credIgstS, credCgstC, credSgstC, carryGST, carrySGST, carryCGST, netTaxIgst, netTaxCgst, netTaxSgst);
                                            }} id="myInput1"/>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="input_holder">
                                    <div className="input_box">
                                        <BiRupee size={20} />
                                        <input type="number" id="myInput2"
                                            onChange={(e) => {
                                                setTCgst(e.target.value);
                                                setAllValues(tIgst, tCgst, tSgst, iIgst, iCgst, iSgst, credIgstC, credIgstS, credCgstC, credSgstC, carryGST, carrySGST, carryCGST, netTaxIgst, netTaxCgst, netTaxSgst);
                                            }}
                                        />
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="input_holder">
                                    <div className="input_box">
                                        <BiRupee size={20} />
                                        <input type="number" id="myInput3"
                                            onChange={(e) => {
                                                setTSgst(e.target.value);
                                                setAllValues(tIgst, tCgst, tSgst, iIgst, iCgst, iSgst, credIgstC, credIgstS, credCgstC, credSgstC, carryGST, carrySGST, carryCGST, netTaxIgst, netTaxCgst, netTaxSgst);
                                            }}
                                        />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="col_header">Input Tax Credit</td>
                            <td>
                                <div className="input_holder">
                                    <div className="input_box">
                                        <BiRupee size={20} />
                                        <input type="number" id="myInput4"
                                            onChange={(e) => {
                                                setIIgst(e.target.value);
                                                setAllValues(tIgst, tCgst, tSgst, iIgst, iCgst, iSgst, credIgstC, credIgstS, credCgstC, credSgstC, carryGST, carrySGST, carryCGST, netTaxIgst, netTaxCgst, netTaxSgst);
                                            }}
                                        />
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="input_holder">
                                    <div className="input_box">
                                        <BiRupee size={20} />
                                        <input type="number" id="myInput5"
                                            onChange={(e) => {
                                                setICgst(e.target.value);
                                                setAllValues(tIgst, tCgst, tSgst, iIgst, iCgst, iSgst, credIgstC, credIgstS, credCgstC, credSgstC, carryGST, carrySGST, carryCGST, netTaxIgst, netTaxCgst, netTaxSgst);
                                            }}
                                        />
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="input_holder">
                                    <div className="input_box">
                                        <BiRupee size={20} />
                                        <input type="number" id="myInput6"

                                            onChange={(e) => {
                                                setISgst(e.target.value);
                                                setAllValues(tIgst, tCgst, tSgst, iIgst, iCgst, iSgst, credIgstC, credIgstS, credCgstC, credSgstC, carryGST, carrySGST, carryCGST, netTaxIgst, netTaxCgst, netTaxSgst);
                                            }} />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>

                </div>


                <div className="calculator_buttons">
                    <button onClick={(e) => {
                        setShowTable(false);
                        document.getElementById('myInput1').value = '';
                        document.getElementById('myInput2').value = '';
                        document.getElementById('myInput3').value = '';
                        document.getElementById('myInput4').value = '';
                        document.getElementById('myInput5').value = '';
                        document.getElementById('myInput6').value = '';
                        setTIgst(0);
                        setTCgst(0);
                        setTSgst(0);
                        setIIgst(0);
                        setICgst(0);
                        setISgst(0);

                    }}>Reset</button>
                    <button onClick={(e) => {
                        setShowTable(true);
                        setCarryValues(carryGST, carrySGST, carryCGST, netTaxIgst, netTaxCgst, netTaxSgst);
                        

                    }}>Calculate</button>
                </div>
                {showTable ?
                    <div className="input_level2">

                        <table className="input_table2">
                            <tr>
                                <th>Results</th>
                                <th>IGST</th>
                                <th>CGST</th>
                                <th>SGST</th>
                            </tr>
                            <tr>
                                <td className="col_header">Tax Payable</td>
                                <td>
                                    <div className="input_holder">
                                        <div className="input_box2">
                                            {tIgst}
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <div className="input_holder">
                                        <div className="input_box2">
                                            {tCgst}
                                        </div>
                                    </div>
                                </td><td>
                                    <div className="input_holder">
                                        <div className="input_box2">
                                            {tSgst}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr  >
                                <td className="col_header">Input Tax Credit</td>
                                <td>
                                    <div className="input_holder">
                                        <div className="input_box2">
                                            {iIgst}
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <div className="input_holder">
                                        <div className="input_box2">
                                            {iCgst}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="input_holder">
                                        <div className="input_box2">
                                            {iSgst}
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <tr className="gross_header gross_tax">
                                <td >Gross Tax Payable</td>
                                <td>
                                    <div className="input_holder">
                                        <div className="input_box2">
                                            {
                                                (tIgst - iIgst) > 0 ? (tIgst - iIgst) : 0
                                            }
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <div className="input_holder">
                                        <div className="input_box2">
                                            {
                                                (tCgst - iCgst) > 0 ? (tCgst - iCgst) : 0
                                            }
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="input_holder">
                                        <div className="input_box2">
                                            {
                                                (tSgst - iSgst) > 0 ? (tSgst - iSgst) : 0
                                            }
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr >
                                <td className="col_header">Remaining Input Tax Credit</td>
                                <td>
                                    <div className="input_holder">
                                        <div className="input_box2">
                                            {
                                                (tIgst - iIgst) > 0 ? 0 : (iIgst - tIgst)
                                            }
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <div className="input_holder">
                                        <div className="input_box2">
                                            {
                                                (tCgst - iCgst) > 0 ? 0 : (iCgst - tCgst)
                                            }
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="input_holder">
                                        <div className="input_box2">
                                            {
                                                (tSgst - iSgst) > 0 ? 0 : (iSgst - tSgst)
                                            }
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr >
                                <td className="col_header">Credit of IGST used for CGST</td>
                                <td>
                                    <div className="input_holder">
                                        <div className="input_box2">
                                            {`(${credIgstC})`}
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <div className="input_holder">
                                        <div className="input_box2">
                                            {credIgstC}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="input_holder">
                                        <div className="input_box2">
                                            0
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr >
                                <td className="col_header">Credit of IGST used for SGST</td>
                                <td>
                                    <div className="input_holder">
                                        <div className="input_box2">
                                            {`(${credIgstS})`}
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <div className="input_holder">
                                        <div className="input_box2">
                                            0
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="input_holder">
                                        <div className="input_box2">
                                            {credIgstS}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr >
                                <td className="col_header">Credit of CGST used for IGST</td>
                                <td>
                                    <div className="input_holder">
                                        <div className="input_box2">
                                            {credCgstC}
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <div className="input_holder">
                                        <div className="input_box2">
                                            {`(${credCgstC})`}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="input_holder">
                                        <div className="input_box2">
                                            0
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr >
                                <td className="col_header">Credit of SGST used for IGST</td>
                                <td>
                                    <div className="input_holder">
                                        <div className="input_box2">
                                            {credSgstC}
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <div className="input_holder">
                                        <div className="input_box2">
                                            0
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="input_holder">
                                        <div className="input_box2">
                                            {`(${credSgstC})`}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="net_tax">
                                <td >Net Tax Payable</td>
                                <td>
                                    <div className="input_holder">
                                        <div className="input_box2">
                                            {netTaxIgst}
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <div className="input_holder">
                                        <div className="input_box2">
                                            {netTaxCgst}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="input_holder">
                                        <div className="input_box2">
                                            {netTaxSgst}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr >
                                <td className="col_header">Carried forward Input Tax Credit</td>
                                <td>
                                    <div className="input_holder">
                                        <div className="input_box2">
                                            {carryGST}
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <div className="input_holder">
                                        <div className="input_box2">
                                            {carryCGST}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="input_holder">
                                        <div className="input_box2">
                                            {carrySGST}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    : ""}
            </div>

        </div>
    )
}

export default InputCalculator