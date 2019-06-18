class Welcome extends React.Component {
  state = {
    name: 'name'
  };

  state = {
    name: 'name', // 名字
  };

  constructor(props) {
    super(props);
    this.state = {
      name: 'name',
    };

    this.state = {
      name: 'name' // this is a name
    };

    this.state = {
      // this is a name
      name: 'name'
    };

    this.state = {
      name: 'name', // this is a name
    };
  }

  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
