import React, {useState} from "react"
//const TronWeb = require('tronweb');
const WalletCard=()=>{
   const [errorMessage, setErrorMessage]= useState(null)
   const [defaultAccount, setDefaultAccount]=useState(null)
   const [userBalance, setUserBalance]=useState(null)
   const [connectButtonText, setConnectButtonText]= useState("connect Wallet")
   const [truncAddress, setTruncAddress]=useState(null)

   const connectWalletHandler=async()=>{
    if (window.tronWeb){
        //connect to tronLinka
        const x= await window.tronLink.request({method:"tron_requestAccounts"})
        console.log(x)
        window.tronLink.request({method: "tron_requestAccounts"})
        .then(result=>{
            accountChangeHandler(window.tronWeb.defaultAddress.base58)
            console.log(window.tronLink.request.tron_requestAccounts)
        })
        setConnectButtonText("connected")
        
        //   const address =window.tronWeb.defaultAddress.base58
        //   accountChangeHandler(address)
        //   console.log(window.tronLink)

    } else{
        setErrorMessage("Install Tronlink")
    }
   }
   const SetTruncAddress=(address)=>{
       setTruncAddress(address.substr(0,5) + "....." + address.substr(address.length - 5))
   }
   const accountChangeHandler=(newAccount)=>{
      setDefaultAccount(newAccount)
      SetTruncAddress(newAccount)
      getUserBalance(newAccount)
   }
   const getUserBalance=(address)=>{
       window.tronWeb.trx.getBalance(address)
       .then(balance=>{
        setUserBalance(parseFloat(window.tronWeb.fromSun(balance)).toFixed(3))
       })
   }
   window.addEventListener('message', (res) => {
    if (res.data.message && res.data.message.action == "setAccount") {
      if (window.tronWeb) {
        if (res.data.message.data.address != window.tronWeb.defaultAddress.base58) {
          console.log('changed');
            window.location.reload();
        }
      }
    }
    if (res.data.message && res.data.message.action == "setNode") {
      window.location.reload();
    }
//     if (res.data.message && res.data.message.action == "accountsChanged") {
//             console.log("accountsChanged event", res.data.message)
//             console.log("current address:", res.data.message.data.address)
//         }
 });
//    window.tronWeb.on("accountsChanged", accountChangeHandler)
//    window.tronWeb.on("chainChanged",changedChain)

    return(
        <div className="walletCard">
            <h4> {"Connection to TronLink using window.tronWeb methods"}</h4>
           <button onClick={connectWalletHandler}>{connectButtonText} </button>
           <div className="accountDisplay">
                <h3>Address: {truncAddress}</h3>
           </div>
           <div className="balanceDisplay">
                <h3>Balance: {userBalance}</h3>
           </div>
           {errorMessage}
        </div>
    )
}
export default WalletCard