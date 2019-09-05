interface State {
  form: {
    rating?: string,
    review?: string,
    isSubmitEnabled: boolean
    isEnabled: boolean
    isSendError: boolean
  }
}

const withFormValidation = (Component) => {
  type Props = React.ComponentProps<typeof Component>

  return class WithFormValidation extends React.PureComponent<Props, State> {
    constructor(props){
      super(props);

      this.state = {
        form: {
          isSubmitEnabled: false,
          isEnabled: true,
          isSendError: false
        }
      };

      this._handleInputChange = this._handleInputChange.bind(this);
      this._handleFormSubmit = this._handleFormSubmit.bind(this);
    }

    render(){
      return <Component
        {...this.props}
        form={this.state.form}
        onChange={this._handleInputChange}
        onSubmit={this._handleFormSubmit}
      />;
    }

    componentDidUpdate() {
      if (this.props.isFormSendError) {
        this.setState((oldState) => ({
          form: Object.assign({}, oldState.form, {
            isEnabled: true,
            isSubmitEnabled: true,
            isSendError: true
          })
        }));
        this.props.onSetFormErrorFlag(false);
      } else if (this.props.isFormSendSuccess) {
        this.setState(() => ({
          form: {
            isSubmitEnabled: false,
            isEnabled: true,
            isSendError: false
          }
        }));
        this.props.onSetFormSuccessFlag(false);
      }
    }

    _handleInputChange(evt) {
      evt.persist();
      this.setState((oldState) => ({
        form: Object.assign({}, oldState.form, {
          [evt.target.name]: evt.target.value
        })
      }), () => {
        this.setState((oldState) => ({
          form: Object.assign({}, oldState.form, {
            isSubmitEnabled: this.props.validation(this.state)
          })
        }))
      });
    }

    _handleFormSubmit(data) {
      this.setState((oldState) => ({
        form: Object.assign({}, oldState.form, {
          isEnabled: false,
          isSubmitEnabled: false
        })
      }));

      this.props.onSubmit(data);
    }
  };
};

export default withFormValidation;
