import React, { Component } from 'react'
import Web3 from 'web3'

import OtokenFactory from '../abi/OtokenFactory.json';
import './App.css'


import { Button, Form , Input,Card, Icon, Image } from 'semantic-ui-react'

class App extends Component {


  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    console.log(accounts);

    const ethBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ ethBalance })
    console.log(ethBalance);

    // Load Token
    const networkId =  await web3.eth.net.getId()
    console.log(networkId);


    const OtokenFactory = web3.eth.Contract(OtokenFactory,"0x6fb1a6809961b0611c4296b16d8F14eF17FfAacF")
    await this.setState({ OtokenFactory })

    console.log(OtokenFactory);



  
   
  }

  async handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }


  constructor(props) {
    super(props)
    this.state = {
      account: '',
      token: {},
      ethBalance: '0',
      tokenBalance: '0',
      loading: true,
      OtokenFactory:{},
      underlyingAsset:"",
      strikeAsset:"",
      collateralAsset:"",
      strikePrice:"",
      expiry:"",
      isPut:true
    
    }

    
    this.handlePolicySubmit = this.handlePolicySubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getotoken = this.getotoken.bind(this);
  }


 

  async handlePolicySubmit(event){
    event.preventDefault();

   await this.state.OtokenFactory.methods.createOtoken(this.state.underlyingAsset, this.state.strikeAsset, this.state.collateralAsset, this.state.strikePrice , this.state.expiry ,this.state.isPut)
   .send({from: this.state.account, gas:600000, gasPrice:5000000000})   
      .then (async (receipt) => {
        console.log(receipt);  
      

      })
      .catch((err)=> {;
      console.log(err);
      })
   
   
  }




async getotoken(){
console.log(this.state.OtokenFactory.methods);
  let status =  await this.state.OtokenFactory.methods.getOtoken("0xd0a1e359811322d97991e03f863a0c30c2cf029c","0xb7a4f3e9097c08da09517b5ab877f7a917224ede","0xb7a4f3e9097c08da09517b5ab877f7a917224ede",20000000000,1641196800,true).call({from: this.state.account});
  console.log(status.name);

}



  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  className="App-link"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>


                <div>


{/* <Form.Field
      control={Input}
      onChange={this.handleChange}
      name="orderstatus">
      <label>ORDER STATUS</label>
      <input placeholder='Order status' />
    </Form.Field>
    <Form.Field
      control={Input}
      onChange={this.handleChange1}
      name="Description">
      <label>DESCRIPTION</label>
      <input placeholder='Description' />
    </Form.Field>
    <div className='ui two buttons' style={{paddingRight: "20px"}}>
                      <Button onClick={this.handlePolicySubmit1} basic color='green'>
                        CREATE
                      </Button>
    </div> */}



  

    


    <Form.Field
      control={Input}
      onChange={this.handleChange}
      name="underlyingAsset">
      <label>underlyingAsset</label>
      <input placeholder='Order status' />
    </Form.Field>

    <Form.Field
      control={Input}
      onChange={this.handleChange}
      name="strikeAsset">
      <label>strikeAsset</label>
      <input placeholder='Order status' />
    </Form.Field>

    <Form.Field
      control={Input}
      onChange={this.handleChange}
      name="collateralAsset">
      <label>collateralAsset</label>
      <input placeholder='Order status' />
    </Form.Field>

    <Form.Field
      control={Input}
      onChange={this.handleChange}
      name="strikePrice">
      <label>strikePrice</label>
      <input placeholder='Order status' />
    </Form.Field>

    <Form.Field
      control={Input}
      onChange={this.handleChange}
      name="expiry">
      <label>expiry</label>
      <input placeholder='Order status' />
    </Form.Field>

    <Form.Field
      control={Input}
      onChange={this.handleChange}
      name="isPut">
      <label>isPut</label>
      <input placeholder='Order status' />
    </Form.Field>
  
    <div className='ui two buttons' style={{paddingRight: "20px"}}>
                      <Button onClick={this.handlePolicySubmit} basic color='green'>
                        CREATE
                      </Button>
    </div>
     
    <div className='ui two buttons' style={{paddingRight: "20px"}}>
                      <Button onClick={this.getotoken} basic color='green'>
                        CREATE
                      </Button>
    </div>

    


                  </div>

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
