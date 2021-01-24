import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


export default class App extends Component {

    constructor(){
        super();
        this.state = {
            _id:'',
            id:'',
            nombre:'',
            email:'',
            nacimiento:'',
            creacion: Date.now(),
            clients: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.addClient = this.addClient.bind(this);
    }

    addClient(e){
        e.preventDefault();
        if(this.state._id){
            console.log('quiero editar este cliente: ' + this.state._id);
            fetch(`/client/list/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    id: this.state.id,
                    nombre: this.state.nombre,
                    email: this.state.email,
                    nacimiento: this.state.nacimiento,
                    creacion: Date.now()
                }),
                headers:{
                    'Accept':'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(res => {
                    console.log(res)
                    M.toast({html: 'Cliente updated'});
                    this.setState({id:'', nombre:'', email:'', nacimiento:'', _id:''});
                    this.fetchClients();
                });
        }else{
             console.log(JSON.stringify(this.state));
            fetch('/client/list', { 
                    method: 'POST',
                    body: JSON.stringify(this.state) ,
                    headers: {
                        'Accept':'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    M.toast({html: 'Cliente guardado'});
                    this.setState({id:'', nombre:'', email:'', nacimiento:''}) ;
                    this.fetchClients();
                })
                .catch(err => console.error(`esto es un error${err}`))
            }
    }

    componentDidMount(){ //carga clientes apenas la app carga
        console.log('componente montado');
        this.fetchClients();
    }

    fetchClients() {
        fetch('/client/list')
            .then(res => res.json())
            .then(res=> {
                this.setState({clients: res})
            })
            .catch(err => console.error(`esto es un error${err}`))
    }

    deleteClient(id){
        if(confirm('Estas seguro de querer eliminar este cliente?')){
            fetch('/client/list/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept':'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({hmtl: 'Client deleted'});
                this.fetchClients();
        });
    }}

    editClient(id){
        console.log('editando...' + id);
        fetch(`/client/list/${id}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({
                    id: res.id,
                    nombre: res.nombre,
                    email: res.email,
                    nacimiento: res.nacimiento,
                    creacion: Date.now(),
                    _id: res._id
                });
            })
            .catch(err => console.error(err));
    }

    handleChange(e){
        const {name , value} = e.target;
        this.setState({
            [name] :value
        });
    }

    render() {
        return (

                           
            <Router>
                <Link to="/" >llorando</Link>

                <Route path="/" render= {() => {
                    return  <div>
                    {/*NAVIGATION*/}
                    <nav className="light-blue darken-4">
                        <div className="container">
                            <a className="brand-logo" href="/">CLIENTES softseguros</a>
                        </div>
                    </nav>

                    <div className="container">
                         <div className="row">
                            <div className="col s6">
                                <div className="card">
                                    <div className="card-content">
                                        <form onSubmit={this.addClient}>
                                            <div className="row">
                                                <div className="input-field col s13">
                                                    <input name="id" onChange={this.handleChange}  type="Number" placeholder=" ID Document" value={this.state.id}/>
                                                    <input name="nombre" onChange={this.handleChange} type="text" placeholder=" Name" value={this.state.nombre}/> 
                                                    <input name="email" onChange={this.handleChange} type="text" placeholder=" Email" value={this.state.email}/>
                                                    <input name="nacimiento" onChange={this.handleChange} type="date" format="AAAA-MM-DD" value={this.state.nacimiento}/>
                                                </div>
                                                <button type="submit" className="btn btn light darken-4">
                                                    GUARDAR
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                               </div>    
                                                    <div className="col s10">
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                <th>Nombre</th>
                                                                <th>Email</th>
                                                                <th>Fecha de Nacimiento</th>
                                                                <th>Fecha de Creación</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            {
                                                            this.state.clients.map(client => {
                                                                return (
                                                                    <tr key={client._id}>
                                                                        <td>{client.nombre}</td>
                                                                        <td>{client.email}</td>
                                                                        <td>{client.nacimiento}</td>
                                                                        <td>{client.creacion}</td>
                                                                        <td>
                                                                            <button onClick= {() => this.editClient(client._id)} className="btn btn-light darken-4" >
                                                                                <i className="material-icons">edit</i>
                                                                            </button>
                                                                            <button onClick={ () => this.deleteClient(client._id)} className="btn btn-light darken-4" style={{margin: '4px'}} >
                                                                                <i className="material-icons">delete</i>
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                             }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                    </div>
                                </div>
                            </div>
                }} ></Route>  
            </Router>
            
        )
    }
}