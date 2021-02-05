class Action {
  props = {};

  constructor() {}

  setAction(props) {
    this.props = props;
  }

  getAction() {
    return this.props;
  }
}

const actions=new Action();

export default actions;