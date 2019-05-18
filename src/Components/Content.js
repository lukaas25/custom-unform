import React, { Component} from 'react';
import { Container, Row, Col, Card, CardBody, Button, CardTitle, UncontrolledCollapse} from 'reactstrap';
import { Form, Input } from '@rocketseat/unform';
import Prism from 'prismjs';
import '../css/prism.css'
import '../css/Label.css';
import logo from '../assests/logo.png'
class Content extends Component{
    state = {
        form : [],
        input : [],
        style : 'w-100 m-1 p-1',
        inputs: [],
        add: false,
        edit: false,
        id: 0,
    }
    componentDidMount(){
        Prism.highlightAll(true);
    }
     addLabel = (data) => {
        try{        
        this.setState({inputs: [...this.state.inputs, data], add: false });
        
        }catch(err){
            console.log(err)
        }
    }
    removeInput = (ids) => {
        const { inputs } = this.state
        console.log(ids)
        for (var i = 0, j = inputs.length; i !== j; i++) {
            if (inputs[i].id === ids) break;
          }
          inputs.splice(i, 1);
          this.setState({inputs: [...this.state.inputs]})
        }
        envEdit =  (data) => {
            console.log(data.id)
            const { inputs, edit } = this.state
            const editInputs = inputs.slice()
            for (var i = 0, j = inputs.length; i !== j; i++) {
                if (inputs[i].id === data.id) break;
            }
            editInputs[i] = data;
            console.log(i, editInputs[i])
            this.setState({inputs: [...editInputs]})
            this.setState({edit: !edit})
            }
    render(){
        const {style, inputs, add} = this.state;
        let color, button;
        if(!add){ color = 'success'; button =' Adicionar Label'}
        else {
            color = 'danger';
            button = 'Cancelar';
        }
        return(   
            <Container>
             <Row>
                 <Col className="align-center text-center pt-5">
                 <h2>Crie seu <img src={logo} style={{width: '10%'}} alt="Unform"/> personalizado</h2> 
                 </Col>
             </Row>
             <Row>
                 <Col sm={{size: 4, offset: 4}}>
                    <Button className="text-center mb-3 " block outline color={color} onClick={ () => this.setState({add : !add})}>{button}</Button>                    
                    { add &&
                        <Form onSubmit={this.addLabel} > 
                            <Input className="w-100" name="id" readOnly value={Math.floor(Math.random() * 50)}style={{display: 'none'}}/>
                            <Input className="w-100" name="name" label="Adicionar Nome" required/>
                            <Input className="w-100" name="placeholder" label="Adicionar Placeholder" required/>
                            <Input className="w-100" name="label" label="Adicionar Label" />
                            <Button className="mt-3" block  color="success" outline type="submit">Adicionar</Button>
                        </Form>
                    }
                 </Col>
             </Row> 
             <Row>
                <Col className="py-4" sm={{size: 8, offset: 2}}>
                    <Card className="">
                        <CardBody> 
                            <CardTitle className="text-center"> 
                                    Preview / Actions
                            </CardTitle>
                                    {inputs.map((label,index) => (
                                        <>
                                        <Form key={index} className="d-flex flex-row"> 
                                                <Input key={label.id} className={style} id="none" name={label.name} placeholder={label.placeholder} label={label.label} />
                                                <Button outline color="danger" size="sm" style={{margin: '5px 2px 5px'}} onClick={() => this.removeInput(label.id)}>Remover</Button>
                                                <Button outline color="info" size="sm" style={{margin: '5px 2px 5px'}}  id={label.name}>Editar</Button>
                                                
                                        </Form>
                                        <UncontrolledCollapse toggler={"#"+label.name+""} className="w-100 bg-light px-4 py-2">
                                                <Form className="" onSubmit={this.envEdit}>
                                                    <Input className="w-100" name="id" readOnly value={label.id} style={{display: 'none'}} />
                                                    <Input className="w-100" name="name" id="none" placeholder={label.name} label="Alterar Nome" required/>
                                                    <Input className="w-100" name="placeholder" placeholder={label.placeholder} label="Alterar Placeholder" required/>
                                                    <Input className="w-100" name="label" label="Alterar Label" placeholder={label.label} />
                                                    <div className="d-flex flex-row">
                                                    <Button className="mt-3 mx-1" block id={label.name} color="danger" outline >Cancelar</Button>
                                                    <Button className="mt-3 mx-1" block color="success" outline type="submit">Salvar</Button>
                                                    </div>
                                                </Form>
                                                </UncontrolledCollapse>
                                            </>
                                    ))
                                    }        
                        </CardBody>
                    </Card>
                    </Col>
                    <Col sm={{size: 12}}>
                    <Card>
                        <CardBody className="d-flex flex-row">
                        <div className="mx-2 px-2" style={{width:'70%'}}>
                            <CardTitle className="my-2">Code</CardTitle>
                            <pre >
                                <code className="language-javascript">
{`const {inputs} = this.state;
<Form className="d-flex flex-row" onSubmit={this.yourSubmit}>
{inputs.map(label => 
<Input key={label.id} name={label.name} 
placeholder={label.placeholder} label={label.label} />  
)}
<Button outline type="submit" >Enviar<Button>
</Form>`}
                                </code>
                                </pre>
                        </div>
                                <div className="mx-2 px-2">
                                <CardTitle>State</CardTitle>
                                <pre >
                                <code className="language-javascript">
{`state = {
    inputs : [
`+inputs.map(label => (
        `{'id': '`+label.id+`','name': '`+label.name+`',
'placeholder': '`+label.placeholder+`', 'label': '`+label.label+`'}
`))+`]
}`}
</code>
</pre>                                    
      </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            </Container>
        )
    }

}

export default Content;
