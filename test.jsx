class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'name',
    }
  }

  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}