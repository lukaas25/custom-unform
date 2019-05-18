import React, { Component} from 'react';
import { Navbar } from 'reactstrap';
class Header extends Component{
    render(){
        return(    
        <Navbar className=" text-white" style={{backgroundColor: '#993399'}} dark>
            <h2 className="mx-auto">Desafio Rocketseat</h2>
        </Navbar>
        )
    }

}

export default Header;
